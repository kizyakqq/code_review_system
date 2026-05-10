import {createContext, type ReactNode, useContext, useState} from 'react'
import {authApi} from "../services/api";
import type {AuthResponse, User} from "../types";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
    const [user, setUser] = useState<User | null>(null);

    const register = async (username: string, email: string, password: string) => {
        await authApi.register(username, email, password);
    }

    const login = async (email: string, password: string) => {
        const {data}: { data: AuthResponse } = await authApi.login(email, password);
        setToken(data.access_token);
        setUser({id: data.user_id, username: data.username, email: data.email});
        localStorage.setItem('access_token', data.access_token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!token,
            login,
            logout,
            register
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within the AuthProvider');
    return ctx;
}
