import CastHorizonatalList from "@/components/CastHorizontalList";
import { formatter } from "@/helps/digitFormatted";
import {
  useCreditMoviesDetails,
  useMoviesDetails,
} from "@/hooks/useMovieDetails";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Pressable,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
const deviceHeight = Dimensions.get("window").height;
const MovieScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();

  if (!id || !+id) {
    return <Redirect href={"/"} />;
  }

  const { data, isLoading } = useMoviesDetails({
    id: +id,
    queryKey: ["movie", "details", String(id)],
  });

  const {
    data: creditData,
    isLoading: isCreditLoading,
    fetchNextPage,
  } = useCreditMoviesDetails({
    id: +id,
    queryKey: ["movie", "credits", String(id)],
  });

  if (isLoading || isCreditLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator
          size="large"
          color="purple"
          animating={true}
          hidesWhenStopped={true}
        />
      </View>
    );
  }

  return (
    <ScrollView className="bg-black">
      <View
        className="overflow-hidden relative rounded-b-3xl"
        style={{ height: deviceHeight * 0.65 }}
      >
        <ImageBackground
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: deviceHeight * 0.65,
          }}
          resizeMode="cover"
          source={{ uri: data?.poster }}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "transparent"]}
          start={[0, 0]}
          style={{
            height: deviceHeight * 0.65,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 10,
          }}
        />
        <Pressable
          className="z-20"
          onPress={() => {
            router.dismiss();
          }}
          style={{ marginTop: top, marginLeft: 10 }}
        >
          <Ionicons name="arrow-back-outline" size={40} color="#fff" />
        </Pressable>
      </View>
      <View className="text-white mt-8 mx-2">
        <Text className="text-white font-acme-regular">{data?.title}</Text>
        <Text className="text-white font-acme-regular font-bold text-2xl">
          {data?.originalTitle}
        </Text>
        <Text className="text-white" numberOfLines={1}>
          {data?.rating}⭐ - {data?.genres.join(" - ")}
        </Text>

        <Text className="text-white  font-acme-regular font-bold text-xl mt-4">
          Historia
        </Text>
        <Text className="text-white ">{data?.description}</Text>

        <Text className="text-white font-acme-regular font-bold text-xl mt-4">
          Presupuesto
        </Text>
        <Text className="text-white font-acme-regular">
          {formatter.format(data?.budget ?? 0)}
        </Text>
      </View>

      <CastHorizonatalList
        textColor="white"
        loadNextPage={fetchNextPage}
        actors={creditData?.pages.flat() ?? []}
        title="Cast"
        className="mb-10"
      />
    </ScrollView>
  );
};

export default MovieScreen;
