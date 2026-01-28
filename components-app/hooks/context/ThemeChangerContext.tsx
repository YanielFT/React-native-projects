import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeChangerContextType {
  currentTheme: "light" | "dark";
  isSystemTheme: boolean;

  bgColor: string;
  toggleTheme: () => void;
  setSystemTheme: () => void;
}

const ThemeChangerContext = createContext<ThemeChangerContextType>(
  {} as ThemeChangerContextType,
);

export const useThemeChangerContext = () => {
  return useContext(ThemeChangerContext);
};

export const ThemeChangerProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [isSystemThemeEnabled, setIsSystemThemeEnabled] = useState(true);

  const currentTheme = isSystemThemeEnabled
    ? colorScheme
    : isDarkMode
      ? "dark"
      : "light";

  const backgroundColor = isDarkMode
    ? Colors.dark.background
    : Colors.light.background;

  useEffect(() => {
    getData();
  }, []);

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem("theme", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const themeSaved = await AsyncStorage.getItem("theme");
      if (!themeSaved) return;

      setIsDarkMode(themeSaved === "dark");
      setIsSystemThemeEnabled(themeSaved === "system");
      setColorScheme(themeSaved as "light" | "dark" | "system");
    } catch (e) {
      // error reading value
    }
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemeChangerContext.Provider
        value={{
          currentTheme: currentTheme ?? "light",
          isSystemTheme: isSystemThemeEnabled,
          bgColor: backgroundColor,
          toggleTheme: () => {
            setIsDarkMode(!isDarkMode);
            setColorScheme(isDarkMode ? "dark" : "light");
            storeData(isDarkMode ? "dark" : "light");
            //persistir en AsyncStorage si quieres recordar la preferencia
            setIsSystemThemeEnabled(false);
          },
          setSystemTheme: () => {
            setIsSystemThemeEnabled(true);
            setColorScheme("system");
            storeData("system");
          },
        }}
      >
        {children}
      </ThemeChangerContext.Provider>
    </ThemeProvider>
  );
};
