import { View, Text } from 'react-native';
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

export const BookReviewListItem = ({ userName, title, comment, rating }: BookReviewListItemProps) => {
    const { theme } = useTheme();
    const textColor = theme.colors.currentTheme === 'dark' ? theme.colors.textWhite2 : theme.colors.textBlack;

    return (
        <View className='px-4'>
            <View className='flex-row items-center mr-3'>
                <Avatar className={`font-bold ${textColor}`}>
                    <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Text className={`font-bold ${textColor}`}> {userName}</Text>
                <Text className={`${textColor}`}> rated it </Text>
                <Rating size="small" rating={rating} />
                <Text className={`${textColor}`}> stars</Text>
            </View>

            <Text className='italic color-amber-900 my-1 mx-2'>{comment}</Text>
            <Separator className="my-3 border-t-2 border-gray-800 dark:border-gray-100" />
        </View>
    );
};