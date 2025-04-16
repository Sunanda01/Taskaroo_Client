import axios from "axios";



// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

// Function to get tokens from localStorage
api.interceptors.request.use(
    (config) => {
      const accesstoken = localStorage.getItem("accessToken");
      if (accesstoken) {
        config.headers.Authorization = `Bearer ${accesstoken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//     (response) => response, // If response is OK, return it
//     async (error) => {
//       const originalRequest = error.config;
      
//       // If Unauthorized (401) and request has not been retried yet
//       if (error.response?.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
        
//         try {
//           // Get refresh token
//         //   const refreshToken = getRefreshToken();
//         //   if (!refreshToken) {
//         //     console.error("No refresh token available.");
//         //     return Promise.reject(error);
//         //   }
  
//           // Request a new access token
//           const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/refreshToken`, {},{withCredentials:true});
  
//           // Save new tokens
//         //   const { accessToken, refreshToken: newRefreshToken } = response.data;
          
  
//           // Retry original request with new token
//           originalRequest.headers.Authorization = `Bearer ${response.user.accessToken}`;
//           return api(originalRequest);
//         } catch (refreshError) {
//           console.error("Failed to refresh token:", refreshError);
//           return Promise.reject(refreshError);
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );
  
  export default api;
