import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import {persistStore }from "redux-persist"
import { PersistGate } from "redux-persist/integration/react";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>

      <Toaster />
    </Provider>
  </React.StrictMode>
);
