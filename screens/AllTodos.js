import TodoList from "../components/Todo/TodoList";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { TodosContext } from "../store/todos-context";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";

const AllTodos = () => {
  const navigation = useNavigation();

  const todosCtx = useContext(TodosContext);

  const addTodoHandle = () => {
    navigation.navigate("ManageTodo");
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButton}>
        <Button onPress={addTodoHandle}>Add todo</Button>
      </View>
      <TodoList todos={todosCtx.todos} fallbackText="No todo added yet" />
    </View>
  );
};

export default AllTodos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: GlobalStyles.spaces.m,
    paddingVertical: GlobalStyles.spaces.l,
  },
  addButton: {
    marginBottom: 24,
  },
});
