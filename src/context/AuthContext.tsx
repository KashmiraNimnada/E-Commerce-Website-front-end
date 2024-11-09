import { createContext, useContext, useState } from "react";
import AuthContextType from "../types/AuthContextType";
import AuthProviderPropsType from "../types/AuthProviderPropsType";

export const AuthContext = createContext<AuthContextType> ({
    isAuthenticated: false,
    jwtToken: null,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({children} : AuthProviderPropsType ) {

    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);
    const [jwtToken,setJwtToken] = useState<string | null>(null);

    function login(jwtToken: string) {
        setIsAuthenticated(true);
        setJwtToken(jwtToken);
    }

    function logout() {
        setIsAuthenticated(false);
        setJwtToken(null);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,jwtToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}