import ThemedCard from "@/components/shared/ThemedCard";
import ThemedView from "@/components/shared/ThemedView";
import { useThemeChangerContext } from "@/hooks/context/ThemeChangerContext";
import { useState } from "react";
import ThemedSwitch from "../../components/shared/ThemedSwitch";

const ThemesScreen = () => {
  // const { colorScheme, setColorScheme } = useColorScheme();
  const { toggleTheme, currentTheme, isSystemTheme, setSystemTheme } =
    useThemeChangerContext();
  const [darkModeSettings, setDarkModeSetting] = useState({
    // darkMode: colorScheme === "dark",
    darkMode: currentTheme === "dark",
    systemMode: isSystemTheme,
  });
  const setDarkMode = (value: boolean) => {
    // setColorScheme(value ? "dark" : "light");
    toggleTheme();
    setDarkModeSetting((prev) => ({
      ...prev,
      darkMode: value,
      systemMode: false,
    }));
  };
  const setSystemMode = (value: boolean) => {
    if (value) {
      setSystemTheme();
    }
    setDarkModeSetting({
      darkMode: darkModeSettings.darkMode,
      systemMode: value,
    });
  };

  return (
    <ThemedView margin>
      <ThemedCard>
        <ThemedSwitch
          text="Dark Mode"
          className="mb-5"
          value={darkModeSettings.darkMode}
          onValueChange={setDarkMode}
        />
        <ThemedSwitch
          value={darkModeSettings.systemMode}
          onValueChange={setSystemMode}
          text="System Mode"
          className="mb-5"
        />
      </ThemedCard>
    </ThemedView>
  );
};
export default ThemesScreen;
