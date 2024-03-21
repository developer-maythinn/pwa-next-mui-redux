"use client";

import CryptoJS from "crypto-js";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// redux
import { useDispatch, useSelector } from "react-redux";

import {
  loginFail,
  loginRequest,
  loginVerifyResendCodeRequest,
  resetLogin,
} from "../../../lib/features/auth/login/loginSlice";
import { ColorIconAccentGreen } from "../../../lib/theme/build/js/tokens";

function Login({ email, pwd }) {
  const router = useRouter();

  // component-level states
  const [inputValue, setInputValue] = useState(email ?? "");
  const [showPassword, setShowPassword] = useState(false);
  const [inputPwsValue, setInputPwsValue] = useState(pwd ?? "");
  const [isRemember, setIsRemember] = useState(false);
  const [isBtnDisable, setIsBtnDisable] = useState(false);

  //   const [snackBar, setSnackBar] = useState({
  //     isOpen: false,
  //     message: "",
  //   });

  // ***** START redux ******
  const loginState = useSelector((state) => state.login);

  const dispatch = useDispatch();

  // ***** END redux ********
  const textChange = (e) => setInputValue(e.target.value);
  const pwsTextChange = (e) => setInputPwsValue(e.target.value);

  const handleClearInput = () => {
    setInputValue("");
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCheckbox = (event) => {
    setIsRemember(event.target.checked);
  };

  const handleLogin = async () => {
    const body = {
      email: inputValue,
      password: inputPwsValue,
      isRemember,
    };

    dispatch(loginRequest(body));
  };

  // ****** START: useEffects ********

  useEffect(() => {
    console.log("Login State>>", loginState);
  }, [loginState]);

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ my: 6 }}>
          <Box sx={{ mb: 2 }}>
            {/* <LabelWithIcon
              startIcon={"mail"}
              customIconStyles={{
                ...inputLabelIconStyles,
              }}
              wrapperStyles={{ mb: 1 }}
              text="Organization Email"
              variant="owTitle"
            ></LabelWithIcon> */}
            {/* <InputComponent
              closeIconControl={{
                  handleInputFocus: handleInputFocus,
                  handleInputBlur: handleInputBlur,
                  showCloseIcon: showCloseIcon,
                }}
                type="email"
                placeholder={"Enter your email"}
                inputValue={inputValue}
                handleClearInput={handleClearInput}
                textChange={textChange}
                helperText={{
                    color: error[60],
                    message: loginState.error.email.message,
                }}
            /> */}
            Mail
            <input value={inputValue} onChange={textChange} />
          </Box>
          <Box sx={{ mb: 2 }}>
            {/* <LabelWithIcon
              startIcon={"lock"}
              customIconStyles={{
                ...inputLabelIconStyles,
              }}
              wrapperStyles={{ mb: 1 }}
              text="Password"
              variant="owTitle"
            ></LabelWithIcon> */}
            {/* <InputComponent
              type="password"
              placeholder={"Enter your password"}
              showPassword={showPassword}
              inputPwsValue={inputPwsValue}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
              pwsTextChange={pwsTextChange}
              helperText={{
                  color: error[60],
                  message: loginState.error.password.message,
                }}
            /> */}
            Password
            <input
              type="password"
              value={inputPwsValue}
              onChange={pwsTextChange}
            />
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={handleLogin}
          color="primary"
        >
          Sign In
        </Button>
      </Grid>
    </>
  );
}

export default Login;
