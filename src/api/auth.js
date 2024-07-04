const API_URL = process.env.REACT_APP_API_URL;
const PATH = API_URL + "/nfc/authentication";

// fetch verification codes

export const fetchCodes = async () => {
  try {
    const response = await fetch(PATH);
    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(data.message || "Failed to fetch codes");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch codes");
  }
};

// post code for verification
export const sendCode = async () => {
  try {
    const response = await fetch(PATH);
    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(data.message || "Failed to send code");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to send code");
  }
};
