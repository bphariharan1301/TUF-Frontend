import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000", // Adjust this to your backend API
});

export default instance;
