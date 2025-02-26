import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet } from "react-native";

import TodosContextProvider from "./store/todos-context";
import AuthContextProvider from "./store/auth-context";
import Navigation from "./screens/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <TodosContextProvider>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </TodosContextProvider>
        </AuthContextProvider>
      </GestureHandlerRootView>
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
