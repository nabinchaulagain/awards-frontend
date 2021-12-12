import Axios from "axios";
import tokenStorage from "./auth";

const api = Axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL });

api.interceptors.response.use((value) => value.data);

api.interceptors.request.use((requestConfig) => {
  if (requestConfig?.headers) {
    requestConfig.headers[
      "Authorization"
    ] = `Bearer ${tokenStorage.accessToken}`;
  }

  return requestConfig;
});

export default api;
