import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home : undefined;
  DogScreen: undefined;
  CatScreen: undefined;
  CatDetails: { catId: string , catImageId : string};
  DogDetails: { dogId: string , dogImageId : string };
};

export type StackScreenProps<T extends keyof RootStackParamList> = {
  route: RouteProp<RootStackParamList, T>;
  navigation: StackNavigationProp<RootStackParamList, T>;
};