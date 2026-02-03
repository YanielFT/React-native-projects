import { MovieSearched } from "@/interfaces/movie.interface";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SearchedItem from "./SearchedItem";

interface Props {
  movies: MovieSearched[];
}

const MovieVerticalList = ({ movies }: Props) => {
  return (
    <View className="w-full px-4 flex-1">
      <FlatList
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <SearchedItem
            id={item.id}
            title={item.title}
            image={item.image}
            release_date={item.releaseDate}
          />
        )}
      />
    </View>
  );
};

export default MovieVerticalList;
