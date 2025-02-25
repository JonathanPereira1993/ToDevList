import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const TitleDisplay = ({ children, center }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, center && styles.centerText]}>
        {children}
      </Text>
    </View>
  );
};

export default TitleDisplay;

const styles = StyleSheet.create({
  container: {
    paddingVertical: GlobalStyles.spaces.base,
    marginBottom: GlobalStyles.spaces.base,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: GlobalStyles.colors.primary,
  },
  centerText: {
    textAlign: "center",
  },
});
