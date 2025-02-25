import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import AuthStack from "./AuthStack";
import AuthenticatedStack from "./AuthenticatedStack";
import { StatusBar } from "expo-status-bar";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const Navigation = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingOverlay message="Loading..." />;
  }

  return (
    <>
      <StatusBar style={isAuthenticated ? "light" : "dark"} />
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </>
  );
};

export default Navigation;
