import { View, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { AntDesign } from "@expo/vector-icons";

const CheckBox = ({ isChecked, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.checkboxContainer,
        isChecked && styles.checkboxContainerChecked,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View>
        <AntDesign
          style={[isChecked ? styles.iconCheck : styles.opacityNone]}
          name="check"
          size={24}
          color={GlobalStyles.colors.white}
        />
      </View>
    </Pressable>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkboxContainer: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.grey,
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  checkboxContainerChecked: {
    borderColor: GlobalStyles.colors.primary,
    backgroundColor: GlobalStyles.colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
  opacityNone: {
    opacity: 0,
  },
});
