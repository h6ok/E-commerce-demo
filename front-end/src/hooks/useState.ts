import { useContext } from "react";
import { StateContext } from "../context/StateContext";

export default function useRootState() {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("context must not be null");
  }

  return context;
}
