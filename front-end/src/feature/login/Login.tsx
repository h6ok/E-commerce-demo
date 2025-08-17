import { useState } from "react";
import Input from "../../components/Input";
import { END_POINT } from "../../consts/Const";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthenticated } = useAuth();

  async function handleLogin() {
    const headers = {
      "Content-type": "application/json",
    };

    const body = JSON.stringify({
      id,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body,
    };

    try {
      const res = await fetch(END_POINT.LOGIN, requestOptions);
      const data = await res.json();
      setAuthenticated(data != null);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("end");
    }
  }

  return (
    <div className="w-full">
      <div className="h-100 flex justify-center items-start">
        <div className="flex flex-col">
          <Input
            label="email"
            className="pt-10 text-2xl"
            type="text"
            value={id}
            placeholder="email"
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            label="password"
            className="pt-5 text-2xl"
            type="password"
            value={password}
            placeholder="password"
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
