import "../global.css";
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
  const { session } = useSession()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(book)" />
        {/* <Stack.Screen name="(tabs)" /> */}
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  )
}