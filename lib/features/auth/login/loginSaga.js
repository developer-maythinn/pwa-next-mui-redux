import {
  call,
  put,
  takeEvery,
  takeLatest,
  race,
  delay,
} from "redux-saga/effects";

const TIMEOUT_SEC = parseInt(process.env.NEXT_PUBLIC_TIMEOUT_SEC, 10);

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
import { login } from "./loginAPI";

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
    //   yield put(logoutInitial());
      yield put(loginSuccess(response.data));
      console.log("Login is success>>", response.data);
    } else {
      console.log("Login failed", message);

      yield put(
        loginFail({
          emailError:
            typeof message === "string"
              ? message
              : (message && message.email && message.email.join(" ")) ||
                (message && message.message) ||
                null,
          passwordError:
            (message && message.password && message.password.join(" ")) ||
            (message && message.message) ||
            null,
        })
      );
      const msg =
        typeof message === "string"
          ? message
          : (message && message.email && message.email.join(" ")) ||
            (message && message.message) ||
            "";

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
