import "../global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { SessionProvider, useSession } from "@/context/aContext";
import { SplashScreenController } from "@/components/SplashScreenController";
import { ThemeProvider } from "@/theme/ThemeProvider";

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
    // console.log("session L23", session);
    if (!session) return
    getUser()
  }, [])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(book)" />
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        {/* <Stack.Screen options={{ statusBarStyle: 'dark' }} name="signinScreen" />
        <Stack.Screen options={{ statusBarStyle: 'light' }} name="signupScreen" /> */}
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}