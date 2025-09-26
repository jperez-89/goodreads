import React, { useState } from "react";
import { router } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSession } from "@/context/aContext";
import { Eye, EyeSlash, Lock, Mail } from "./Icons/Icons";


const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const scale = useSharedValue(1);
    const { signIn } = useSession()

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
        // console.warn('handlePressOut');
        if (!email && !password) {
            alert('Correo y contraseña son obligatorios');
            console.warn('SignIn - Correo y contraseña son obligatorios');
            return
        }

        const res = signIn(email, password);
        // console.log("SignIn L33", res);
        res.then((data) => {
            if (data) alert(data.msg); console.warn("SignIn L37 ", data.msg);
        })
    };

    return (
        <View className="flex-1 bg-gray-200 justify-center items-center px-6">
            {/* Ícono biométrico */}
            <View className="bg-white w-16 h-16 rounded-2xl justify-center items-center shadow-md mb-6">
                <Image
                    // src="./assets/fingerprint.png"
                    source={{ uri: "https://img.icons8.com/ios-filled/50/fingerprint.png" }}
                    style={{ width: 32, height: 32 }}
                />
            </View>

            <Text className="text-2xl font-bold text-gray-800 mb-2">Biblioteca Virtual</Text>
            <Text className="text-gray-500 mb-6">Ingresa a tu cuenta</Text>

            {/* Input Email */}
            <View className="flex-row items-center bg-gray-300/50 rounded-2xl px-4 py-3 mb-4 shadow-inner">
                <Mail />
                <TextInput
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    className="flex-1 ml-2 text-gray-700"
                    keyboardType="email-address"
                />
            </View>

            {/* Input Password */}
            <View className="flex-row items-center bg-gray-300/50 rounded-2xl px-4 py-3 mb-2 shadow-inner">
                <Lock />
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry={!passwordVisible}
                    value={password}
                    onChangeText={setPassword}
                    className="flex-1 ml-2 text-gray-700"
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <Eye /> : <EyeSlash />}
                </TouchableOpacity>
            </View>

            <TouchableOpacity className="self-end mb-6">
                <Text className="text-blue-500">Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Botón Login Animado */}
            <Animated.View style={animatedStyle} className="w-full">
                <TouchableOpacity
                    className="bg-white rounded-2xl py-3 shadow-md items-center"
                    activeOpacity={0.8}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <Text className="text-gray-800 font-bold">Iniciar</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Divider */}
            <Text className="text-gray-400 my-6">O inicia con</Text>

            {/* Social Buttons */}
            <View className="flex-row gap-5">
                <View className="bg-white w-14 h-14 rounded-2xl items-center justify-center shadow-md">
                    <Image source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }} style={{ width: 28, height: 28 }} />
                </View>
                <View className="bg-white w-14 h-14 rounded-2xl items-center justify-center shadow-md">
                    <Image source={{ uri: "https://img.icons8.com/color/48/facebook.png" }} style={{ width: 28, height: 28 }} />
                </View>
                <View className="bg-white w-14 h-14 rounded-2xl items-center justify-center shadow-md">
                    <Image source={{ uri: "https://img.icons8.com/ios-filled/50/mac-os.png" }} style={{ width: 28, height: 28 }} />
                </View>
            </View>

            {/* Sign Up */}
            <View className="flex-row mt-8">
                <Text className="text-gray-500">Aún no tienes una cuenta? </Text>
                <TouchableOpacity onPress={() => router.push('./signup')}>
                    <Text className="text-blue-500 font-semibold">Sign Up</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-8 rounded-2xl items-center justify-center">
                <Image className="rounded-2xl shadow-md w-96 h-64" source={require('@/assets/bi.jpg')} />
            </View>
        </View>
    );
}

export default SignInScreen
