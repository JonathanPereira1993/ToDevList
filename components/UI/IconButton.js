import { Pressable, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

const IconButton = ({
  onPress,
  iconName = "bookmark",
  size,
  color,
  isFilled = false,
}) => {
  const name = iconName + (isFilled ? "" : "-outline");

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
