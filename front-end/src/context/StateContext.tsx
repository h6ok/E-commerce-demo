import { createContext, useState } from "react";
import type { Notification } from "../feature/notifications/Notifications";
import type { CartItemProps } from "../feature/cart/CartItem";

type RootState = {
  notifications: Notification[];
  setNotifications: (notification: Notification[]) => void;
  unread: number;
  setUnread: (unread: number) => void;
  cartItems: CartItemProps[];
  setCartItems: (cartItems: CartItemProps[]) => void;
};

const StateContext = createContext<RootState | null>(null);

function StateProvider(props: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [unread, setUnread] = useState(0);

  const stateContext: RootState = {
    notifications,
    setNotifications,
    unread,
    setUnread,
    cartItems,
    setCartItems,
  };

  return (
    <StateContext.Provider value={stateContext}>
      {props.children}
    </StateContext.Provider>
  );
}

export { StateContext, StateProvider };
