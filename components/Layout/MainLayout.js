import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const MainLayout = ({ children, style }) => {
  return <View style={[styles.mainLayout, style]}>{children}</View>;
};

export default MainLayout;

const styles = StyleSheet.create({
  mainLayout: {
    flex: 1,
    paddingVertical: GlobalStyles.spaces.l,
    paddingHorizontal: GlobalStyles.spaces.m,
  },
});
