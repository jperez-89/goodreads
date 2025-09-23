import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";

type Theme = {
    colors: {
        currentTheme: string;
        background: string;
        backgroundHeader: string;
        text: string;
        textContent: string;
        textWhite: string;
        primary: string;
        secondary: string;
        card: string;
        headerTintColor: string;
        btnPrimary: string;
        btnSecondary: string;
    };
};

const lightTheme: Theme = {
    colors: {
        currentTheme: "light",
        backgroundHeader: "#007Ade",
        background: "#F3F3F3",
        textWhite: "#F3F3F3",
        text: "#F3F3F3",
        textContent: "#000",
        primary: "#007Ada",
        secondary: '',
        card: "#F3F3F3",
        headerTintColor: "#F3F3F3",
        btnPrimary: "#007Ada",
        btnSecondary: "",
    },
};

const darkTheme: Theme = {
    colors: {
        currentTheme: "dark",
        backgroundHeader: "#111",
        background: "#111",
        textWhite: "#F3F3F3",
        text: "#F3F3F3",
        textContent: "#000",
        primary: "#007A",
        secondary: '#',
        card: "#C8C8C8",
        headerTintColor: "#F3F3F3",
        btnPrimary: "#007Ada",
        btnSecondary: "",
    },
};

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<Theme>(
        colorScheme === "dark" ? darkTheme : lightTheme
    );

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === lightTheme ? darkTheme : lightTheme
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook para usarlo fácilmente
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme debe usarse dentro de un ThemeProvider");
    }
    return context;
};
