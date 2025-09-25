import { Pressable, View } from 'react-native'
import { Stack } from 'expo-router'
import { useSession } from '@/context/aContext';
import { useTheme } from '@/theme/ThemeProvider';
import { DarkThemeIcon, LightThemeIcon, SettingThemeIcon } from '@/components/Icons/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme, toggleTheme } = useTheme();
    const { signOut, session } = useSession();

    const { access_token } = JSON.parse(session);

    const handlePress = () => {
        signOut(access_token);
    };

    return (
        <SafeAreaView edges={['bottom', 'right', 'left']} className="flex-1">
            <Stack
                screenOptions={{
                    statusBarStyle: 'auto',
                    headerStyle: { backgroundColor: theme.background.header },
                    contentStyle: { backgroundColor: theme.background.content },
                    headerTintColor: theme.colors.headerTintColor,
                    animation: 'flip',
                    animationDuration: 500,
                    headerRight: () => (
                        <>
                            <View className='gap-2 flex-row items-center justify-center'>
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
        </SafeAreaView>
    )
}