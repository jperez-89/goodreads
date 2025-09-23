import { Stack } from 'expo-router'
import Logo from './Logo'

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: 'red' },
                headerTintColor: '#000',
                statusBarStyle: 'dark',
                animation: 'slide_from_right',
            }} >
            <Stack.Screen name="Movies" options={{
                contentStyle: { backgroundColor: 'bg-violet-100' },
                headerTitle: () => <Logo />,
                animation: 'slide_from_left',
                headerLeft: () => null
            }} />
        </Stack>
    )
}