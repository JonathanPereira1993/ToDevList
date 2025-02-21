import { GlobalStyles } from "../../constants/styles";
import TodoItem from "./TodoItem";
import { ToDos } from "../../constants/DemoTodos";
import { FlatList, StyleSheet } from "react-native";

const TodoList = () => {
  const renderTodoItem = (itemData) => {
    return (
      <TodoItem
        id={itemData.item.id}
        title={itemData.item.title}
        date={itemData.item.date}
        iconName="car"
        iconColor={GlobalStyles.colors.primary}
        iconSize={24}
        onOpen={openEditModeHandler}
      />
    );
  };

  const openEditModeHandler = () => {
    console.log("Opened");
  };

  return (
    <FlatList
      style={styles.itemList}
      data={ToDos}
      renderItem={renderTodoItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TodoList;

const styles = StyleSheet.create({
  itemList: {
    flexDirection: "column",
  },
});
