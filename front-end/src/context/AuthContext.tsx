import { createContext, useEffect, useState } from "react";
import { END_POINT } from "../consts/Const";
import { Post } from "../util/Http";
import useToast from "../hooks/useToast";

type UserPayload = {
  username: string;
  email: string;
  token: string;
};

type AuthState = {
  userId: string;
  setUserId: (userid: string) => void;
  userEmail: string;
  setUserEmail: (userEmail: string) => void;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
};
const AuthContext = createContext<AuthState | null>(null);

function AuthProvider(props: { children: React.ReactNode }) {
  const [viewed, setViewed] = useState(false);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  const showToast = useToast();

  const authContext: AuthState = {
    userId,
    setUserId,
    userEmail,
    setUserEmail,
    isAuthenticated,
    setAuthenticated,
  };

  const verifySession = async () => {
    try {
      const resp = await Post<UserPayload>(END_POINT.LOGIN, {
        id: "",
        password: "",
      });
      if (resp.status === 200) {
        setUserId(resp.data.username);
        setUserEmail(resp.data.email);
        setAuthenticated(true);
      }
    } catch (_) {
      showToast("Error", "Unknown error has occurred", "error");
    }
  };

  useEffect(() => {
    if (!viewed) {
      verifySession();
    }
    setViewed(true);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

