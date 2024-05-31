import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  Theme,
  DefaultTheme,
} from "@react-navigation/native";
import { MainNavigationType, NavigationType } from "./types";
import { PopulerMovieList } from "../screen/populerFilm";
import { PopularFilmDetail } from "../screen/filmDetail";
import { Image } from "react-native";

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0B0E1C",
    background: "#0B0E1C",
  },
};
const Stack = createNativeStackNavigator<MainNavigationType>();
function MainNavigation() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="PopulerMovieList">
        <Stack.Screen
          component={PopulerMovieList}
          name="PopulerMovieList"
          options={{
            title: "Vizyondaki Filmler",
            headerStyle: {
              backgroundColor: "#0B0E1C",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          component={PopularFilmDetail}
          name="PopularFilmDetail"
          options={{
            headerStyle: {
              backgroundColor: "red",
            },
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
