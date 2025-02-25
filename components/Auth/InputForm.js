import { useState } from "react";

import { Alert, StyleSheet, View, Text } from "react-native";
import Input from "../ManageTodos/Input";
import Button from "../UI/Button";
import TitleDisplay from "../UI/TitleDisplay";

const InputForm = ({ onLogin, onSignUp }) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmEmail: true,
    confirmPassword: true,
  });
  const [isLogin, setIsLogin] = useState(true);

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "firstName":
        setEnteredFirstName(enteredValue);
        break;
      case "lastName":
        setEnteredLastName(enteredValue);
        break;
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  const submitHandler = () => {
    const firstName = enteredFirstName?.trim();
    const lastName = enteredLastName?.trim();
    const email = enteredEmail?.trim();
    const password = enteredPassword?.trim();

    const firstNameValid = firstName.length > 1;
    const lastNameValid = lastName.length > 1;
    const userNameValid = firstNameValid && lastNameValid;
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = enteredEmail === enteredConfirmEmail;
    const passwordsAreEqual = enteredPassword === enteredConfirmPassword;

    setCredentialsInvalid({
      firstName: firstNameValid,
      lastName: lastNameValid,
      email: emailIsValid,
      confirmEmail: emailIsValid && emailsAreEqual,
      password: passwordIsValid && passwordsAreEqual,
      confirmPassword: passwordIsValid && passwordsAreEqual,
    });

    if (isLogin) {
      if (!emailIsValid || !passwordIsValid) {
        return;
      } else {
        onLogin({ email, password });
      }
    } else {
      if (
        !emailIsValid ||
        !emailsAreEqual ||
        !passwordsAreEqual ||
        !userNameValid
      ) {
        Alert.alert("Invalid input", "Please check your entered credentials.");
        return;
      } else {
        onSignUp({ firstName, lastName, email, password });
      }
    }
  };

  const formTypeHandler = () => {
    setIsLogin((prev) => !prev);
    setCredentialsInvalid({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmEmail: true,
      confirmPassword: true,
    });
    setEnteredConfirmEmail("");
    setEnteredPassword("");
    setEnteredConfirmPassword("");
    setEnteredEmail("");
    setEnteredFirstName("");
    setEnteredLastName("");
  };

  return (
    <View style={styles.fullHeight}>
      <View style={styles.inputArea}>
        {isLogin ? (
          <>
            <TitleDisplay center>So nice to see you again!!</TitleDisplay>
            <Input
              label="Email"
              textInputConfig={{
                placeholder: "Your email",
                value: enteredEmail,
                autoCapitalize: "none",
                autoComplete: false,
                keyboardType: "email-address",
                onChangeText: updateInputValueHandler.bind(this, "email"),
              }}
              invalid={!credentialsInvalid.email}
            />
            <Input
              label="Password"
              secure
              textInputConfig={{
                placeholder: "Your password",
                secureTextEntry: true,
                autoCapitalize: "none",
                autoComplete: false,
                onChangeText: updateInputValueHandler.bind(this, "password"),
              }}
              invalid={!credentialsInvalid.password}
            />
          </>
        ) : (
          <>
            <TitleDisplay center>Welcome!</TitleDisplay>
            <View style={styles.inputsRow}>
              <Input
                style={styles.maxWidth}
                label="First name"
                invalid={!credentialsInvalid.firstName}
                textInputConfig={{
                  placeholder: "Your first name",
                  autoCapitalize: "words",
                  autoComplete: false,
                  value: enteredFirstName,
                  onChangeText: updateInputValueHandler.bind(this, "firstName"),
                }}
              />
              <Input
                style={styles.maxWidth}
                label="Last name"
                invalid={!credentialsInvalid.lastName}
                textInputConfig={{
                  placeholder: "Your last name",
                  autoCapitalize: "words",
                  autoComplete: false,
                  value: enteredLastName,
                  onChangeText: updateInputValueHandler.bind(this, "lastName"),
                }}
              />
            </View>

            <Input
              label="Email"
              invalid={!credentialsInvalid.email}
              textInputConfig={{
                placeholder: "Your email",
                autoCapitalize: "none",
                autoComplete: false,
                keyboardType: "email-address",
                value: enteredEmail,
                onChangeText: updateInputValueHandler.bind(this, "email"),
              }}
            />
            <Input
              label="Confirm email"
              invalid={!credentialsInvalid.confirmEmail}
              textInputConfig={{
                placeholder: "Confirm your email",
                autoCapitalize: "none",
                autoComplete: false,
                keyboardType: "email-address",
                value: enteredConfirmEmail,
                onChangeText: updateInputValueHandler.bind(
                  this,
                  "confirmEmail"
                ),
              }}
            />
            <Input
              label="Password"
              invalid={!credentialsInvalid.password}
              secure
              textInputConfig={{
                placeholder: "Your password",
                secureTextEntry: true,
                autoCapitalize: "none",
                autoComplete: false,
                value: enteredPassword,
                onChangeText: updateInputValueHandler.bind(this, "password"),
              }}
            />
            <Input
              label="Confirm password"
              invalid={!credentialsInvalid.confirmPassword}
              secure
              textInputConfig={{
                placeholder: "Confirm your password",
                secureTextEntry: true,
                autoCapitalize: "none",
                autoComplete: false,
                value: enteredConfirmPassword,
                onChangeText: updateInputValueHandler.bind(
                  this,
                  "confirmPassword"
                ),
              }}
            />
          </>
        )}
      </View>
      <Button onPress={submitHandler}>{isLogin ? "Login" : "Sign up"}</Button>
      <Button isFlat onPress={formTypeHandler}>
        {isLogin ? "Create an account" : "I have an account"}
      </Button>
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  maxWidth: {
    flex: 1,
  },
  fullHeight: {
    flex: 1,
  },
  inputArea: {
    flex: 1,
    justifyContent: "center",
  },
  inputsRow: {
    flexDirection: "row",
  },
});
