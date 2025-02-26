import { createContext, useReducer, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const initialState = {
  token: "",
  isAuthenticated: false,
  user: null,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case "SIGNUP":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "LOADING":
      return { ...state, loading: true };
    case "AUTH_READY":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const AuthContext = createContext({
  user: "",
  isAuthenticated: false,
  loading: true,
  login: async (email, password) => {},
  signUp: async (username, email, password) => {},
  logout: async () => {},
  signInWithGoogle: async () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          dispatch({
            type: "LOGIN",
            payload: userSnap.data(),
          });
        } else {
          dispatch({
            type: "LOGIN",
            payload: { email: user.email, uid: user.uid },
          });
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
      dispatch({ type: "AUTH_READY" });
    });

    return () => unsubscribe();
  }, []);

  //   LOGIN Action
  const login = async (email, password) => {
    dispatch({ type: "LOADING" });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        dispatch({ type: "LOGIN", payload: userSnap.data() });
      }
    } catch (error) {
      console.error("Login failed: ", error.message);
    }
  };

  //   SIGNIN Action
  const signUp = async (username, email, password) => {
    dispatch({ type: "LOADING" });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userProfile = { uid: user.uid, email, username };
      await setDoc(doc(db, "users", user.uid), userProfile);

      dispatch({ type: "SIGNUP", payload: userProfile });
    } catch (error) {
      console.error("Failed to create new account: ", error.message);
    }
  };

  //   GOOGLE AUTHENTICATION
  const signInWithGoogle = async () => {
    dispatch({ type: "LOADING" });
    try {
      const firebaseUser = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        const userProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: firebaseUser.displayName,
        };
        await setDoc(userRef, userProfile);
        dispatch({ type: "LOGIN", payload: userProfile });
      } else {
        dispatch({ type: "LOGIN", payload: userSnap.data() });
      }
    } catch (error) {
      console.error("Failed to signIn with Google: ", error.message);
    }
  };

  //   LOGOUT Action
  const logout = async () => {
    dispatch({ type: "LOADING" });
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, signUp, logout, signInWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
