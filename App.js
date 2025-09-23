import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Books from "./components/Book/Books_NO";
import Movies from "./app/(Movies)/Movies";
import "./global.css";

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <View className="flex-1 px-5 justify-center bg-[#23a18267]">
          <Movies />
          {/* <Books /> */}
        </View>
      </SafeAreaProvider>
    </>
  );
}
