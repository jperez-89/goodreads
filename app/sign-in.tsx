import React, { useState } from 'react'
import { Stack, router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Image, Pressable, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '@/context/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession } from "@/context/aContext";
import { Eye, EyeSlash } from '@/components/Icons/Icons';


export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    // const { onLogin, authState } = useAuth()
    // const router = useRouter()
    const { signIn } = useSession();

    const login = async () => {
        signIn(email, password);
        router.replace('/');

        //? Login con AuthContext
        // const result = await onLogin!(email, password)
        // // console.warn(result);

        // if (result && result.error) {
        //     alert(result.msg)
        // }
        // else {
        //     router.navigate("Book/Books")
        // }
    }

    return (
        <>
            <StatusBar barStyle='light-content' />
            <Stack.Screen options={{
                headerShown: false,
            }} />
            <View className='bg-white h-full w-full'>
                <Image className='w-full h-full absolute' source={require('@/assets/background.png')} />

                {/* Lamparas */}
                <View className='flex-row justify-around w-full absolute'>
                    <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className='h-60 w-24' source={require('@/assets/light.png')} />
                    <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className='h-40 w-16' source={require('@/assets/light.png')} />
                </View>

                <View className="flex h-full w-full justify-around pt-40 pb-10">
                    {/* Titulo */}
                    <View className="flex items-center">
                        <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-5xl text-white font-bold tracking-wider">Login</Animated.Text>
                    </View>

                    {/* Form */}
                    <View className="flex items-center mx-4 space-y-4">
                        <Animated.View entering={FadeInDown.duration(1000).springify()} className="flex-row items-center w-full bg-black/5 p-5 mb-3 rounded-2xl">
                            <TextInput className="flex-1 ml-2 text-gray-700" id='email' value={email} onChangeText={(text: string) => { setEmail(text) }} placeholder='Email'  >
                            </TextInput>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="flex-row items-center w-full bg-black/5 p-5 mb-3 rounded-2xl">
                            <TextInput className="flex-1 ml-2 text-gray-700" id='password' value={password} onChangeText={(text: string) => { setPassword(text) }} placeholder='Password' secureTextEntry={!passwordVisible}>
                            </TextInput>
                            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                {passwordVisible ? <Eye /> : <EyeSlash />}
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                            <Pressable onPress={login} className='w-full p-3 mb-3 rounded-2xl bg-sky-400'><Text className="text-white text-xl text-center font-bold">Login</Text></Pressable>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center mt-2">
                            <Text>No tienes cuenta aún?</Text>
                            <Pressable onPress={() => router.push('./signupScreen')}><Text className="text-sky-600 font-bold text-center "> Crear cuenta</Text></Pressable>
                        </Animated.View>
                    </View>
                </View>
            </View >
        </>
    );
}
