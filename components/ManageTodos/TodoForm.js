import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/usefull";
import Button from "../UI/Button";

const TodoForm = ({ submitButtonLabel, onCancel, onSubmit, defaultValues }) => {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues?.title ? defaultValues.title.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues?.date ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const todoData = {
      title: inputs.title.value,
      date: new Date(inputs.date.value),
    };

    const titleIsValid = todoData.title.trim().length > 0;
    const dateIsValid = !isNaN(todoData.date.getTime());

    if (!titleIsValid || !dateIsValid) {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
        };
      });
      return;
    }

    onSubmit(todoData);
  };

  const formIsInvalid = !inputs.title.isValid || !inputs.date.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Todo</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Title"
          invalid={!inputs.title.isValid}
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "title"),
            value: inputs.title.value,
          }}
        />
      </View>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input Values - Please check the input data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
