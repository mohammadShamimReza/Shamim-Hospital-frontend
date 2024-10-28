"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // <UserProvider>
    <Provider store={store}>{children}</Provider>
    // </UserProvider>
  );
};

export default Providers;
