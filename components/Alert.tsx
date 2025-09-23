import { View, Text, Pressable } from 'react-native'
import { CloseIcon } from './Icons/Icons'

interface Props {
    text: string
    onPress: () => void,
    color?: 'red' | 'green' | 'yellow'
}

const Alert = ({ text, color = 'red', onPress }: Props) => {
    return (
        <View className={`flex-row items-center justify-around p-4 mx-4 mb-2 border-t-4 border-${color}-300  bg-${color}-50`} role="alert">
            <Text className='flex-1 text-sm font-medium'>{text}</Text>
            <Pressable onPress={onPress}><CloseIcon color={color} /></Pressable>
        </View>

    )
}

export default Alert