import useBook from '@/hooks/useBook';
import React, { useEffect } from 'react'
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { BookReviewListItem } from './BookReviewListItem';
import { useTheme } from '@/theme/ThemeProvider';

interface BookReviewListProps {
    book_id: string;
}

const BookReviewList: React.FC<BookReviewListProps> = ({ book_id }) => {
    const { getReviewByBookId, getMoreReviewByBookId, reviews, page, hasMore, loading, isLoadingMore } = useBook();
    const { theme } = useTheme();

    const onRefresh = async () => {
        // console.warn("BookReviewList L14 - onRefresh");
        getReviewByBookId(book_id);
    };

    const fetchMoreBookReviews = async () => {
        // console.warn("BookReviewList L19 - fetchMoreBookReviews");
        getMoreReviewByBookId(book_id, page)
    };

    useEffect(() => {
        onRefresh()
    }, [book_id]);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => {
                return (
                    <BookReviewListItem
                        userName={item.user.firstName}
                        title={item.title}
                        comment={item.comment}
                        rating={item.rating}
                    />
                );
            }}
            keyExtractor={(item) => item._id}
            onEndReached={() => {
                if (hasMore) {
                    return;
                }
                fetchMoreBookReviews;
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isLoadingMore ? <ActivityIndicator size="small" /> : null
            }
            ListEmptyComponent={
                !loading ? <Text className={`text-sm p-3 ${theme.colors.currentTheme === 'dark' ? theme.colors.textWhite2 : theme.colors.textBlack}`}>No reviews available for this book.</Text> : null
            }
            refreshing={loading}
            onRefresh={onRefresh}
        />
    );
}

export default BookReviewList