import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const InfoShow = ({ label, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.data}>{data}</Text>
    </View>
  );
};

export default InfoShow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: GlobalStyles.spaces.base,
    paddingVertical: GlobalStyles.spaces.base,
    paddingHorizontal: GlobalStyles.spaces.s,
    borderRadius: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.lightGrey,
  },
  label: {
    fontSize: 24,
    fontWeight: "600",
  },
  data: {
    fontSize: 20,
  },
});
