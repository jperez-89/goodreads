import React, { createContext, useContext, useState, ReactNode } from "react";
import { Appearance } from "react-native";

type Theme = {
    colors: {
        currentTheme: string;
        text: string;
        textContent: string;
        textWhite: string;
        textWhite2: string;
        textBlack: string;
        primary: string;
        secondary: string;
        card: string;
        headerTintColor: string;
        btnPrimary: string;
        btnSecondary: string;
    };
    background: {
        header: string;
        content: string;
        bg_content: string;
        btn_primary: string;
        btn_secondary: string;
    }
};

// bg - sky - 100 : #E0F2FE
// bg - sky - 200 : #BAE6FD
// bg - sky - 300 : #7DD3FC
// bg - sky - 400 : #38BDF8
// bg - sky - 500 : #0EA5E9
// bg - sky - 600 : #0284C7
// bg - sky - 700 : #0369A1
// bg - sky - 800 : #075985
// bg - sky - 900 : #0C4A6E
// bg - sky - 950 : #082F49

const lightTheme: Theme = {
    colors: {
        currentTheme: "light",
        textWhite: "#F3F3F3",
        textWhite2: "text-white",
        textBlack: "text-dark",
        text: "#F3F3F3",
        textContent: "color-sky-900",
        primary: "#0284C7",
        secondary: '',
        card: 'bg-sky-50',
        headerTintColor: "#F3F3F3",
        btnPrimary: "#0284C7",
        btnSecondary: "",
    },
    background: {
        header: "#0284C7",
        content: "#F3F3F3",
        bg_content: 'bg-white',
        btn_primary: "bg-sky-600",
        btn_secondary: "bg-slate-400",
    }
};

const darkTheme: Theme = {
    colors: {
        currentTheme: "dark",
        textWhite: "#F3F3F3",
        textWhite2: "text-white",
        textBlack: "text-dark",
        text: "#F3F3F3",
        textContent: "text-white",
        primary: "#007A",
        secondary: '#',
        card: 'bg-sky-800/80',
        headerTintColor: "#F3F3F3",
        btnPrimary: "#007Ada",
        btnSecondary: "",
    },
    background: {
        header: "#082F49",
        content: "#082F49",
        bg_content: 'bg-sky-950',
        btn_primary: "bg-sky-700",
        btn_secondary: "bg-slate-600",
    }
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
