import axios from "axios";

export const movieApiBaseUrl = process.env.EXPO_PUBLIC_MOVIE_DB_URL;

export const movieApi = axios.create({
  baseURL: movieApiBaseUrl,
  params: {
    language: "es-MX",
    api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
  },
});
