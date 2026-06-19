import { useState } from "react";
import Container from "../../../../components/Reusable/Container/Container";
import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import ProfileTab from "../../../../components/MyProfilePage/ProfileTab/ProfileTab";
import { IMAGES } from "../../../../assets";
import PersonalDetails from "../../../../components/MyProfilePage/PersonalDetails/PersonalDetails";
import SessionHistory from "../../../../components/MyProfilePage/SessionHistory/SessionHistory";
import Subscriptions from "../../../../components/MyProfilePage/Subscriptions/Subscriptions";
import MyAddresses from "../../../../components/MyProfilePage/MyAddresses/MyAddresses";
import Settings from "../../../../components/MyProfilePage/MyOrders/MyOrders";
import MyOrders from "../../../../components/MyProfilePage/MyOrders/MyOrders";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const user = {
    accountId: "ACC123456",
    profilePicture: IMAGES.rahul,
    firstName: "Rahul",
    lastName: "Sutradhar",
    fullName: "Rahul Sutradhar",
    gender: "Male",
    dateOfBirth: "May 15, 1995",
    timeOfBirth: "08:30 AM",
    placeOfBirth: "Kolkata, West Bengal",
    intents: ["Career", "Education", "Health", "Relationships"],
    zodiacSign: "Pisces",
    country: "India",
    email: "rahul.sutradhar@example.com",
    phoneNumber: "+91 98765 43210",
  };

  return (
    <div>
      <Container>
        <div className="py-6">
          <Breadcrumb
            items={[{ label: "My Account", path: "/profile", isActive: true }]}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 pb-20">
          {/* Left side */}
          <ProfileTab
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* RIGHT CONTENT - The Detail View */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
              {/* Conditional Content based on activeTab */}
              {activeTab === "personal" && <PersonalDetails user={user} />}
              {activeTab === "sessionHistory" && <SessionHistory />}
              {activeTab === "subscription" && <Subscriptions />}
              {activeTab === "myAddresses" && <MyAddresses />}
              {activeTab === "myOrders" && <MyOrders />}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;
