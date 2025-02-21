import TodoList from "../components/Todo/TodoList";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

const AllTodos = () => {
  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
};

export default AllTodos;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GlobalStyles.spaces.m,
    paddingVertical: GlobalStyles.spaces.l,
  },
});
