import axios from "axios";


// API instance for requests that need '/api'
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // Ensures cookies are sent with every request
});

// General instance for requests that don’t need '/api'
const generalApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
});


// Intercept responses for both instances
const responseInterceptor = (response) => response;
const errorInterceptor = (error) => {
    // if (error.response && error.response.status === 401) {

    //     // Redirect user to login page
    //     // window.location.href = "/login";
    // }
    return Promise.reject(error);
};

api.interceptors.response.use(responseInterceptor, errorInterceptor);
generalApi.interceptors.response.use(responseInterceptor, errorInterceptor);

export { api, generalApi };