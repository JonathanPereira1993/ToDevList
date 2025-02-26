import TodoItem from "./TodoItem";
import { StyleSheet, Text, FlatList } from "react-native";
import { View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const TodoList = ({ todos = [], fallbackText }) => {
  let content = <Text style={styles.fallbackText}>{fallbackText}</Text>;

  const uncheckedList = todos.filter((todo) => !todo.checked);
  const checkedList = todos.filter((todo) => todo.checked);

  if (todos.length > 0) {
    return (
      <View style={styles.mainContent}>
        {uncheckedList.length > 0 && (
          <>
            <Text style={styles.listLabel}>To do List</Text>
            <FlatList
              style={styles.list}
              data={uncheckedList}
              keyExtractor={(item) => item.docId}
              extraData={uncheckedList}
              renderItem={({ item }) => (
                <TodoItem
                  id={item.docId}
                  title={item.title}
                  date={item.createdAt}
                  checked={item.checked}
                />
              )}
            />
          </>
        )}
        {checkedList.length > 0 && (
          <>
            <Text style={styles.listLabel}>Checked list</Text>
            <FlatList
              style={styles.list}
              data={checkedList}
              keyExtractor={(item) => item.docId}
              extraData={checkedList}
              renderItem={({ item }) => (
                <TodoItem
                  id={item.docId}
                  title={item.title}
                  date={item.createdAt}
                  checked={item.checked}
                />
              )}
            />
          </>
        )}
      </View>
    );
  }

  return <View style={styles.mainContent}>{content}</View>;
};

export default TodoList;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  list: {
    height: "50%",
  },
  fallbackText: {
    textAlign: "center",
    fontSize: 24,
  },
  listLabel: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: GlobalStyles.spaces.s,
  },
});
