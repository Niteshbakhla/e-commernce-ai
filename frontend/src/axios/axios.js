import axios from "axios";


const axiosinstance = axios.create({
            baseURL: "https://e-commernce-ai.onrender.com/api",
            withCredentials: true
});

export default axiosinstance