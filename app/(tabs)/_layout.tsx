import React from 'react'
import { Tabs } from 'expo-router'
import { AboutIcon, BooksIcon, MoviesIcon } from '@/components/Icons/Icons';
import { useTheme } from '@/theme/ThemeProvider';
import { Pressable, Text, View } from 'react-native';
import { useSession } from '@/context/aContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
    const { theme, toggleTheme } = useTheme();
    const { signOut, session } = useSession();
    const { user } = JSON.parse(session);

    const { access_token } = JSON.parse(session);

    const handlePress = () => {
        signOut(access_token);
    };

    return (
        <SafeAreaView edges={['right', 'left',]} className="flex-1">
            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: theme.background.header },
                tabBarActiveTintColor: theme.colors.textWhite,
                tabBarInactiveTintColor: theme.colors.textBlack
            }} >
                <Tabs.Screen
                    name="(book)"
                    options={{
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
        </SafeAreaView>
    )
}