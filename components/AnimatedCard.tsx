import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { BookCard } from "./Book/BookCard";

export function AnimatedCard({ book, index }) {
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 400,
                delay: index * 180,
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 4,
                delay: index * 180,
                useNativeDriver: true,
            }),
        ]).start();
    }, [opacity, scale, index]);

    return (
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
            <BookCard book={book} />
        </Animated.View>
    );
}
