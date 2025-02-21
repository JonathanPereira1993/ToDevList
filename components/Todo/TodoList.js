import { GlobalStyles } from "../../constants/styles";
import TodoItem from "./TodoItem";
import { ToDos } from "../../constants/DemoTodos";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";

const TodoList = ({ todos = [], fallbackText }) => {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;

  const openEditModeHandler = () => {
    console.log("Opened");
  };

  if (todos.length > 0) {
    content = todos?.map((todo) => (
      <TodoItem
        id={todo.id}
        title={todo.title}
        date={todo.date.toString()}
        iconName="car"
        iconColor={GlobalStyles.colors.primary}
        iconSize={24}
        onOpen={openEditModeHandler}
      />
    ));
  }

  return <View style={styles.mainContent}>{content}</View>;
};

export default TodoList;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: "center",
  },
  fallbackText: {
    textAlign: "center",
    fontSize: 24,
  },
});
