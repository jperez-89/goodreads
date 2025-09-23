import { View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface RatingProps {
    size?: 'small' | 'large';
    rating: number;
    onRatingChange?: (v: number) => void;
}

export const Rating: React.FC<RatingProps> = ({
    rating = 0,
    onRatingChange,
    size = 'small',
}) => {
    const starSize = size === 'large' ? 36 : 14;
    return (
        <View
            style={{
                flexDirection: 'row',
                gap: 3,
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
            }}
        >
            {[1, 2, 3, 4, 5].map((v) => {
                const color = rating >= v ? 'orange' : 'black';
                const name = rating >= v ? 'star' : 'star-o';
                return (
                    <TouchableOpacity
                        key={v}
                        onPress={() => {
                            onRatingChange?.(v);
                        }}
                    >
                        <FontAwesome name={name} size={starSize} color={color} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};