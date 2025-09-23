import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { View, Text, Modal, Pressable, TextInput } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import useBook from '@/hooks/useBook';
import { useSession } from '@/context/aContext';
import Alert from '../Alert';
import { useTheme } from '@/theme/ThemeProvider';

const ReviewModal = ({ bookId, visible, onClose }) => {
    const [title, setTitle] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [error, setError] = useState("")

    const { addReview } = useBook();

    const { session } = useSession()
    const { access_token } = JSON.parse(session)

    const { theme } = useTheme();

    const containerStyle = theme.colors.currentTheme === 'dark' ? 'bg-black' : 'bg-red-500';
    const textStyle = theme.colors.currentTheme === 'dark' ? 'text-white' : 'text-black';

    function handleAddReview(): void {
        // console.log(error);
        if (!title || !comment || !rating) {
            setError("Complete todos los campos")
            return;
        }

        addReview(bookId, title, comment, rating, access_token);
        setTitle("")
        setComment("")
        setRating(0)
        setError("")
        onClose(false)

    }

    function handleCloseModal(): void {
        setTitle("")
        setComment("")
        setRating(0)
        setError("")
        onClose(false)
    }

    return (
        <>
            <Modal backdropColor={theme.colors.background} visible={visible} animationType="fade" onRequestClose={() => { onClose(false) }} >
                <View className={`rounded-xl mx-2 ${theme.colors.background}`}>
                    <View className={`mt-12 mx-3 py-10 rounded-2xl ${containerStyle}`}>
                        {error &&
                            <Alert text={error} onPress={() => setError("")} />
                        }
                        <Animated.View entering={FadeInDown.duration(1000).springify()} className="w-full bg-black/5 px-5 mb-3 rounded-2xl">
                            <TextInput className={`rounded-2xl ${textStyle} `} placeholder='Titulo' placeholderTextColor={theme.colors.currentTheme === 'dark' ? 'white' : 'gray'} onChangeText={setTitle} value={title} />
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="w-full bg-black/5 px-5 mb-3 rounded-2xl">
                            <TextInput className={` rounded-2xl ${textStyle}`} maxLength={200} numberOfLines={5} placeholder='Escriba su mensaje aquí...' placeholderTextColor={theme.colors.currentTheme === 'dark' ? 'white' : 'gray'} onChangeText={setComment} value={comment} />
                            <Text className={`${textStyle} text-sm text-muted-foreground text-right mt-1`} >
                                {comment.length}/{200}
                            </Text>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full bg-black/5 p-5 mb-3 rounded-2xl">
                            <Text className={`text-bold ${textStyle}`}>
                                Rating: {rating}
                            </Text>

                            <View className='flex-row mt-3 '>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Pressable key={star} onPress={() => setRating(star)}>
                                        <AntDesign name={star <= Number(rating) ? "star" : "staro"} size={24} color={star <= Number(rating) ? "gold" : "gray"} />
                                    </Pressable>
                                ))}
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className={'flex-row justify-around mt-5'}>
                            <Pressable onPress={handleCloseModal} className='p-3 rounded-2xl bg-gray-300'><Text className="text-white text-xl text-center font-bold">Cancelar</Text></Pressable>

                            <Pressable onPress={handleAddReview} className={`p-3 rounded-2xl`} style={{ backgroundColor: theme.colors.btnPrimary }} ><Text className="text-white text-xl text-center font-bold">Agregar</Text></Pressable>
                        </Animated.View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ReviewModal