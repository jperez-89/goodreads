import { View, Text, StyleSheet } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Rating } from '../Rating';
import { useTheme } from '@/theme/ThemeProvider';

interface BookReviewListItemProps {
    userName: string;
    title: string;
    comment: string;
    rating: number;
}

export const BookReviewListItem = ({
    userName,
    title,
    comment,
    rating,
}: BookReviewListItemProps) => {
    const { theme } = useTheme();
    const textColor = theme.colors.currentTheme === 'dark' ? theme.colors.textWhite : theme.colors.textContent;

    return (
        <View className='px-4 shadow-slate-900 elevation-md'>
            <View className='flex-row items-center mr-3'>
                <Avatar>
                    <AvatarFallback className='' >JS</AvatarFallback>
                </Avatar>
                <Text className='font-bold' style={{ color: textColor }}> {userName}</Text>
                <Text style={{ color: textColor }}> rated it </Text>
                <Rating size="small" rating={rating} />
                <Text style={{ color: textColor }}> stars</Text>
            </View>

            <Text className='italic color-amber-900 my-1 mx-2'>{comment}</Text>
            <Separator className="my-3 border-t-2 border-gray-800 dark:border-gray-100" />
        </View>
    );
};