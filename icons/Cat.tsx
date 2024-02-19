import { Path, Svg } from "react-native-svg";

export const CatIcon = ({ color }: { color?: string }) => {
  if (!color) color = "#2c3e50";
  return (
    <Svg width="38" height="38" viewBox="0 0 24 24" stroke-width="1.5" stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round">
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M5 12l-2 0l9 -9l9 9l-2 0" />
      <Path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
      <Path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
    </Svg>
  );
};