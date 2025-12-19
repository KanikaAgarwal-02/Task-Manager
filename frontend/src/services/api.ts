import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // VERY IMPORTANT for cookies (JWT)
});

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: false, // true only if using cookies
// });

// // OPTIONAL: response error logging
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(
//       "API ERROR 👉",
//       error.response?.data || error.message
//     );
//     return Promise.reject(error);
//   }
// );

// export default api;
