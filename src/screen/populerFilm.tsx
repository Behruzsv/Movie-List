import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FilmResponse, IFilm, State } from "../types";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const PopulerMovieList = ({ navigation }) => {
  const [state, setState] = useState<State>({
    pending: false,
    errorMsg: "",
    data: [],
  });
  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    setState((prevState) => ({
      ...prevState,
      pending: false,
      errorMsg: "",
    }));
    try {
     
      const filmResults = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjQ2MGZlN2NmNjliZWI4ODE2YzNlNmMwMTljYTY5MCIsInN1YiI6IjY2NGNmMTY1ZTliNDE3MmMzNDEzYmQwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PhgG5O98VuccDMnS8hnYlOUOcvjP-xcnoMoJTcYxwZY",
          },
        }
        
      );
      const filmler = (await filmResults.json()) as FilmResponse;
      if (filmler.results.length > 0) {
        setState({ pending: false, errorMsg: "", data: filmler.results });
      }
      console.log('filmler', filmler)
    } catch (error) {
      console.log("error", error.response);
    }
  };
  const navigateToMovieDetail = (item) => {
    navigation.navigate("PopularFilmDetail", { id: item.id });
  };
  return (
    <FlatList
      data={state.data}
      style={styles.flatlist}
      renderItem={({ item }) => (
        <Pressable
          style={styles.filmContainer}
          onPress={() => navigateToMovieDetail(item.id)}
        >
          <View>
            <ImageBackground
              source={{
                uri: "https://image.tmdb.org/t/p/w500/" + item.poster_path,
              }}
              style={{
                flex: 2,
                height: 70,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
              }}
              resizeMode="contain"
            >
              <AntDesign name="playcircleo" size={24} color="white" />
            </ImageBackground>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.dateVote}>
              <Text style={styles.dateVoteText} numberOfLines={1}>
                {item.release_date.slice(0, 4)}
              </Text>
              <Text style={styles.dateVoteText} numberOfLines={1}>
                {item.vote_average}
              </Text>
            </View>
          </View>
          <View>
            <Entypo name="dots-three-vertical" size={20} color="white" />
          </View>
        </Pressable>
      )}
    />
  );
};

export { PopulerMovieList };
const styles = StyleSheet.create({
  flatlist: {
    flex: 1,
    backgroundColor: "#0B0E1C",
    padding: 10,
  },
  filmContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  textContainer: {
    flex: 4,
  },
  title: {
    color: "white",
  },
  dateVote: {
    flexDirection: "row",
  },
  dateVoteText: {
    paddingRight: 10,
    color: "#797979",
  },
});
