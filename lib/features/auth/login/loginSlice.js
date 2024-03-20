import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rememberMe: false,
  currentUser: {
    // currently loggin in user (who trying to verify)
    // email,
    // password
  },
  authUser: null,
  loading: {
    isPending: null,
    isComplete: true,
  },
  isSuccess: null,
  error: {
    email: {
      message: null,
    },
    password: {
      message: null,
    },
  },
  verification: {
    isPending: null,
    isComplete: true,
  },
  verifyError: {
    code: {
      message: null,
    },
    email: {
      message: null,
    },
  },
  codeResending: {
    isPending: null,
    isComplete: null,
    successMessage: null,
  },
  codeResendError: {
    email: {
      message: null,
    },
  },
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest(state, action) {
      console.log("Request received");
      // run middleware
    },
    loginLoading(state, action) {
      return {
        ...state,
        loading: {
          isPending: true,
          isComplete: false,
        },
      };
    },
    setCurrentUser(state, action) {
      return {
        ...state,
        currentUser: {
          ...action.payload,
        },
      };
    },
    loginSuccess(state, action) {
      console.log("Login is success in slice");
      return {
        ...state,
        loading: {
          isPending: false,
          isComplete: true,
        },
        isSuccess: true,
        loaded: true,
        authUser: action.payload || null,
        error: {
          email: {
            message: null,
          },
          password: {
            message: null,
          },
        },
      };
    },
    loginFail(state, action) {
      console.log("Login failed action");
      console.log(action.payload);
      return {
        ...state,
        loading: {
          isPending: false,
          isComplete: true,
        },
        authUser: null,
        isSuccess: false,
        error: {
          email: {
            message: action.payload.emailError || null,
          },
          password: {
            message: action.payload.passwordError || null,
          },
        },
      };
    },
    loginVerifyRequest(state, action) {
      // run login verify request saga
      return {
        ...state,
        verifyError: {
          code: {
            message: null,
          },
          email: {
            message: null,
          },
        },
      };
    },
    loginVerifying(state, action) {
      return {
        ...state,
        verification: {
          isPending: true,
          isComplete: false,
        },
      };
    },
    loginVerifySuccess(state, action) {
      return {
        ...state,
        verification: {
          isPending: false,
          isComplete: true,
        },
      };
    },
    loginVerifyFail(state, action) {
      return {
        ...state,
        verification: {
          isPending: false,
          isComplete: true,
        },
        isSuccess: false,
        verifyError: {
          code: {
            message: action.payload.codeErr || null,
          },
          email: {
            message: action.payload.emailErr || null,
          },
        },
      };
    },
    loginVerifyResendCodeRequest(state, action) {
      //run resend code saga
      return {
        ...state,
        codeResendError: {
          email: {
            message: null,
          },
        },
      };
    },
    loginVerifyResendingCode(state, action) {
      return {
        ...state,
        codeResending: {
          isPending: true,
          isComplete: false,
          successMessage: null,
        },
      };
    },
    loginVerifyResendCodeSuccess(state, action) {
      return {
        ...state,
        codeResending: {
          isPending: false,
          isComplete: true,
          successMessage: action.payload,
        },
      };
    },
    loginVerifyResendCodeFail(state, action) {
      return {
        ...state,
        codeResending: {
          isPending: false,
          isComplete: false,
          successMessage: null,
        },
        codeResendError: {
          email: {
            message: action.payload.emailErr || null,
          },
        },
      };
    },
    resetLogin(state, action) {
      return {
        ...state,
        loading: {
          isPending: null,
          isComplete: null,
        },
        loaded: true,
        authUser: null,
        error: {
          email: {
            message: null,
          },
          password: {
            message: null,
          },
        },
        verification: {
          isPending: null,
          isComplete: true,
        },
        verifyError: {
          code: {
            message: null,
          },
          email: {
            message: null,
          },
        },
      };
    },
  },
});

export const {
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
  resetLogin,
} = loginSlice.actions;
export default loginSlice.reducer;
