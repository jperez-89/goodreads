import { View, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeProvider'
import { DarkThemeIcon, LightThemeIcon, SettingThemeIcon } from './Icons/Icons'
import { Avatar, AvatarImage } from './ui/avatar'

interface HeaderProps {
    onToggle: () => void;
    onPress: () => void;
    onHiddenStatusBar?: () => void;
}

const HeaderRight = ({ onToggle, onPress, onHiddenStatusBar }: HeaderProps) => {
    const { theme } = useTheme();

    return (
        <View className='gap-2 flex-row items-center justify-center'>
            <Pressable onPress={onToggle}>
                {theme.colors.currentTheme !== 'dark'
                    ? (
                        <DarkThemeIcon color={theme.colors.headerTintColor} />
                    ) : (
                        <LightThemeIcon color={theme.colors.headerTintColor} />
                    )
                }
            </Pressable>
            {/* <Pressable onPress={onHiddenStatusBar}>
                <SettingThemeIcon color={theme.colors.headerTintColor} />
            </Pressable> */}
            <Pressable onPress={onPress}>
                {/* <Image className='h-7 w-7 bg-white rounded-full' source={require('@/assets/avatar.png')} /> */}
                <Avatar className='h-10 w-10 rounded-full'>
                    <AvatarImage source={require('@/assets/avatar.png')} />
                </Avatar>
            </Pressable>
        </View>
    )
}

export default HeaderRight