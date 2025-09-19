import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./feature/home/Home";
import Men from "./feature/men/Men";
import Women from "./feature/women/Women";
import Kids from "./feature/kids/Kids";
import { Notifications } from "./feature/notifications/Notifications";
import User from "./feature/user/User";
import Cart from "./feature/cart/Cart";
import { ToastProvider } from "./context/ToastContext";
import { StateProvider } from "./context/StateContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StateProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/user" element={<User />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/kids" element={<Kids />} />
              </Route>
            </Routes>
          </ToastProvider>
        </StateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
