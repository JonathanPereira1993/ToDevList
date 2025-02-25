import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Button = ({ children, isFlat, onPress, style }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[isFlat ? styles.flatButton : styles.button]}>
          <Text style={[isFlat ? styles.flatButtonText : styles.buttonText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 100,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: GlobalStyles.colors.white,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  flatButton: {
    backgroundColor: "transparent",
    paddingVertical: GlobalStyles.spaces.base,
  },
  flatButtonText: {
    color: GlobalStyles.colors.primary,
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
