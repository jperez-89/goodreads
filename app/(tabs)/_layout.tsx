import React from 'react'
import { Tabs } from 'expo-router'
import { AboutIcon, BooksIcon, MoviesIcon } from '@/components/Icons/Icons';
import { useTheme } from '@/theme/ThemeProvider';

export default function TabsLayout() {
    const { theme } = useTheme();

    return (
        <Tabs screenOptions={{
            lazy: true,
            headerShown: false,
            tabBarStyle: { backgroundColor: theme.background.header },
            tabBarActiveTintColor: theme.colors.textWhite,
            tabBarInactiveTintColor: theme.colors.textBlack
        }} >
            <Tabs.Screen
                name="(book)"
                options={{
                    tabBarHideOnKeyboard: true,
                    title: `Books`,
                    tabBarIcon: ({ color }) => <BooksIcon color={color} />,
                }} />

            <Tabs.Screen
                name="(movies)"
                options={{
                    title: `Movies`,
                    tabBarIcon: ({ color }) => <MoviesIcon color={color} />,
                }} />

            <Tabs.Screen
                name="(about)"
                options={{
                    title: `About`,
                    tabBarIcon: ({ color }) => <AboutIcon color={color} />,
                }} />
        </Tabs>
    )
}