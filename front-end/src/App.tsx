import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./feature/home/Home";
import Men from "./feature/men/Men";
import Women from "./feature/women/Women";
import Kids from "./feature/kids/Kids";
import Notifications from "./feature/notifications/Notifications";
import User from "./feature/user/User";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/user" element={<User />} />
            <Route path="/cart" element={<div>cart</div>} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
