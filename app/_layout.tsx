import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { SessionProvider, useSession } from "@/context/aContext";
import { SplashScreenController } from "@/components/SplashScreenController";
import { ThemeProvider, useTheme } from "@/theme/ThemeProvider";

export default function Layout() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SessionProvider>
  )
}

function App() {
  const { session, getUser } = useSession()

  useEffect(() => {
    // if (!session) return
    getUser()
  }, [])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(Book)" />
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen options={{ statusBarStyle: 'dark' }} name="signinScreen" />
        {/* <Stack.Screen name="sign-in" /> */}
        <Stack.Screen options={{ statusBarStyle: 'light' }} name="signupScreen" />
      </Stack.Protected>
    </Stack>
  )
}