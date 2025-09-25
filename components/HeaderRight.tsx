import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '@/theme/ThemeProvider'
import { DarkThemeIcon, LightThemeIcon, SettingThemeIcon } from './Icons/Icons'

const HeaderRight = ({ onToggle, onChangeTheme }) => {
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
            <Pressable onPress={onChangeTheme}>
                <SettingThemeIcon color={theme.colors.headerTintColor} />
            </Pressable>
        </View>
    )
}

export default HeaderRight