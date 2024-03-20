import {
  call,
  put,
  takeEvery,
  takeLatest,
  race,
  delay,
} from "redux-saga/effects";
import { getCookie, setCookie } from "cookies-next";
import CryptoJS from "crypto-js";

const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
const authUser = process.env.NEXT_PUBLIC_AUTH_USER;
const encryptionKey = process.env.NEXT_PUBLIC_PWD_ENCRYPTION_KEY;
const TIMEOUT_SEC = parseInt(process.env.NEXT_PUBLIC_TIMEOUT_SEC, 10);

// api
import { login } from "./loginAPI";

import { getUserInfo } from "../userInfo/userInfoAPI";

// actions
import {
  loginRequest,
  loginLoading,
  setCurrentUser,
  loginSuccess,
  loginFail,
  loginVerifyRequest,
  loginVerifying,
  loginVerifySuccess,
  loginVerifyFail,
  loginVerifyResendCodeRequest,
  loginVerifyResendingCode,
  loginVerifyResendCodeSuccess,
  loginVerifyResendCodeFail,
} from "./loginSlice";

//   import { logoutInitial, logoutSuccess } from "../../slices/auth/logoutSlice";

// grouping and exporting all login sagas
export const loginSagas = [
  takeLatest(loginRequest.type, watchLoginRequest),
  //   takeLatest(loginVerifyRequest.type, watchLoginVerifyRequest),
  //   takeLatest(
  //     loginVerifyResendCodeRequest.type,
  //     watchLoginVerifyResendCodeRequest
  //   ),
];

function* watchLoginRequest({ payload }) {
  console.log("Reach Login middleware " + JSON.stringify(payload));
  try {
    yield put(loginLoading());
    yield put(setCurrentUser(payload));
    const { response, timeout } = yield race({
      response: call(login, payload),
      timeout: delay(TIMEOUT_SEC * 1000),
    });
    console.log("HERE is response");
    console.log(JSON.stringify(response));
    const { success, message } = response;

    if (success) {
      console.log("Login Success>>");
      // yield put(logoutInitial());
      const userKey = CryptoJS.AES.encrypt(
        payload.password,
        encryptionKey
      ).toString();
      const userRes = yield call(getUserInfo, response.data);

      console.log("User received", userRes);

      if (userRes) {
        if (payload.isRemember) {
          setCookie(
            authToken,
            JSON.stringify({
              ...response.data,
              isRemember: true,
            }),
            {
              // maxAge: 10 * 60 * 60 * 24, // 10 days
              // maxAge: 1 * 60 * 60, // 1 hour
              maxAge: 2 * 60 * 60, // 2 hour
              // maxAge: 30, // 30 secs
            }
          );
          setCookie(authUser, JSON.stringify({ ...userRes.data, userKey }), {
            // maxAge: 10 * 60 * 60 * 24, // 10 days
            // maxAge: 1 * 60 * 60, // 1 hour
            maxAge: 2 * 60 * 60, // 2 hour
            // maxAge: 30, // 30 secs
          });
        } else {
          setCookie(
            authToken,
            JSON.stringify({
              ...response.data,
              isRemember: false,
            })
          );
          setCookie(authUser, JSON.stringify(userRes.data));
        }
        // checking is authToken & authUser is already set
        if (getCookie(authToken) && getCookie(authUser)) {
          console.log("Complete setting auth token in client browser");
          yield put(loginSuccess(response.data));
        }

        // yield put(setToken(response.data.access_token));
      }
    } else {
      console.log("Login failed", message);

      yield put(
        loginFail({
          emailError:
            typeof message === "string"
              ? message
              : (message && message.email && message.email.join(" ")) || null,
          passwordError:
            (message && message.password && message.password.join(" ")) || null,
        })
      );
      const msg =
        typeof message === "string"
          ? message
          : message && message.email && message.email.join(" ");

      if (msg && msg.includes("Email need to verify.")) {
        console.log("Email need to verify in saga");
        yield put(
          loginVerifyResendCodeRequest({
            email: payload.email,
          })
        );
        yield put(loginVerifying());
      }
    }

    // if (success) {
    // //   yield put(logoutInitial());
    //   yield put(loginSuccess(response.data));
    //   console.log("Login is success>>", response.data);

    // } else {
    //   console.log("Login failed", message);

    //   yield put(
    //     loginFail({
    //       emailError:
    //         typeof message === "string"
    //           ? message
    //           : (message && message.email && message.email.join(" ")) ||
    //             (message && message.message) ||
    //             null,
    //       passwordError:
    //         (message && message.password && message.password.join(" ")) ||
    //         (message && message.message) ||
    //         null,
    //     })
    //   );
    //   const msg =
    //     typeof message === "string"
    //       ? message
    //       : (message && message.email && message.email.join(" ")) ||
    //         (message && message.message) ||
    //         "";

    //   if (msg && msg.includes("Email need to verify.")) {
    //     console.log("Email need to verify in saga");
    //     yield put(
    //       loginVerifyResendCodeRequest({
    //         email: payload.email,
    //       })
    //     );
    //     yield put(loginVerifying());
    //   }
    // }
    //put user feedback //success
  } catch (e) {
    console.log("Exception in userLoginSaga");
    console.log(e);
    // put some user feedback //fail
    // yield put();
    yield put(
      loginFail({
        emailError: null,
        passwordError: null,
      })
    );
  }
}

//   function* watchLoginVerifyRequest({ payload }) {
//     console.log(
//       "Reach login verify middleware : payload" + JSON.stringify(payload)
//     );
//     try {
//       const { response, timeout } = yield race({
//         response: call(api.registerVerify, payload),
//         timeout: delay(TIMEOUT_SEC * 1000),
//       });
//       const { success, message } = response;
//       if (success) {
//         // put user data to state
//         yield put(loginVerifySuccess());
//         yield put(loginSuccess());
//         //put user feedback //success
//       } else {
//         yield put(
//           loginVerifyFail({
//             codeErr: (message.code && message.code.join(" ")) || null,
//             emailErr:
//               typeof message === "string"
//                 ? message
//                 : message.email
//                 ? message.email.join(" ")
//                 : null,
//           })
//         );
//         console.log("Login verify fail");
//       }
//     } catch (e) {
//       console.log("Exception in user_login_verify_request_saga");
//       console.log(e);
//       // put some user feedback //fail
//       yield put(
//         loginVerifyFail({
//           emailError: null,
//         })
//       );
//     }
//   }

//   function* watchLoginVerifyResendCodeRequest({ payload }) {
//     console.log(
//       "Reach login verify resend code middleware : payload" +
//         JSON.stringify(payload)
//     );
//     try {
//       const { response, timeout } = yield race({
//         response: call(api.registerVerifyResendCode, payload),
//         timeout: delay(TIMEOUT_SEC * 1000),
//       });
//       // console.log(JSON.stringify(response));
//       const { success, message } = response;
//       if (success) {
//         yield put(loginVerifyResendCodeSuccess(message));
//       } else {
//         yield put(
//           loginVerifyResendCodeFail({
//             emailErr:
//               typeof message === "string"
//                 ? message
//                 : message.email
//                 ? message.email.join(" ")
//                 : null,
//           })
//         );
//         console.log("Login verify code send fail");
//       }
//     } catch (e) {
//       console.log("Exception in user_login_verify_request_saga");
//       console.log(e);
//       // put some user feedback //fail
//       yield put(
//         loginVerifyResendCodeFail({
//           emailError: null,
//         })
//       );
//     }
//   }
