import TodoList from "../components/Todo/TodoList";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useContext, useEffect } from "react";
import { TodosContext } from "../store/todos-context";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { getFormattedDate } from "../utils/usefull";

const AllTodos = () => {
  const navigation = useNavigation();

  const todosCtx = useContext(TodosContext);

  const addTodoHandle = () => {
    navigation.navigate("ManageTodo");
  };

  useEffect(() => {
    navigation.setOptions({
      title: getFormattedDate(new Date()),
    });
  }, []);

  return (
    <View style={styles.container}>
      <TodoList todos={todosCtx.todos || []} fallbackText="No todo added yet" />
      <View style={styles.addButton}>
        <Button onPress={addTodoHandle}>Add todo</Button>
      </View>
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
