import { getCookie, setCookie } from "cookies-next";
import { NextResponse } from "next/server";

import { makeRequest } from "../../../lib/makeRequest";

import { auth_token, base_url } from "../../../lib/commonFunctions";

export async function POST(req, res) {
  const accessToken = auth_token && getCookie(auth_token, { req, res });
  const { access_token } = (accessToken && JSON.parse(accessToken)) || {};

  const body = await req.json();

  const config = (body && body.configForBackend) || {};
  const configHeaders = (config && config.headers) || {};

  const updateHeaders = { ...configHeaders };
  if (!configHeaders.Authorization) {
    updateHeaders["Authorization"] = `Bearer ${access_token}`;
  }

  console.log("Config >>", config);

  if (config && Object.keys(config).length > 0) {
    const updatedConfig = {
      ...config,
      maxBodyLength: Infinity,
      url: `${base_url}/api${config.url}`,
      headers: {
        ...updateHeaders,
      },
    };
    console.log("Config exist>>", updatedConfig);
    // calling to backend
    const { status, statusText, success, message, data } = await makeRequest(
      updatedConfig
    );
    // return NextResponse.json();
    return new NextResponse(
      JSON.stringify({
        status,
        statusText,
        success,
        message,
        data,
      })
    );
  }
  // console.log("Config not exist");
  // return NextResponse.json();

  return new NextResponse(
    JSON.stringify({
      status: 400,
      statusText: "Bad Request",
      success: false,
      message: "",
      data: [],
    })
  );
}
