import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import MainLayout from "../components/Layout/MainLayout";

import InputForm from "../components/Auth/InputForm";

import LoadingOverlay from "../components/UI/LoadingOverlay";

const AuthStack = () => {
  const { login, signUp, loading } = useContext(AuthContext);

  const loginHandler = ({ email, password }) => {
    console.log("Logging in with:", email, password);
    login(email, password);
  };

  const signUpHandler = ({ firstName, lastName, email, password }) => {
    console.log("Signing up with:", firstName, lastName, email, password);
    signUp(`${firstName} ${lastName}`, email, password);
  };

  if (loading) return <LoadingOverlay message="Loading..." />;

  return (
    <MainLayout>
      <InputForm onLogin={loginHandler} onSignUp={signUpHandler} />
    </MainLayout>
  );
};

export default AuthStack;
