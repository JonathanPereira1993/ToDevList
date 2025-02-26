import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import MainLayout from "../components/Layout/MainLayout";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import TitleDisplay from "../components/UI/TitleDisplay";
import InfoShow from "../components/Layout/InfoShow";

const ProfileScreen = () => {
  const { logout, user } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <MainLayout>
      <TitleDisplay>Hello, {user.username}</TitleDisplay>
      <View style={styles.fullHeight}>
        <InfoShow label="Email:" data={user.email} />
      </View>
      <Button onPress={logoutHandler}>Logout</Button>
    </MainLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
});
