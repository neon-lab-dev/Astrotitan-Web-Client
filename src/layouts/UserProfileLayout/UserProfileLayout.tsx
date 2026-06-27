import ProfileTab from "../../components/MyProfilePage/ProfileTab/ProfileTab";
import Container from "../../components/Reusable/Container/Container";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Navbar from "../../components/Shared/Navbar/Navbar";
import Footer from "../../components/Shared/Footer/Footer";

const UserProfileLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />

      <Container>
        <div className="py-6">
          <Breadcrumb
            items={[{ label: "My Account", path: "/profile", isActive: true }]}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 pb-20">
          {/* Left side */}
          <ProfileTab />

          {/* RIGHT CONTENT - The Detail View */}
          <div className="w-full lg:lg:w-2/3 border-t pt-5 border-slate-100">
            <div className="bg-none lg:bg-white rounded-4xl p-0 lg:p-8 shadow-none lg:shadow-sm border-none lg:border border-slate-100 min-h-150">
              <Outlet />
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default UserProfileLayout;
