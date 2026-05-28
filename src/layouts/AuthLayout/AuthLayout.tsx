import { Outlet } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Sidebar from "../../components/Sidebar/Sidebar";

const AuthLayout = () => {
  return (
    <div className="flex w-full h-screen bg-gradient-dashboard overflow-x-hidden">
      <Sidebar />

      <div className="flex flex-col w-full min-w-0">
        <AuthHeader />

        <div
          className={`flex-1 overflow-y-auto overflow-x-hidden px-3 lg:px-6 py-6`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
