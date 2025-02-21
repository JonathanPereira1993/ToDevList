import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllTodos from "./screens/AllTodos";
import { GlobalStyles } from "./constants/styles";
import ManageToDo from "./screens/ManageToDo";

import TodosContextProvider from "./store/todos-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <TodosContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary,
              },
              headerTintColor: GlobalStyles.colors.white,
            }}
          >
            <Stack.Screen
              name="AllTodos"
              component={AllTodos}
              options={{
                title: "All Todo's",
              }}
            />
            <Stack.Screen
              name="ManageTodo"
              component={ManageToDo}
              options={{ title: "Manage Todo" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TodosContextProvider>
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
