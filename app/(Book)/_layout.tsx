import { Pressable, View } from 'react-native'
import { Stack } from 'expo-router'
import { useSession } from '@/context/aContext';
import { useTheme } from '@/theme/ThemeProvider';
import { DarkThemeIcon, LightThemeIcon, SettingThemeIcon } from '@/components/Icons/Icons';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme } = useTheme();
    const { signOut, session } = useSession();

    const { access_token } = JSON.parse(session);

    const handlePress = () => {
        signOut(access_token);
    };

    return (
        <Stack
            screenOptions={{
                // statusBarStyle: theme.colors.currentTheme === 'dark' ? 'light' : 'dark',
                statusBarStyle: 'auto',
                headerStyle: { backgroundColor: theme.colors.backgroundHeader },
                headerTintColor: theme.colors.headerTintColor,
                contentStyle: { backgroundColor: theme.colors.background },
                animation: 'slide_from_right',
                headerRight: () => (
                    <>
                        <View className='gap-2 flex-row items-center justify-center bg-te'>
                            <Pressable onPress={toggleTheme}>
                                {theme.colors.currentTheme !== 'dark'
                                    ? (
                                        <DarkThemeIcon color={theme.colors.headerTintColor} />
                                    ) : (
                                        <LightThemeIcon color={theme.colors.headerTintColor} />
                                    )
                                }
                            </Pressable>
                            <Pressable onPress={handlePress}>
                                <SettingThemeIcon color={theme.colors.headerTintColor} />
                            </Pressable>
                        </View>
                    </>
                )
            }} />
    )
}