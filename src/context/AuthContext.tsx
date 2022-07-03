import { signInRequest } from "@/services/auth";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";

interface AuthContextData {
    signIn(credentials: SignInCredentials): Promise<void>;
    logout: () => Promise<void>;
    user: undefined | User
    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface SignInCredentials {
    email: string;
    password: string;
    google?: boolean;
    avatar?: string;
    name?: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const isAuthenticated = !!user.id;
    const router = useRouter();

    async function signIn({ email, password, google, avatar, name: userName }: SignInCredentials) {
        const { token, user: { id, name, avatar: avatar_url } } = await signInRequest({
            email,
            password,
            google,
            avatar,
            name: userName
        })

        const loggedUser = { id, name, email, avatar: avatar_url }
        setUser(loggedUser)

        setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 5, // 1 hour
        })

        setCookie(undefined, 'nextauth.avatar', avatar_url, {
            maxAge: 60 * 60 * 5, // 5 hour
        })

        setCookie(undefined, 'nextauth.name', name, {
            maxAge: 60 * 60 * 5, // 5 hour
        })

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        router.push('/home');
    }

    async function logout() {
        destroyCookie(undefined, 'nextauth.token');
        destroyCookie(undefined, 'nextauth.avatar');
        destroyCookie(undefined, 'nextauth.name');
        router.push('/signin');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}