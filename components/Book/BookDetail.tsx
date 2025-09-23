import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Pressable } from 'react-native';
import { BookDetailProps } from '../../types/bookTypes';
import useBook from '../../hooks/useBook';
import { Stack } from 'expo-router';
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
    const textColor = theme.colors.currentTheme === 'dark' ? theme.colors.textWhite : theme.colors.textContent;

    return (
        <>
            <Stack.Screen options={{
                headerTitle: `Book ${title}`,
                animation: 'slide_from_left',
                headerLeft: () => null
            }} />
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

            <View className='mt-8 flex-col justify-center items-center'>
                <Text className='text-bold text-2xl' style={{ color: textColor }}>
                    Title: <Text>{title}</Text>
                </Text>
                <Text className='text-bold text-2xl' style={{ color: textColor }}>
                    Author: <Text>{author}</Text>
                </Text>
                <Text className='text-bold text-2xl' style={{ color: textColor }}>
                    {averageRating}
                </Text>
                {showButton && (
                    <>
                        <Pressable className=' p-3 mb-3 mt-3 rounded-2xl bg-sky-500' onPress={() => setShowModal(true)}>
                            <Text className="text-white text-base leading-relaxed">Nuevo review</Text>
                        </Pressable>
                    </>
                )}
                <ReviewModal bookId={id} visible={showModal} onClose={setShowModal} />
            </View>
        </>
    );
};

export default BookDetail;