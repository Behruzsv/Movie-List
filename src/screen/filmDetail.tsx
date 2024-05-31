import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FilmResponse, IFilm, State } from "../types";
const PopularFilmDetail = ({ route }) => {
  const [state, setState] = useState<State>({
    pending: false,
    errorMsg: "",
    data: [],
  });
  useEffect(() => {
    getMovieDetail();
  }, []);

  const getMovieDetail = async () => {
    setState((prevState) => ({
      ...prevState,
      pending: false,
      errorMsg: "",
    }));

    const filmDetail = await fetch(
      `https://api.themoviedb.org/3/movie/${route.params.id}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjQ2MGZlN2NmNjliZWI4ODE2YzNlNmMwMTljYTY5MCIsInN1YiI6IjY2NGNmMTY1ZTliNDE3MmMzNDEzYmQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PhgG5O98VuccDMnS8hnYlOUOcvjP-xcnoMoJTcYxwZY",
        },
      }
    );
    const details = (await filmDetail.json()) as FilmResponse;
    if (details.results.length > 0) {
      setState({ pending: false, errorMsg: "", data: details.results });
    }
  };
  return (
    <FlatList
      data={state.data}
      renderItem={({ item }) => (
        <View>
          <Image
            source={{
              uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
            }}
          />
          <Text>{item.title}</Text>
          <Text>{item.vote_average}</Text>
          <Text>{item.overview}</Text>
        </View>
      )}
    />
  );
};

export { PopularFilmDetail };

const styles = StyleSheet.create({});
