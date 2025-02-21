import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, style, textInputConfig, invalid }) => {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.text,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.lightBlue,
    color: GlobalStyles.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.error500,
  },
});
