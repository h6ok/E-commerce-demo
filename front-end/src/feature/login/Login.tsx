import { useState } from "react";
import Input from "../../components/Input";
import { END_POINT } from "../../consts/Const";
import { Post } from "../../util/Http";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";

type UserPayload = {
  username: string;
  email: string;
  token: string;
};
export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthenticated, setUserId, setUserEmail } = useAuth();
  const showToast = useToast();

  async function handleLogin() {
    try {
      const resp = await Post<UserPayload>(END_POINT.LOGIN, { id, password });
      if (resp.status !== 200) {
        showToast("Error", resp.error.message, "error");
      }

      setAuthenticated(resp.data != null);
      setUserId(resp.data.username);
      setUserEmail(resp.data.email);
      showToast("Success", "You are successfully authenticated", "success");
    } catch (err) {
      console.log(err);
      showToast("Error", "Wrong email or password", "error");
    }
  }

  return (
    <div className="w-full">
      <div className="h-100 flex justify-center items-start">
        <div className="flex flex-col">
          <Input
            name="email"
            label="email"
            className="pt-10 text-2xl"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            name="password"
            label="password"
            className="pt-5 text-2xl"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-10 flex justify-center">
            <button
              className="text-lg bg-blue-500 transition delay-150 duration-500 ease-in-out hover:bg-indigo-500 text-white"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
