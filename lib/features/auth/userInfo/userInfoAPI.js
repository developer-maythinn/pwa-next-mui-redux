import { base_url } from "../../../commonFunctions";
import { makeRequest } from "../../../makeRequest";

export const getUserInfo = async ({ access_token }) => {
  // console.log("gettting user info", access_token);
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${base_url}/auth/user`,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const { status, statusText, success, message, data } = await makeRequest(
    config
  );
  // console.log("Getting user info", data);
  return {
    status,
    statusText,
    success,
    message,
    data,
  };
};
