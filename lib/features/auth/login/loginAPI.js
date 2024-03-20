import {
  base_url,
  buildConfig,
  client_id,
  client_secret,
  frontend_domain,
  grant_type,
} from "../../../commonFunctions";
import { makeRequest } from "../../../makeRequest";

export const login = async ({ email, password }) => {
  const body = new FormData();
  body.append("grant_type", grant_type);
  body.append("client_id", client_id);
  body.append("client_secret", client_secret);
  body.append("email", email);
  body.append("password", password);

  console.log("BODY>>", body);

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${base_url}/api/auth/login`,
    data: body,
  };

  const { status, statusText, success, message, data } = await makeRequest(
    config
  );
  return {
    status,
    statusText,
    success,
    message,
    data,
  };
};
