import useAuth from "../../hooks/useAuth";
import Tab from "../../components/Tab";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";

export default function User() {
  const { isAuthenticated } = useAuth();

  const TABS = [
    {
      id: "log-in",
      label: "Log In",
      component: <Login />,
    },
    {
      id: "sign-up",
      label: "Sign Up",
      component: <SignUp />,
    },
  ];

  return (
    <div className="size-full">
      {isAuthenticated && (
        <div className="h-170 w-full flex flex-col items-center">
          <div className="text-4xl flex flex-col items-center justify-center pt-30">
            <div>This is your user page</div>
            <div className="pt-30">Username</div>
            <div className="pt-10">Email</div>
          </div>
        </div>
      )}
      {!isAuthenticated && (
        <div className="pt-10">
          <Tab tabs={TABS} />
        </div>
      )}
    </div>
  );
}
