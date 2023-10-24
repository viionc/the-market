import axios from "axios";
import {User} from "../types/types";

const API_URL = "/api/auth/";
let isLoading = false;

const registerUser = async (user: User) => {
    if (isLoading) return;
    isLoading = true;
    const response = await axios.post(API_URL, user);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    isLoading = false;
    return response.data;
};

const loginUser = async (email: string, password: string) => {
    if (isLoading) return;
    isLoading = true;
    const response = await axios.post(`${API_URL}login/`, {email, password});
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    isLoading = false;
    return response.data;
};

const authService = {
    registerUser,
    loginUser,
    status,
};

export default authService;
