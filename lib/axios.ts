import axios from "axios";

const api = axios.create({
    baseURL: "https://test-fe.mysellerpintar.com/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Jika kamu simpan token di localStorage
// api.interceptors.request.use((config) => {
//     if (typeof window !== "undefined") {
//         const token = localStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//     }

//     return config;
// });

export default api;