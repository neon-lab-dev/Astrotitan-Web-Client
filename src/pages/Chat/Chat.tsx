import { useState } from "react";
import {
  IoSend,
  IoShieldCheckmarkOutline,
  IoCloseCircleOutline,
  IoAttachOutline,
  IoHappyOutline,
} from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";
import Container from "../../components/Reusable/Container/Container";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import { IMAGES } from "../../assets";

const Chat = () => {
  const [message, setMessage] = useState("");

  const astrologer = {
    name: "Pandit Rahul Sir",
    profilePicture: IMAGES.rahul,
    phone: "+91 98765 43210",
    specialty: "Vedic Astrology, Career & Marriage",
    description:
      "Highly experienced astrologer with over 8 years of practice. Specialized in providing deep insights into your birth chart and suggesting effective remedies for life's challenges.",
    isVerified: true,
  };

  const mockMessages = [
    {
      id: 1,
      text: "Namaste! How can I help you today?",
      sender: "astrologer",
      time: "10:30 AM",
    },
    {
      id: 2,
      text: "I wanted to ask about my career growth in the coming months.",
      sender: "user",
      time: "10:31 AM",
    },
    {
      id: 3,
      text: "Sure, let me analyze your 10th house and Saturn's current position.",
      sender: "astrologer",
      time: "10:32 AM",
    },
  ];

  return (
    <div className="font-GeneralSans min-h-screen">
      <Container>
        <div className="py-6">
          <Breadcrumb
            items={[
              { label: "Dashboard", path: "/dashboard/user" },
              { label: "Live Chat", path: "/chat", isActive: true },
            ]}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 pb-20">
          {/* LEFT SIDE: CHAT INTERFACE */}
          <div className="lg:w-2/3 flex flex-col bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-187">
            {/* Chat Header */}
            <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={astrologer.profilePicture}
                    className="size-12 rounded-2xl object-cover"
                    alt=""
                  />
                  <div className="absolute -bottom-1 -right-1 size-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-5/90">
                    {astrologer.name}
                  </h4>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="font-normal">Online</span>
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all group">
                <IoCloseCircleOutline
                  size={18}
                  className="group-hover:rotate-90 transition-transform"
                />
                End Session
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-neutral-20/10">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] space-y-1 ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`px-5 py-3 rounded-2xl text-sm font-medium font-Satoshi shadow-sm ${
                        msg.sender === "user"
                          ? "bg-primary-5 text-white rounded-tr-none"
                          : "bg-white text-neutral-5 rounded-tl-none border border-slate-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className="text-[10px] text-neutral-10 font-bold px-1">
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <span className="bg-white/50 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold text-neutral-10 border border-slate-100">
                  Today, Oct 24
                </span>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white border-t border-slate-50">
              <div className="flex items-center gap-3 p-2 rounded-2xl border border-primary-5/30 focus-within:border-primary-5 bg-white transition-all shadow-inner">
                <button className="p-2 text-neutral-10 hover:text-primary-5 transition-colors">
                  <IoAttachOutline size={22} />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-1 bg-transparent outline-none text-sm font-medium font-Satoshi text-neutral-5 placeholder:text-neutral-10/70"
                />
                <button className="p-2 text-neutral-10 hover:text-primary-5 transition-colors">
                  <IoHappyOutline size={22} />
                </button>
                <button className="bg-primary-5 text-white p-3 rounded-xl shadow-lg shadow-primary-5/20 hover:bg-primary-10 active:scale-95 transition-all">
                  <IoSend size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ASTROLOGER DETAILS */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="relative group">
                <img
                  src={astrologer.profilePicture}
                  className="size-32 rounded-3xl object-cover ring-4 ring-primary-5/10"
                  alt=""
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm flex items-center gap-1">
                  <HiOutlineSparkles className="text-primary-5" size={14} />
                  <span className="text-[10px] font-bold text-neutral-5">
                    Expert
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-neutral-5">
                  {astrologer.name}
                </h3>
                <p className="text-xs text-primary-5 tracking-widest mt-1">
                  {astrologer.specialty}
                </p>
              </div>

              <div className="mt-8 text-left">
                <p className="text-sm text-neutral-10 text-center leading-relaxed italic">
                  {astrologer.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 w-full flex items-center justify-center gap-2 text-green-600 font-bold text-xs uppercase tracking-tighter">
                <IoShieldCheckmarkOutline size={18} />
                Secure & Private Consultation
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Chat;
