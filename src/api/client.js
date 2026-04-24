import realAxios from "axios";

const axios = realAxios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default axios;