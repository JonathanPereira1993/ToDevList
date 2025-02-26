import {
  Pressable,
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "../UI/CheckBox";
import { useState, useContext, useEffect } from "react";
import { TodosContext } from "../../store/todos-context";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const SWIPE_THRESHOLD = -50; // Amount to swipe before showing delete button

const TodoItem = ({
  id,
  iconName = "star",
  iconSize = 24,
  iconColor = GlobalStyles.colors.primary,
  title,
  date,
  checked,
}) => {
  const { checkTodo, deleteTodo } = useContext(TodosContext);
  const [ischecked, setIsChecked] = useState(checked);
  const navigation = useNavigation();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const onCheckHandler = () => {
    setIsChecked((prev) => {
      const newCheckedState = !prev;
      checkTodo(id, newCheckedState);
      return newCheckedState;
    });
  };

  const todoPressHandler = () => {
    navigation.navigate("ManageTodo", {
      todoId: id,
    });
  };

  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-50, { duration: 300 });
      } else {
        translateX.value = withTiming(0, { duration: 300 });
      }
    });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTodo(id)}
        >
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>

        <GestureDetector gesture={swipeGesture}>
          <Animated.View style={[styles.item, animatedStyle]}>
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
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: GlobalStyles.spaces.base,
  },
  deleteButton: {
    width: "80%",
    height: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    paddingRight: 16,
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
    borderRadius: 16,
  },
  item: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: GlobalStyles.spaces.base,
    paddingVertical: GlobalStyles.spaces.m,
    flexDirection: "row",
    alignItems: "center",
    gap: GlobalStyles.spaces.base,
    paddingRight: GlobalStyles.spaces.m,
    backgroundColor: "white",
  },
  iconContainer: {
    padding: GlobalStyles.spaces.base,
    backgroundColor: GlobalStyles.colors.lightBlue,
    borderRadius: "100%",
  },
  textContainer: {
    flexDirection: "column",
    gap: GlobalStyles.spaces.s,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary,
  },
  date: {
    color: GlobalStyles.colors.text,
    fontWeight: "500",
  },
});
