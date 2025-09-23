import { loginService } from "@/services/libraries";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';

const useAuth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState([])
    const [error, setError] = useState("");
    const router = useRouter()

    const handleOnchange = (e: string) => {
        console.log(e);

    }

    const handleSubmit = async () => {
        if (!email || !password) {
            setError("Complete todos los campos");
            return;
        }

        try {
            const response = await loginService({ email, password });
            if (response && response.access_token) {
                console.log(response.access_token);
                setUser(response);
                // Usamos SecureStore en lugar de localStorage y guardamos la respuesta directamente
                await SecureStore.setItemAsync("user_session", JSON.stringify(response));

                router.push("../app/Book/Books");
            } else {
                setError("Datos inválidos");
            }
        } catch (error) {
            console.error(error);
            setError("Ocurrió un error al iniciar sesión.");
        }
    }

    return { error, email, password, setEmail, setPassword, handleSubmit, handleOnchange }
}

export default useAuth