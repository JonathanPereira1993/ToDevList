import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Button = ({ children, onPress, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 4,
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
  },
});
