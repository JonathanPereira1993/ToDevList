import {
  Pressable,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import CheckBox from "../UI/CheckBox";
import { useState, useContext, useEffect, useRef } from "react";
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

const SWIPE_THRESHOLD = -50;

const TodoItem = ({
  id,
  iconName = "star",
  iconSize = 24,
  iconColor = GlobalStyles.colors.primary,
  title,
  date,
  checked,
  style,
  isFirstItem,
  isLastItem,
  isOnlyItem,
}) => {
  const { checkTodo, deleteTodo } = useContext(TodosContext);
  const [isChecked, setIsChecked] = useState(checked);
  const navigation = useNavigation();

  const textWidthRef = useRef({});

  const textLineWidth = useSharedValue(
    checked ? textWidthRef.current[id] || 0 : 0
  );

  useEffect(() => {
    setIsChecked(checked);
    textLineWidth.value = withTiming(
      checked ? textWidthRef.current[id] || 0 : 0,
      {
        duration: 300,
      }
    );
  }, [checked]);

  const onCheckHandler = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    textLineWidth.value = withTiming(
      newCheckedState ? textWidthRef.current[id] || 0 : 0,
      {
        duration: 300,
      }
    );

    checkTodo(id, newCheckedState);
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

  const textLineStyle = useAnimatedStyle(() => ({
    width: textLineWidth.value,
  }));

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-20, 20])
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
          style={[
            styles.deleteButton,
            isFirstItem ? styles.firstItem : isLastItem ? styles.lastItem : "",
            isOnlyItem && styles.onlyItem,
          ]}
          onPress={() => deleteTodo(id)}
        >
          <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>

        <GestureDetector
          gesture={swipeGesture}
          simultaneousHandlers={["scrollViewRef"]}
        >
          <Animated.View
            style={[
              styles.item,
              animatedStyle,
              style,
              isFirstItem && !isOnlyItem
                ? styles.firstItem
                : isLastItem && !isOnlyItem
                ? styles.lastItem
                : null,
              isOnlyItem && styles.onlyItem,
            ]}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={iconSize} color={iconColor} />
            </View>
            <Pressable style={styles.textContainer} onPress={todoPressHandler}>
              <View style={styles.relative}>
                <Text
                  onLayout={(event) => {
                    textWidthRef.current[id] = event.nativeEvent.layout.width;
                  }}
                  style={[styles.title, isChecked && styles.strikethrough]}
                >
                  {title}
                </Text>
                <Animated.View
                  style={[styles.checkedTextLine, textLineStyle]}
                />
              </View>
              <Text style={styles.date}>{date}</Text>
            </Pressable>
            <View>
              <CheckBox onPress={onCheckHandler} isChecked={isChecked} />
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
  },
  item: {
    flex: 1,
    paddingHorizontal: GlobalStyles.spaces.base,
    paddingVertical: GlobalStyles.spaces.m,
    flexDirection: "row",
    alignItems: "center",
    gap: GlobalStyles.spaces.base,
    paddingRight: GlobalStyles.spaces.m,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: GlobalStyles.colors.lightGrey,
  },
  firstItem: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  lastItem: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomWidth: 0,
  },
  onlyItem: {
    borderRadius: 16,
    borderBottomWidth: 0,
  },
  iconContainer: {
    padding: GlobalStyles.spaces.base,
    backgroundColor: GlobalStyles.colors.lightBlue,
    borderRadius: 50,
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
  strikethrough: {
    textDecorationLine: "line-through",
    color: GlobalStyles.colors.grey,
  },
  date: {
    color: GlobalStyles.colors.text,
    fontWeight: "500",
  },
  relative: {
    position: "relative",
  },
  checkedTextLine: {
    position: "absolute",
    top: "50%",
    height: 2,
    backgroundColor: GlobalStyles.colors.grey,
  },
});
