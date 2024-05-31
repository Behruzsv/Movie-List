import { NavigationProp } from "@react-navigation/native";

type MainNavigationType = {
  LoginScreen: undefined;
  ProductDetailScreen: {
    productID: string;
  };
  Kategoriler: {
    kategoriAdi: string;
    name: string;
    poster_path: string;
  };
  LifeCycle: undefined;
  PopulerMovieList: undefined;
  PopularFilmDetail: {
    title: string;
  }
};

type NavigationType = NavigationProp<MainNavigationType>;
export { NavigationType, MainNavigationType };
