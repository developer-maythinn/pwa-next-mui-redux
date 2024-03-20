export const isProduction = process.env.NODE_ENV === "production";

export const sleep = (ms) =>
  new Promise((res) => {
    console.log("Sleeping");
    return setTimeout(res, ms);
  });

// server-side
export const base_url = process.env.NEXT_PUBLIC_BASE_URL;
export const client_id = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID;
export const client_secret = process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET;
export const grant_type = process.env.NEXT_PUBLIC_OAUTH_GRANT_TYPE;
export const encryption_key = process.env.NEXT_PUBLIC_PWD_ENCRYPTION_KEY;

// client-side (accessible in server-side too)
export const frontend_domain = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
export const auth_token = process.env.NEXT_PUBLIC_AUTH_TOKEN;
export const auth_user = process.env.NEXT_PUBLIC_AUTH_USER;
export const timeout_sec = process.env.NEXT_PUBLIC_TIMEOUT_SEC;

export const buildConfig = (additionalConfigs) => {
  const config = {
    method: "post", // default
    maxBodyLength: Infinity,
    url: `${frontend_domain}/api/request_data`,
    headers: {},
    ...additionalConfigs,
  };
  return config;
};
