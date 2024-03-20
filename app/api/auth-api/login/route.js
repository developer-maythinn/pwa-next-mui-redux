"use server";

import { getCookie, setCookie } from "cookies-next";
import { NextResponse } from "next/server";

// Third party
import CryptoJS from "crypto-js";

import {
  base_url,
  client_id,
  client_secret,
  grant_type,
  auth_token,
  auth_user,
  encryption_key,
} from "../../../../lib/commonFunctions";

import { makeRequest } from "../../../../lib/makeRequest";

export async function POST(req, res) {
  const body = await req.json();
  const { configForBackend } = body;
  if (
    !configForBackend ||
    (configForBackend && Object.keys(configForBackend).length <= 1)
  ) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }

  console.log(
    "encryption key>>",
    encryption_key,
    JSON.parse(configForBackend.data).password
  );
  const decryptedBytes = CryptoJS.AES.decrypt(
    JSON.parse(configForBackend.data).password,
    encryption_key
  );
  console.log("Decrypted bytes>>", decryptedBytes);
  const decryptedPwd = decryptedBytes.toString(CryptoJS.enc.Utf8);
  console.log("Decrypted Pwd>>", decryptedPwd);

  // const bytes = CryptoJS.enc.Base64.parse(configForBackend.data.password);
  // const decryptedPwd = CryptoJS.enc.Utf8.stringify(bytes);

  console.log("Decrypted pwd", {
    password: decryptedPwd,
  });

  console.log("Config here>>", {
    ...JSON.parse(configForBackend.data),
    password: decryptedPwd,
    grant_type,
    client_id,
    client_secret,
  });

  const updatedConfig = {
    ...configForBackend,
    maxBodyLength: Infinity,
    url: `${base_url}/api${configForBackend.url}`,
    data: JSON.stringify({
      ...JSON.parse(configForBackend.data),
      password: decryptedPwd,
      grant_type,
      client_id,
      client_secret,
    }),
  };
  // console.log("Final Config>>", updatedConfig);

  // calling to backend
  const loginRes = await makeRequest(updatedConfig);

  console.log("Login Res>>", loginRes);

  if (loginRes && loginRes.success) {
    const access_token = loginRes.data && loginRes.data.access_token;
    const userConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${base_url}/api/auth/user`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    const userRes = await makeRequest(userConfig);
    console.log("User Res>>", userRes);
    if (body.isRemember) {
      setCookie(
        auth_token,
        JSON.stringify({
          ...loginRes.data,
          isRemember: true,
        }),
        {
          req, // needed for ssr
        //   res, // needed for ssr
          maxAge: 2 * 60 * 60, // 2 hour
          httpOnly: true,
          secure: true,
        }
      );
      userRes &&
        userRes.data &&
        setCookie(
          auth_user,
          JSON.stringify({ ...userRes.data, userKey: body.password }),
          {
            req, // needed for ssr
            // res, // needed for ssr
            maxAge: 2 * 60 * 60, // 2 hour
            httpOnly: true,
            secure: true,
          }
        );
    } else {
      //   console.log("Setting cookie auth_token", auth_token);
      //   console.log("Setting cookie data", data);

      console.log("Req>>", req);
      console.log("Res>>", res);

      setCookie(
        auth_token,
        JSON.stringify({
          ...loginRes.data,
          isRemember: false,
        }),
        {
          req,
        //   res,
          maxAge: 2 * 60 * 60, // 2 hour
          // maxAge: 15, // 15 secs
        //   httpOnly: true,
        //   secure: true,
        }
      );

      //   userRes &&
      //     userRes.data &&
      //     setCookie(auth_user, JSON.stringify(userRes.data), {
      //       req, // needed for ssr
      //       res, // needed for ssr
      //       maxAge: 2 * 60 * 60, // 2 hour
      //       // maxAge: 15, // 15 secs
      //       httpOnly: true,
      //       secure: true,
      //     });
    }
    // if (
    //   getCookie(auth_token, { req, res }) &&
    //   getCookie(auth_user, { req, res })
    // ) {
    //   console.log("Complete setting auth token in client browser");
    //   //   return NextResponse.json();

    //   return new NextResponse(
    //     JSON.stringify({
    //       success: true,
    //       message: "Success",
    //       ...loginRes,
    //     })
    //   );
    // }
  }
  return new NextResponse(JSON.stringify(loginRes));
}
