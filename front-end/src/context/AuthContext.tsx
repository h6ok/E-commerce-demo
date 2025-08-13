import { createContext, useEffect, useState } from "react";

type AuthState = {
  userId: string;
  setUserId: (userid: string) => void;
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
};
const AuthContext = createContext<AuthState | null>(null);

function AuthProvider(props: { children: React.ReactNode }) {
  const [userId, setUserId] = useState("");
  const [isAuthenticated, setAuthenticated] = useState(false);

  const authContext: AuthState = {
    userId,
    setUserId,
    isAuthenticated,
    setAuthenticated,
  };

  useEffect(() => {
    try {
      setAuthenticated(false);
      setUserId("developer");
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

