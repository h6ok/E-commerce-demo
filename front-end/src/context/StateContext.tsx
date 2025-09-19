import { createContext, useEffect, useState } from "react";
import type { Notification } from "../feature/notifications/Notifications";
import type { CartItemProps } from "../feature/cart/CartItem";
import type { ProductImgProps } from "../components/ProductImg";
import useAuth from "../hooks/useAuth";

const TEMP_NOTIFICATION = {
  date: "2025/12/31",
  subject: "New Order Complete",
  category: "purchase",
} as Notification;

type RootState = {
  notifications: Notification[];
  setNotifications: (notification: Notification[]) => void;
  unread: number;
  setUnread: (unread: number) => void;
  cartItems: CartItemProps[];
  setCartItems: (cartItems: CartItemProps[]) => void;
  socket: WebSocket | null;
  setSocket: (socket: WebSocket | null) => void;
  products: ProductImgProps[];
  setProducts: (products: ProductImgProps[]) => void;
};

const StateContext = createContext<RootState | null>(null);

function StateProvider(props: { children: React.ReactNode }) {
  console.log("init state");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [products, setProducts] = useState<ProductImgProps[]>([]);
  const [unread, setUnread] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const { userId } = useAuth();

  useEffect(() => {
    if (socket) {
      console.log("socket connected");
      socket.onopen = (event) => {
        console.log(event);
        console.log("socket open");
        const message = {
          userId,
        };

        socket.send(JSON.stringify(message));
      };

      socket.onmessage = (event) => {
        console.log("you get push message from server");
        console.log(event);
        const data = JSON.parse(event.data);
        if (data.status === "success") {
          console.log("purchase success");
          setNotifications((prev) => [TEMP_NOTIFICATION, ...prev]);
        }
      };
    }
  }, [socket]);

  const stateContext: RootState = {
    notifications,
    setNotifications,
    unread,
    setUnread,
    cartItems,
    setCartItems,
    socket,
    setSocket,
    products,
    setProducts,
  };

  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
