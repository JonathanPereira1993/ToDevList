import { View, Text, StyleSheet } from "react-native";

import { useContext, useState, useEffect } from "react";
import { TodosContext } from "../store/todos-context";
import TodoForm from "../components/ManageTodos/TodoForm";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";

const ManageToDo = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const todosCtx = useContext(TodosContext);

  const editedTodoId = route.params?.todoId;
  const isEditing = !!editedTodoId;

  const selectedTodo = todosCtx.todos.find(
    (todo) => todo.docId === editedTodoId
  );

  const deleteTodoHandler = async () => {
    setIsSubmitting(true);
    todosCtx.deleteTodo(editedTodoId);

    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Todo" : "Add Todo",
      headerRight: isEditing
        ? () => (
            <IconButton
              iconName="trash"
              size={24}
              color={GlobalStyles.colors.error200}
              onPress={deleteTodoHandler}
            />
          )
        : null,
    });
  }, [navigation, isEditing]);

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
        todosCtx.addTodo({ ...todoData });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      console.error(error);
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
    flex: 1,
    paddingHorizontal: GlobalStyles.spaces.m,
  },
});
