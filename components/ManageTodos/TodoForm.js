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
    notes: {
      value: defaultValues?.notes ? defaultValues.notes.toString() : "",
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
      notes: inputs.notes.value,
      createdAt: getFormattedDate(new Date()),
      checked: false,
    };

    const titleIsValid = todoData.title.trim().length > 0;

    if (!titleIsValid) {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          notes: { value: curInputs.notes.value, isValid: true },
        };
      });
      return;
    }

    onSubmit(todoData);
  };

  const formIsInvalid = !inputs.title.isValid;

  return (
    <View style={styles.form}>
      <View style={styles.fullHeight}>
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
            label="Notes"
            invalid={!inputs.title.isValid}
            textInputConfig={{
              multiline: true,
              onChangeText: inputChangeHandler.bind(this, "notes"),
              value: inputs.notes.value,
            }}
          />
        </View>
        {formIsInvalid && (
          <Text style={styles.errorText}>
            Invalid Input Values - Please check the input data!
          </Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
        <Button
          style={styles.button}
          buttonStyle={styles.cancelButton}
          textButtonStyle={styles.cancelButtonText}
          onPress={onCancel}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default TodoForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
    flex: 1,
    paddingBottom: GlobalStyles.spaces.l,
  },
  fullHeight: {
    flex: 1,
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
    flexDirection: "column",
    gap: 12,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: GlobalStyles.colors.grey,
  },
  cancelButtonText: {
    color: GlobalStyles.colors.grey,
  },
});
