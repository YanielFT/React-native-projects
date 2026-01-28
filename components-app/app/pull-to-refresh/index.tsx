import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";

const PullToRefreshScreen = () => {
  const [isRefreshing, setRefreshing] = useState(false);
  const primaryColor = useThemeColor({}, "primary");
  const backgroundColor = useThemeColor({}, "background");
  const onRefresh = async () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          colors={[primaryColor]}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          tintColor={backgroundColor}
          progressBackgroundColor={backgroundColor}
        />
      }
    >
      <ThemedView margin>
        <ThemedText>PullToRefreshScreen</ThemedText>
      </ThemedView>
    </ScrollView>
  );
};
export default PullToRefreshScreen;
