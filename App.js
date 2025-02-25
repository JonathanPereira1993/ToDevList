import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet } from "react-native";

import TodosContextProvider from "./store/todos-context";
import AuthContextProvider from "./store/auth-context";
import Navigation from "./screens/Navigation";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <TodosContextProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </TodosContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 36,
    color: "grey",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
});
