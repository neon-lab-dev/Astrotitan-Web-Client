import { Outlet } from "react-router-dom";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useEffect } from "react";
import { store } from "../../redux/store";

const MainLayout = () => {
  // Add this to your app to monitor token changes
useEffect(() => {
  const unsub = store.subscribe(() => {
    const state = store.getState();
    console.log("Store changed - auth:", state.auth);
  });
  
  return () => unsub();
}, []);
  return (
    <div className="bg-background-5">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;