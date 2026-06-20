import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import CompleteProfile from "../components/AuthComponents/CompleteProfile/CompleteProfile";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import RefundPolicy from "../pages/RefundPolicy/RefundPolicy";
import UserDashboardHome from "../pages/Dashboard/User/UserDashboardHome/UserDashboardHome";
import Astrologer from "../pages/Astrologer/Astrologer";
import AstrologerDetails from "../pages/AstrologerDetails/AstrologerDetails";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Puja from "../pages/Puja/Puja";
import PujaDetails from "../pages/PujaDetails/PujaDetails";
import UserProfileLayout from "../layouts/UserProfileLayout/UserProfileLayout";
import PersonalDetails from "../components/MyProfilePage/PersonalDetails/PersonalDetails";
import SessionHistory from "../components/MyProfilePage/SessionHistory/SessionHistory";
import Subscriptions from "../components/MyProfilePage/Subscriptions/Subscriptions";
import MyAddresses from "../components/MyProfilePage/MyAddresses/MyAddresses";
import MyOrders from "../components/MyProfilePage/MyOrders/MyOrders";
import PujaBookings from "../components/MyProfilePage/PujaBookings/PujaBookings";
import AccountSettings from "../components/MyProfilePage/AccountSettings/AccountSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/complete-profile",
        element: <CompleteProfile />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "/astrologer",
        element: <Astrologer />,
      },
      {
        path: "/astrologer/:id",
        element: <AstrologerDetails />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/puja",
        element: <Puja />,
      },
      {
        path: "/puja/:id",
        element: <PujaDetails />,
      },
    ],
  },
  {
    path: "dashboard/user",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <UserDashboardHome />,
      },
    ],
  },
  {
    path: "dashboard/user",
    element: <UserProfileLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "profile",
        element: <PersonalDetails />,
      },
      {
        path: "session-history",
        element: <SessionHistory />,
      },
      {
        path: "subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "addresses",
        element: <MyAddresses />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "puja-bookings",
        element: <PujaBookings />,
      },
      {
        path: "account-settings",
        element: <AccountSettings />,
      },
    ],
  },
]);
