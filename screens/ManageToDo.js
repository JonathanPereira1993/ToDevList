import { View, Text, StyleSheet } from "react-native";

import { useContext, useState, useEffect } from "react";
import { TodosContext } from "../store/todos-context";
import TodoForm from "../components/ManageTodos/TodoForm";
import { GlobalStyles } from "../constants/styles";
import { generateId } from "../utils/usefull";

const ManageToDo = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const todosCtx = useContext(TodosContext);

  const editedTodoId = route.params?.todoId;
  const isEditing = !!editedTodoId;

  const selectedTodo = todosCtx.todos.find((todo) => todo.id === editedTodoId);

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Todo" : "Add Todo",
    });
  }, [navigation, isEditing]);

  const deleteTodoHandler = async () => {
    setIsSubmitting(true);
    try {
      todosCtx.deleteTodo(editedTodoId);
    } catch (error) {
      setError("Could not delete todo - please try again later");
      setIsSubmitting(false);
    }
    navigation.goBack();
  };

  if (error && !isSubmitting) {
    return <Text>{error}</Text>;
  }

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (todoData) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        todosCtx.updateTodo(editedTodoId, todoData);
      } else {
        const id = generateId();
        todosCtx.addTodo({ ...todoData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      console.log(error);
    }
  };

  if (isSubmitting) {
    return <Text>Submitting...</Text>;
  }

  return (
    <View style={styles.container}>
      <TodoForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedTodo}
      />
    </View>
  );
};

export default ManageToDo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GlobalStyles.spaces.m,
  },
});
