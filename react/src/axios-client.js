import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// request interceptors
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// response interceptors
axiosClient.interceptors.response.use(
  (response) => {
    // success
    return response;
  },
  (error) => {
    try {
      // rejected
      const { response } = error; //destructure error and take response

      if (response.status === 401) {
        // unauthorized
        localStorage.removeItem("ACCESS_TOKEN");
      }
    } catch (e) {
      console.error(e);
    }

    throw error;
  }
);

export default axiosClient;
