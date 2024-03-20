import axios from "axios";

export const makeRequest = async (config) => {
  try {
    const response = await axios(config);

    console.log("Response>>>", response);

    const resData = response.data;
    return {
      status: resData.status,
      statusText: resData.statusText,
      success: (resData && resData.success) || false,
      message: (resData && resData.message) || "Custom Message",
      data: (resData && resData.data) || null,
    };
  } catch (error) {
    console.log(`Error Response ${error}`);
    // console.log(`Error Response ${JSON.stringify(error)}`);
    if (error && error.response) {
      console.log(
        "Error Response",
        error.response.status,
        error.response.statusText,
        error.response.data.message && error.response.data.message
      );
      const { status, statusText } = error.response;
      const { success } = error.response.data;
      return {
        status,
        statusText,
        success,
        message: error.response.data.message
          ? error.response.data.message
          : "Custom Error",
      };
    }

    // return {};
  }
};
