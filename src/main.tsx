import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./providers/CartProvider/CartProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CartProvider>
        <RouterProvider router={router} />
        {/* </SmoothScroll> */}
        <Toaster position="top-center" />
      </CartProvider>
    </PersistGate>
  </Provider>,
);
