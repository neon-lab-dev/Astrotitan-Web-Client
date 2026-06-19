import { useState } from "react";
import { IoMailOutline, IoCallOutline } from "react-icons/io5";
import { FaUserEdit, FaVenusMars, FaMapMarkerAlt } from "react-icons/fa";
import Container from "../../../../components/Reusable/Container/Container";
import Breadcrumb from "../../../../components/Reusable/Breadcrumb/Breadcrumb";
import ProfileTab from "../../../../components/MyProfilePage/ProfileTab/ProfileTab";
import { IMAGES } from "../../../../assets";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const user = {
    accountId: "ACC123456",
    profilePicture: IMAGES.rahul,
    firstName: "Rahul",
    lastName: "Sutradhar",
    fullName: "Rahul Sutradhar",
    gender: "male",
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
            <div className="bg-white rounded-4xl p-8 md:p-12 shadow-sm border border-slate-100">
              {/* Conditional Content based on activeTab */}
              {activeTab === "personal" && (
                <div className="animate-in fade-in duration-500">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Personal Details
                    </h3>
                    <button className="text-primary-5 font-bold text-sm hover:underline">
                      Edit All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    {/* Data Point */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Full Name
                      </p>
                      <div className="flex items-center gap-3 text-slate-700">
                        <FaUserEdit className="text-slate-300" />
                        <p className="font-semibold text-lg">{user.fullName}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Email Address
                      </p>
                      <div className="flex items-center gap-3 text-slate-700">
                        <IoMailOutline className="text-slate-300" />
                        <p className="font-semibold text-lg">{user.email}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Contact Number
                      </p>
                      <div className="flex items-center gap-3 text-slate-700">
                        <IoCallOutline className="text-slate-300" />
                        <p className="font-semibold text-lg">
                          {user.phoneNumber}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        Gender & Country
                      </p>
                      <div className="flex items-center gap-3 text-slate-700">
                        <FaVenusMars className="text-slate-300" />
                        <p className="font-semibold text-lg capitalize">
                          {user.gender} • {user.country}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Divider */}
                  <div className="my-12 h-px bg-linear-to-r from-transparent via-slate-100 to-transparent" />

                  <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      ✨
                    </span>
                    Astrological Data
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                        Birth Date
                      </p>
                      <p className="font-bold text-slate-800">
                        {user.dateOfBirth}
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                        Birth Time
                      </p>
                      <p className="font-bold text-slate-800">
                        {user.timeOfBirth}
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-50">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                        Birth Place
                      </p>
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <FaMapMarkerAlt className="text-red-400 size-3" />
                        {user.placeOfBirth}
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
                      Life Focus Areas
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {user.intents.map((intent, i) => (
                        <span
                          key={i}
                          className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 shadow-sm hover:border-primary-5 transition-colors cursor-default"
                        >
                          {intent}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MyProfile;
