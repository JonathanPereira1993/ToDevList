import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GlobalStyles } from "../constants/styles";

import AllTodos from "./AllTodos";
import ManageToDo from "./ManageToDo";

const AuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();

  return (
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
  );
};

export default AuthenticatedStack;
