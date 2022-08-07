import React from "react";
import { Image } from "react-native";
import { useTailwind } from "tailwind-rn";

export function MyLogo() {
  const tailwind = useTailwind();
  return (
    <Image
      source={require("../assets/Instagram_logo.svg.png")}
      style={tailwind("w-1/2 resize-contain")}
    />
  );
}
