import ThemedButton from "@/components/shared/ThemedButton";
import ThemedText from "@/components/shared/ThemedText";
import ThemedView from "@/components/shared/ThemedView";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  useWindowDimensions,
  View,
} from "react-native";

const SlidesScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isScrollEnable, setIsScrollEnable] = useState(false);

  useEffect(() => {
    if (currentSlideIndex === items.length - 1) setIsScrollEnable(true);
  }, [currentSlideIndex]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isScrollEnable) return;

    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };
  console.log("currentSlideIndex = " + currentSlideIndex);

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) return;
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  return (
    <ThemedView>
      <FlatList
        onScroll={onScroll}
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <SlideItem key={item.title} item={item} />}
        horizontal
        scrollEnabled={isScrollEnable}
        pagingEnabled
      />

      {currentSlideIndex < items.length - 1 && (
        <ThemedButton
          onPress={() => scrollToSlide(currentSlideIndex + 1)}
          className="w-40 absolute right-5 bottom-4"
        >
          Siguiente
        </ThemedButton>
      )}

      {currentSlideIndex === items.length - 1 && (
        <ThemedButton
          onPress={() => router.dismiss()}
          className="w-40 absolute right-5 bottom-4"
        >
          Finalizar
        </ThemedButton>
      )}
    </ThemedView>
  );
};
export default SlidesScreen;

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: "Titulo 1",
    desc: "Ea et eu enim fugiat sunt reprehenderit sunt aute quis tempor ipsum cupidatat et.",
    img: require("../../assets/images/slides/slide-1.png"),
  },
  {
    title: "Titulo 2",
    desc: "Anim est quis elit proident magna quis cupidatat curlpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ",
    img: require("../../assets/images/slides/slide-2.png"),
  },
  {
    title: "Titulo 3",
    desc: "Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.",
    img: require("../../assets/images/slides/slide-3.png"),
  },
];

interface SlideitemProps {
  item: Slide;
}

const SlideItem = ({ item }: SlideitemProps) => {
  const { width, height } = useWindowDimensions();

  return (
    <ThemedView
      style={{
        width,
      }}
      className="flex-1 relative rounded p-10 justify-center bg-light-background dark:bg-dark-background"
    >
      <Image
        style={{
          width: width * 0.7,
          height: height * 0.4,
          resizeMode: "contain",
          alignItems: "center",
        }}
        source={item.img}
      />

      <View className="">
        <ThemedText
          type="h1"
          className=" 
        text-light-primary dark:text-dark-primary"
        >
          {item.title}
        </ThemedText>
        <ThemedText type="normal" className="">
          {item.desc}
        </ThemedText>
      </View>
    </ThemedView>
  );
};
