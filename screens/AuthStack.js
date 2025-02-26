import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import MainLayout from "../components/Layout/MainLayout";

import InputForm from "../components/Auth/InputForm";

import LoadingOverlay from "../components/UI/LoadingOverlay";

const AuthStack = () => {
  const { login, signUp, signInWithGoogle, loading } = useContext(AuthContext);

  const loginHandler = ({ email, password }) => {
    login(email, password);
  };

  const signUpHandler = ({ firstName, lastName, email, password }) => {
    signUp(`${firstName} ${lastName}`, email, password);
  };

  const signInWithGoogleHandler = () => {
    signInWithGoogle();
  };

  if (loading) return <LoadingOverlay message="Loading..." />;

  return (
    <MainLayout>
      <InputForm
        onLogin={loginHandler}
        onSignUp={signUpHandler}
        signInWithGoogle={signInWithGoogleHandler}
      />
    </MainLayout>
  );
};

export default AuthStack;
