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
        {todos.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.listLabel}>
              To do List - {uncheckedList.length}
            </Text>
            <FlatList
              style={styles.uncheckList}
              data={uncheckedList}
              keyExtractor={(item) => item.docId}
              extraData={uncheckedList}
              renderItem={({ item }) => (
                <TodoItem
                  id={item.docId}
                  title={item.title}
                  date={item.createdAt}
                  checked={item.checked}
                  isFirstItem={uncheckedList[0].docId === item.docId}
                  isLastItem={
                    uncheckedList[uncheckedList.length - 1].docId === item.docId
                  }
                  isOnlyItem={uncheckedList.length <= 1}
                />
              )}
              nestedScrollEnabled={true}
            />
          </View>
        )}
        {todos.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.listLabel}>
              Checked list - {checkedList.length}
            </Text>
            <FlatList
              style={styles.checkList}
              data={checkedList}
              keyExtractor={(item) => item.docId}
              extraData={checkedList}
              renderItem={({ item }) => (
                <TodoItem
                  id={item.docId}
                  title={item.title}
                  date={item.createdAt}
                  checked={item.checked}
                  isFirstItem={checkedList[0].docId === item.docId}
                  isLastItem={
                    checkedList[checkedList.length - 1].docId === item.docId
                  }
                  isOnlyItem={checkedList.length <= 1}
                />
              )}
              nestedScrollEnabled={true}
            />
          </View>
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
  },
  listContainer: {
    flex: 1,
    marginBottom: 20,
  },
  uncheckList: {
    flexGrow: 1,
  },
  checkList: {
    flexGrow: 1,
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
