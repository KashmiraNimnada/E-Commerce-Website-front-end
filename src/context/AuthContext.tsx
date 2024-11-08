import { createContext } from "react";
import AuthContextType from "../types/AuthContextType";

export const AuthContext = createContext<AuthContextType> ({
    isAuthenticated: false,
    jwtToken: null,
    login: () => {},
    logout: () => {}
});