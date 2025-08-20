import { useState } from "react";
import Input from "../../components/Input";
import { END_POINT } from "../../consts/Const";
import { Post } from "../../util/Http";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthenticated } = useAuth();
  const showToast = useToast();

  async function handleLogin() {
    try {
      const data = await Post(END_POINT.LOGIN, { id, password });
      if (data.status !== 200) {
        throw new Error("failed");
      }

      setAuthenticated(data != null);
      showToast("Success", "You are successfully authenticated", "success");
    } catch (_) {
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
              confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
