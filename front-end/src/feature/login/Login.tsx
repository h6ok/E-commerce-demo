import { useState } from "react";
import Input from "../../components/Input";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <div>Please input your id and password</div>
        <div className="flex flex-col">
          <Input
            className="py-4"
            type="text"
            value={id}
            placeholder="email"
            onChange={(e) => setId(e.target.value)}
          />
          <Input
            className="py-4"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
