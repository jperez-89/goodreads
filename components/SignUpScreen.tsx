import React, { useState } from 'react'
import { Image, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Eye, EyeSlash } from './Icons/Icons';
import Alert from './Alert';
import { useSession } from '@/context/aContext';

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("")
    const router = useRouter()
    const { signUp, signIn } = useSession()

    const register = async () => {
        if (!email || !password || !firstName || !lastName) {
            setError("Complete todos los campos")
            console.warn("Complete todos los campos")
            return;
        }

        const result = await signUp(email, password, firstName, lastName)
        if (result && result.error) {
            console.warn("SignUp L30", result.msg);
            alert(result.msg)
            // setError(result.msg);
        } else {
            setError("")
            signIn(email, password)
        }
    }

    return (
        <View className='bg-white h-full w-full'>
            {/* <Image className='h-full absolute' source={require('@/assets/background.png')} /> */}
            {/* Campanas */}
            <View className='flex-row justify-around w-full absolute'>
                <Image className='w-full h-80 absolute' source={require('@/assets/background.png')} />
                <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className='h-60 w-24' source={require('@/assets/light.png')} />
                <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className='h-40 w-16' source={require('@/assets/light.png')} />
            </View>

            <View className="flex justify-around my-24">
                {/* Titulo */}
                <View className="flex items-center mt-36 mb-5">
                    <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-5xl color-sky-600/80 font-bold tracking-wider">Sign Up</Animated.Text>
                </View>
                {error && <Alert text={error} onPress={() => setError("")} color='red' />}

                {/* Form */}
                <View className="flex items-center mx-4">
                    {/* Input FirstName */}
                    <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="w-full bg-black/5 p-5 mb-3 rounded-2xl">
                        <TextInput onChangeText={setFirstName} value={firstName} placeholder='Nombre' placeholderTextColor={'gray'} >
                        </TextInput>
                    </Animated.View>

                    {/* Input LastName */}
                    <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full bg-black/5 p-5 mb-3 rounded-2xl">
                        <TextInput onChangeText={setLastName} value={lastName} placeholder='Apellidos' placeholderTextColor={'gray'} >
                        </TextInput>
                    </Animated.View>

                    {/* Input Email */}
                    <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="w-full bg-black/5 p-5 mb-3 rounded-2xl">
                        <TextInput onChangeText={setEmail} value={email} placeholder='Correo electrónico' placeholderTextColor={'gray'} >
                        </TextInput>
                    </Animated.View>

                    {/* Input Password */}
                    <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="flex-row items-center bg-black/5 p-5 mb-3 rounded-2xl">
                        <TextInput className="flex-1 ml-2 text-gray-700" onChangeText={setPassword} value={password} placeholder='Contraseña' placeholderTextColor={'gray'} secureTextEntry={!passwordVisible} >
                        </TextInput>
                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? <Eye /> : <EyeSlash />}
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="w-full">
                        <Pressable onPress={register} className='w-full p-3 mb-3 rounded-2xl bg-sky-400'><Text className="text-white text-xl text-center font-bold">Registrarse</Text></Pressable>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(1200).duration(1000).springify()} className="flex-row justify-center mt-2">
                        <Text>Ya tienes cuenta?</Text>
                        <Pressable onPress={() => router.push('./signinScreen')}><Text className="text-sky-600 font-bold text-center "> Inicia Sesión</Text></Pressable>
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

export default SignUpScreen