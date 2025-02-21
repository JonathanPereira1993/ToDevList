import { View, Text } from "react-native";

const ManageToDo = ({ route, navigation }) => {
  const editedExpenseId = route.params?.todoId;
  const isEditing = !!editedExpenseId;

  return (
    <View>
      <Text>{editedExpenseId}</Text>
    </View>
  );
};

export default ManageToDo;
