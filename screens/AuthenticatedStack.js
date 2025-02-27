import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { GlobalStyles } from "../constants/styles";

import IconButton from "../components/UI/IconButton";

import AllTodos from "./AllTodos";
import ManageToDo from "./ManageToDo";
import ProfileScreen from "./ProfileScreen";
import { getFormattedDate } from "../utils/usefull";

const AuthenticatedStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        title: getFormattedDate(new Date()),
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },
        headerTintColor: GlobalStyles.colors.white,

        contentStyle: { backgroundColor: GlobalStyles.colors.lightBlue },
      }}
    >
      <Stack.Screen
        name="AllTodos"
        component={AllTodos}
        options={({ navigation }) => ({
          title: "All Todo's",
          headerRight: ({ tintColor }) => (
            <IconButton
              iconName="person"
              color={tintColor}
              size={24}
              onPress={() => navigation.navigate("Profile")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ManageTodo"
        component={ManageToDo}
        options={{ title: "Manage Todo" }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStack;
