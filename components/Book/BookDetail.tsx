import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native';
import { BookDetailProps } from '@/types/bookTypes';
import useBook from '@/hooks/useBook';
import ReviewModal from './ReviewModal';
import { useSession } from '@/context/aContext';
import { useTheme } from '@/theme/ThemeProvider';

const BookDetail: React.FC<BookDetailProps> = ({ id }) => {
    const { theme } = useTheme();
    const [loadingImage, setLoadingImage] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const { getBookById, getReviewByBookId, reviews, book, showModal, setShowModal } = useBook();

    const { session } = useSession()
    const { user } = JSON.parse(session)
    const user_id = user.id

    useEffect(() => {
        getBookById({ id: id })
        // getReviewByBookId(id)
    }, [id]);


    if (!book) {
        return <Text>Loading...</Text>;
    }
    const { author, coverImage, title, averageRating } = book;
    const textColor = theme.colors.currentTheme === 'dark' ? theme.colors.textWhite2 : theme.colors.textBlack;

    return (
        <>
            <Stack.Screen options={{
                headerTitle: `Book ${title}`,
                animation: 'flip',
                animationDuration: 500,
                headerLeft: () => null
            }} />

            {/* Imagen del libro */}
            <View className='mt-8 flex-col justify-center items-center' >
                {loadingImage && <ActivityIndicator size={'small'} />}
                <Image className='shadow-lg rounded-lg'
                    resizeMode="cover"
                    source={
                        coverImage ? { uri: coverImage } : require('@/assets/no-image.jpg')
                    }
                    style={{ width: 160, height: 260 }}
                    onLoadStart={() => {
                        setLoadingImage(true);
                    }}
                    onLoadEnd={() => {
                        setLoadingImage(false);
                    }}
                />
            </View>

            {/* Detalle del libro */}
            <View className='mt-5 flex-col justify-center items-center'>
                <Text className={`text-bold text-2xl ${textColor}`}>
                    Title: <Text>{title}</Text>
                </Text>
                <Text className={`text-bold text-2xl ${textColor}`}>
                    Author: <Text>{author}</Text>
                </Text>
                <Text className={`text-bold text-2xl ${textColor}`}>
                    Rating: {averageRating}
                </Text>
                {showButton && (
                    <>
                        <Pressable className={`p-3 mb-3 mt-3 rounded-2xl ${theme.background.btn_primary}`} onPress={() => setShowModal(true)}>
                            <Text className={`text-base font-bold ${theme.colors.textWhite2}`}>Nuevo review</Text>
                        </Pressable>
                    </>
                )}
                <ReviewModal bookId={id} visible={showModal} onClose={setShowModal} />
            </View>
        </>
    );
};

export default BookDetail;