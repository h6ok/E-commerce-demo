import { createContext, useEffect, useState } from "react";
import type { Notification } from "../feature/notifications/Notifications";
import type { CartItemProps } from "../feature/cart/CartItem";
import type { ProductImgProps } from "../components/ProductImg";

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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [products, setProducts] = useState<ProductImgProps[]>([]);
  const [unread, setUnread] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        console.log(event);
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
