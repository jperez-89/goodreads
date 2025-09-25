import { Stack } from 'expo-router'
import { useTheme } from '@/theme/ThemeProvider';
import { useSession } from '@/context/aContext';
import HeaderRight from '@/components/HeaderRight';

export default function Layout() {
    const { theme, toggleTheme } = useTheme();
    const { signOut, session } = useSession();
    const { user } = JSON.parse(session);

    const { access_token } = JSON.parse(session);

    const handlePress = () => {
        signOut(access_token);
    };

    return (
        <Stack
            screenOptions={{
                headerTitle: `About - ${user.firstName} ${user.lastName}`,
                contentStyle: { backgroundColor: theme.background.content },
                statusBarStyle: 'auto',
                headerStyle: { backgroundColor: theme.background.header },
                headerTintColor: theme.colors.headerTintColor,
                animation: 'flip',
                animationDuration: 500,
                headerRight: () => <HeaderRight onToggle={toggleTheme} onChangeTheme={handlePress} />
            }} />
    )
}