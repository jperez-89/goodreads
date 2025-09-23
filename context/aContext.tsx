import { use, createContext, type PropsWithChildren, useState } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import { loginService, registerService } from '@/services/libraries';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
    signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: (acces_token: string) => void;
    getUser: () => void;
    session?: string | null;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// This hook can be used to access the user info.
export function useSession() {
    const value = use(AuthContext);
    if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }

    return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    const call_Register = async (email: string, password: string, firstName: string, lastName: string) => {
        const response = await registerService({ email, password, firstName, lastName })
        // console.warn("aContext L32", response)

        if (response.error) return response;

        return response
    }

    const call_Login = async (email: string, password: string) => {
        const response = await loginService({ email, password })
        // console.info("aContext L31 - call_Login", response);
        if (response.error) return response;

        await SecureStore.setItemAsync("user", JSON.stringify(response))

        return response
    }

    const call_Logout = async (token: string) => {
        await SecureStore.deleteItemAsync(token)
    }

    const getUser = async () => {
        const data = await SecureStore.getItemAsync("user")
        // console.log("aCotext L51 - getUser", data);

        if (!data) return null;

        return data
    }

    return (
        <AuthContext.Provider
            value={{
                signUp: async (email: string, password: string, firstName: string, lastName: string) => {
                    const response = await call_Register(email, password, firstName, lastName)
                    // console.log("aContext L72 - signUp", response);

                    if (response && response.error) return response;
                },
                signIn: async (email: string, password: string) => {
                    const response = await call_Login(email, password)
                    // console.log("aContext L57 - signIn", response);

                    if (response && response.error) return response;

                    setSession(JSON.stringify(response));
                },
                signOut: (token: string) => {
                    call_Logout(token)
                    setSession(null);
                    // console.warn("aContext L66 - Sesion cerrada - signOut", token);
                },
                getUser: async () => {
                    const data = await getUser();
                    const currentSession = JSON.parse(data);

                    setSession(data);
                    // setSession(currentSession);
                    // console.log("aContext L73 - getUser", data);
                },
                session,
                isLoading
            }}>
            {children}
        </AuthContext.Provider>
    );
}
