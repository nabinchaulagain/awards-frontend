import Axios from "axios";

const api = Axios.create({ baseURL: process.env.VUE_APP_API_BASE_URL });

api.interceptors.response.use((value) => value.data);

// api.interceptors.request.use((requestConfig)=>{
//     requestConfig.headers['Authorization'] = ``
// })

export default api;
