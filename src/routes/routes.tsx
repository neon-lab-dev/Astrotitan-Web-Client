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
]);
