import "../global.css";
import { Stack } from "expo-router";
import { SessionProvider, useSession } from "@/context/aContext";
import { SplashScreenController } from "@/components/SplashScreenController";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['right', 'left',]} className="flex-1">
        <SessionProvider>
          <SplashScreenController />
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </SessionProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

function App() {
  const { session } = useSession()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}