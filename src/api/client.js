import realAxios from "axios";

const axios = realAxios.create({
    withCredentials: process.env.REACT_APP_WITH_CREDENTIALS,
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default axios;