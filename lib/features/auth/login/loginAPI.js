import { buildConfig, frontend_domain } from "../../../commonFunctions";
import { makeRequest } from "../../../makeRequest";

export const login = async ({ email, password }) => {
  const body = {
    email,
    password,
  };

  // const body = new FormData();
  // body.append("grant_type", grant_type);
  // body.append("client_id", client_id);
  // body.append("client_secret", client_secret);
  // body.append("email", email);
  // body.append("password", password);

  const configForBackend = {
    method: "post",
    maxBodyLength: Infinity,
    url: `/auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
    // data: body,
  };
  const config = buildConfig({
    url: `${frontend_domain}/api/auth-api/login`,
    data: {
      configForBackend,
    },
  });
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
