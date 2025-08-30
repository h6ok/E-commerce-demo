import useAuth from "../../hooks/useAuth";
import Tab from "../../components/Tab";
import Login from "../login/Login";
import SignUp from "../signUp/SignUp";

export default function User() {
  const { isAuthenticated, userId, userEmail } = useAuth();

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
            <div className="flex flex-col justify-center">
              <div className="flex pt-30">
                <div className="text-end w-1/2">Username</div>
                <div className="pl-10 justify-baseline w-1/2">{userId}</div>
              </div>
              <div className="flex pt-20">
                <div className="w-1/2 text-end">Email</div>
                <div className="w-1/2 pl-10 justify-baseline">{userEmail}</div>
              </div>
            </div>
            <div className="pt-20 text-lg flex justify-center">
              <button
                className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
                onClick={() => console.log("log out")}
              >
                Log Out
              </button>
            </div>
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
