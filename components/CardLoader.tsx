import { View } from 'react-native'
import React from 'react'

const CardLoader = () => {
    return (
        <View className="flex flex-col bg-neutral-300 animate-pulse rounded-xl mx-10 my-2 p-4 gap-4">
            <View className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></View>
            <View className="flex flex-col gap-2">
                <View className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></View>
                <View className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></View>
                <View className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></View>
                <View className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></View>
            </View>
        </View>
    )
}

export default CardLoader