import { View, Text } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const headerIcon = () => {
  return (
    <View>
      <MaterialCommunityIcons name="monitor-share" size={24} color="black" />
    </View>
  );
};

export { headerIcon };
