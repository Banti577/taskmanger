'use client'
import { Provider } from "react-redux";
import { store } from "../lib/redux/store.ts";

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}