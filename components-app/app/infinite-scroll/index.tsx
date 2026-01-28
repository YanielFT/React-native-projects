import FadeInImage from "@/components/images/FadeInImage";
import ThemedView from "@/components/shared/ThemedView";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useState } from "react";
import { FlatList } from "react-native";

const InfiniteScrollScreen = () => {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5]);

  const color = useThemeColor({}, "primary");

  const loadMore = () => {
    const newNumbers = Array.from({ length: 5 }, (_, i) => numbers.length + i);

    setTimeout(() => {
      setNumbers([...numbers, ...newNumbers]);
    }, 3000);
  };

  return (
    <ThemedView>
      <FlatList
        keyExtractor={(item) => item.toString()}
        data={numbers}
        renderItem={({ item }) => <ListItem number={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6}
      />
    </ThemedView>
  );
};
export default InfiniteScrollScreen;

interface ListItemProps {
  number: number;
}

const ListItem = ({ number }: ListItemProps) => {
  return (
    <FadeInImage
      style={{
        height: 400,
        width: "100%",
        resizeMode: "cover",
      }}
      uri={`https://picsum.photos/id/${number}/500/400`}
    />
  );
};
