import { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { getProfileService, loginService, registerService } from "@/services/libraries";

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null }
    onRegister?: (email: string, password: string, firstName: string, lastName: string) => Promise<any>
    onLogin?: (email: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
    onGetProfile?: (acces_token: string) => Promise<any>
    loggedInUser?: {
        firstName: string | null
        lastName: string | null
        role: string | null
    }
}

const TOKEN_KEY = ''
let ACCESS_TOKEN = ""
const AuthContext = createContext<AuthProps>({})

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>({ token: null, authenticated: null })

    const [loggedInUser, setloggedInUser] = useState<{
        firstName: string | null
        lastName: string | null
        role: string | null
    }>({
        firstName: null,
        lastName: null,
        role: null
    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)

            if (token) {
                ACCESS_TOKEN = `Bearer ${token}`

                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }

        loadToken()
    }, [])

    const register = async (email: string, password: string, firstName: string, lastName: string) => {
        try {
            console.warn("Context L54", email, firstName)
            return registerService({ email, password, firstName, lastName })

        } catch (error) {
            return { error: true, msg: (error as any).reponse.data.msg }
        }
    }

    const login = async (email: string, password: string) => {
        try {
            // console.warn("Context L47", email, password)
            const response = loginService({ email, password })
            response.then(async (data) => {
                // console.warn("Context L49", data);

                setAuthState({
                    token: data.access_token,
                    authenticated: true
                })

                await SecureStore.setItemAsync(TOKEN_KEY, data.access_token)
            })

            return response

        } catch (error) {
            return { error: true, msg: (error as any).reponse.data.msg }
        }
    }

    const logout = async () => {
        console.warn('LogOut');
        await SecureStore.deleteItemAsync(TOKEN_KEY)

        setAuthState({
            token: null,
            authenticated: false
        })
    }

    const profile = async (acces_token: string) => {
        try {
            const response = getProfileService({ acces_token })
            response.then(async (data) => {
                // console.warn("Context - profile L97", data);
                setloggedInUser(data)
            })

            return response

        } catch (error) {
            return { error: true, msg: (error as any).reponse.data.msg }
        }
    }

    // El value se actualiza cuando algún valor de las const que se le pasó en el array cambia
    const value = useMemo(() => {
        return ({
            onRegister: register,
            onLogin: login,
            onLogout: logout,
            onGetProfile: profile,
            authState,
            loggedInUser
        })
    }, [register, login, logout, profile, authState, loggedInUser])

    // const value = {
    //     onRegister: register,
    //     onLogin: login,
    //     onLogout: logout,
    //     authState
    // }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    // return useContext(AuthContext)

    const context = useContext(AuthContext)
    if (!context) throw new Error("Componente no se encuentra dentro del contexto");

    return context
}