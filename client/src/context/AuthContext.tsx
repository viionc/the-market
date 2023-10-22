import {ReactNode, createContext, useContext, useState} from "react";
import {User} from "../types/types";
import authService from "../services/AuthService";

type AuthContext = {
    user: User | null;
    register: (user: User) => void;
    login: (user: User) => void;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const AuthContext = createContext<AuthContext | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Couldn't initialize AuthContext.");
    }
    return context;
};

function AuthContextProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("user") as string) || null);
    const [error, setError] = useState<string | null>(null);

    const register = async (user: User) => {
        let response;
        try {
            response = await authService.registerUser(user);
            if (response) {
                setUser(response);
            }
        } catch (error: any) {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }
    };
    const login = async (user: User) => {
        let response;
        try {
            response = await authService.loginUser(user);
            if (response) {
                setUser(response);
            }
        } catch (error: any) {
            setError(error.response.data.message);
            console.log(error.response.data.message);
        }
    };
    return <AuthContext.Provider value={{user, register, login, error, setError}}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
