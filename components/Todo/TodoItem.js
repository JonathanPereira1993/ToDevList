import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "../UI/CheckBox";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const TodoItem = ({ id, iconName, iconSize, iconColor, title, date }) => {
  const [ischecked, setIsChecked] = useState();
  const navigation = useNavigation();

  const onCheckHandler = () => {
    setIsChecked((prev) => !prev);
  };

  const todoPressHandler = () => {
    navigation.navigate("ManageTodo", {
      todoId: id,
    });
  };

  return (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </View>
      <Pressable style={styles.textContainer} onPress={todoPressHandler}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </Pressable>
      <View>
        <CheckBox onPress={onCheckHandler} isChecked={ischecked} />
      </View>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary,
    borderRadius: 16,
    padding: GlobalStyles.spaces.base,
    flexDirection: "row",
    alignItems: "center",
    gap: GlobalStyles.spaces.base,
    paddingRight: GlobalStyles.spaces.m,
    marginBottom: GlobalStyles.spaces.base,
  },
  iconContainer: {
    padding: GlobalStyles.spaces.base,
    backgroundColor: GlobalStyles.colors.lightBlue,
    borderRadius: "100%",
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
  },
  textContainer: {
    flexDirection: "column",
    gap: GlobalStyles.spaces.s,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  date: {
    color: GlobalStyles.colors.grey,
  },
});
