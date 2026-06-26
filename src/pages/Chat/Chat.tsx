/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  IoSend,
  IoShieldCheckmarkOutline,
  IoCloseCircleOutline,
  IoArrowBack,
} from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi";
import Container from "../../components/Reusable/Container/Container";
import Breadcrumb from "../../components/Reusable/Breadcrumb/Breadcrumb";
import {
  addConsultationMessage,
  clearSelectedConsultation,
  selectSelectedConsultationMessages,
  selectSelectedParticipant,
  setSelectedConsultationMessages,
  updateConsultationMessageId,
} from "../../redux/Features/Consultation/consultationChatSlice";
import {
  useGetConsultationMessagesQuery,
  useMarkConsultationMessagesReadMutation,
} from "../../redux/Features/Consultation/consultationChatApi";
import { IMAGES } from "../../assets";
import toast from "react-hot-toast";
import { useConsultationSocket } from "../../useConsultationSocket";
import {
  useEndConsultationSessionMutation,
  useGetSingleConsultationBookingQuery,
} from "../../redux/Features/Consultation/consultationApi";

const Chat = () => {
  const { id: consultationId } = useParams();
  const { data: consultation } = useGetSingleConsultationBookingQuery(consultationId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitializedRef = useRef(false);
  const hasMarkedReadRef = useRef(false);

  // Redux selectors
  const participant = useSelector(selectSelectedParticipant);
  const messages = useSelector(selectSelectedConsultationMessages);

  // Socket hook
  const {
    sendConsultationMessage,
    markConsultationMessagesRead,
    isConnected,
    socket,
  } = useConsultationSocket();

  const [endConsultationSession] = useEndConsultationSessionMutation();

  // Current user
  const currentUser = useSelector((state: any) => state.auth.user);

  // API hooks
  const { data } = useGetConsultationMessagesQuery(consultationId, {
    skip: !consultationId,
  });

  const [markMessagesAsRead] = useMarkConsultationMessagesReadMutation();

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  // Set messages when fetched (ONLY ONCE)
  useEffect(() => {
    if (data?.data && consultationId && !hasInitializedRef.current) {
      dispatch(setSelectedConsultationMessages(data.data));
      hasInitializedRef.current = true;
    }
  }, [data, consultationId, dispatch]);

  // Reset initialization when consultation changes
  useEffect(() => {
    hasInitializedRef.current = false;
    hasMarkedReadRef.current = false;
  }, [consultationId]);

  // Mark messages as read when chat opens (ONLY ONCE)
  useEffect(() => {
    if (consultationId && isConnected && !hasMarkedReadRef.current) {
      hasMarkedReadRef.current = true;
      markConsultationMessagesRead(consultationId);
      markMessagesAsRead(consultationId).catch(console.error);
    }
  }, [
    consultationId,
    isConnected,
    markConsultationMessagesRead,
    markMessagesAsRead,
  ]);

  // Listen for incoming socket messages - ONLY ONCE, not dependent on messages
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (incomingMsg: any) => {
      // console.log("📩 Received message via socket:", incomingMsg);

      // Check if message belongs to current consultation
      if (incomingMsg.consultationId === consultationId) {
        // JUST dispatch. Redux will handle the "exists" check internally.
        // This solves the stale closure problem.
        dispatch(addConsultationMessage(incomingMsg));
      }
    };

    const handleMessageSent = (confirmation: any) => {
      if (
        confirmation.consultationId === consultationId &&
        confirmation.tempId
      ) {
        dispatch(
          updateConsultationMessageId({
            tempId: confirmation.tempId,
            realId: confirmation._id,
            createdAt: confirmation.createdAt,
          }),
        );
      }
    };

    socket.on("receiveConsultationMessage", handleReceiveMessage);
    socket.on("consultationMessageSent", handleMessageSent);

    return () => {
      socket.off("receiveConsultationMessage", handleReceiveMessage);
      socket.off("consultationMessageSent", handleMessageSent);
    };
  }, [socket, consultationId, dispatch]);

  // Handle send message
  const handleSendMessage = () => {
    console.log("🟢 Send button clicked");
    console.log("Message:", message);
    console.log("ConsultationId:", consultationId);
    console.log("Participant:", participant);
    console.log("Current User:", currentUser);
    console.log("Socket connected:", isConnected);

    if (!message.trim()) {
      console.warn("⚠️ Message is empty");
      toast.error("Please type a message");
      return;
    }

    if (!consultationId) {
      console.warn("⚠️ No consultation ID");
      toast.error("No consultation selected");
      return;
    }

    if (!participant) {
      console.warn("⚠️ No participant found");
      toast.error("Please select a chat");
      return;
    }

    if (!currentUser) {
      console.warn("⚠️ No user found");
      toast.error("Please login first");
      return;
    }

    if (!isConnected) {
      console.warn("⚠️ Socket not connected");
      toast.error("Connecting to chat... Please wait");
      return;
    }

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const messageData = {
      consultationId,
      sender: currentUser._id,
      receiver: participant._id,
      content: message.trim(),
      tempId,
    };

    console.log("📤 Sending message:", messageData);

    // Optimistically add to UI
    dispatch(
      addConsultationMessage({
        ...messageData,
        _id: tempId,
        isTemp: true,
        isRead: false,
        status: "sent",
        createdAt: new Date().toISOString(),
      }),
    );

    // Send via socket
    const sent = sendConsultationMessage(messageData);

    console.log("Message sent:", sent);

    if (sent) {
      setMessage("");
      inputRef.current?.focus();
    } else {
      console.error("❌ Failed to send message");
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Handle end session
  const handleEndSession = async () => {
    try {
      const response = await endConsultationSession(consultationId).unwrap();
      if (response?.success) {
        dispatch(clearSelectedConsultation());
        navigate(
          `/dashboard/user/rate-astrologer/${consultation?.data?.astrologer?._id}/${consultationId}`,
        );
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  // Handle back button
  const handleBack = useCallback(() => {
    dispatch(clearSelectedConsultation());
    navigate(-1);
  }, [dispatch, navigate]);

  // Check if current user is the astrologer or user
  const isAstrologer = currentUser?.role === "astrologer";

  // Get astrologer details from participant
  const astrologerDetails = isAstrologer
    ? {
        name: currentUser?.name || "Astrologer",
        profilePicture: currentUser?.profilePicture || IMAGES.rahul,
        isVerified: true,
      }
    : {
        name: participant?.name || "Astrologer",
        profilePicture: participant?.profilePicture || IMAGES.rahul,
        isVerified: true,
      };

  if (!consultationId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-neutral-45">No consultation selected</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-primary-5">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-GeneralSans bg-neutral-20/10">
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
          <div className="lg:w-2/3 flex flex-col bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden min-h-150">
            {/* Chat Header */}
            <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="lg:hidden p-2 hover:bg-neutral-20/10 rounded-full transition-colors"
                >
                  <IoArrowBack size={20} className="text-neutral-5" />
                </button>

                <div className="relative">
                  <img
                    src={astrologerDetails.profilePicture}
                    className="size-12 rounded-2xl object-cover"
                    alt={astrologerDetails.name}
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 size-3.5 border-2 border-white rounded-full ${
                      isConnected ? "bg-green-500" : "bg-neutral-400"
                    }`}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-neutral-5/90">
                    {astrologerDetails.name}
                  </h4>
                  <p className="text-[10px] text-green-500 uppercase tracking-widest flex items-center gap-1">
                    <span
                      className={`size-1.5 rounded-full ${
                        isConnected
                          ? "bg-green-500 animate-pulse"
                          : "bg-neutral-400"
                      }`}
                    />
                    <span className="font-normal">
                      {isConnected ? "Online" : "Connecting..."}
                    </span>
                  </p>
                </div>
              </div>

              {consultation?.data?.status !== "ended" ? (
                <button
                  onClick={handleEndSession}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all group"
                >
                  <IoCloseCircleOutline
                    size={18}
                    className="group-hover:rotate-90 transition-transform"
                  />
                  End Session
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-semibold">
                  Session Ended
                </div>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-8 space-y-6 bg-neutral-20/10 overflow-y-auto max-h-150">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-neutral-45">
                  <HiOutlineSparkles
                    size={48}
                    className="mb-4 text-primary-5/30"
                  />
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs">
                    Start the conversation with your astrologer
                  </p>
                </div>
              ) : (
                messages.map((msg: any, index: number) => {
                  const isOwn =
                    msg.sender === currentUser?._id ||
                    msg.sender?._id === currentUser?._id;
                  const isTemp = msg.isTemp;

                  const showDate =
                    index === 0 ||
                    new Date(msg.createdAt ?? "").toDateString() !==
                      new Date(
                        messages[index - 1]?.createdAt ?? "",
                      ).toDateString();

                  return (
                    <div key={msg._id || msg.tempId || index}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="bg-white/50 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold text-neutral-10 border border-slate-100">
                            {new Date(msg.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      )}

                      <div
                        className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[75%] space-y-1 ${isOwn ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`px-5 py-3 rounded-2xl text-sm font-medium font-Satoshi shadow-sm ${
                              isOwn
                                ? "bg-primary-5 text-white rounded-tr-none"
                                : "bg-white text-neutral-5 rounded-tl-none border border-slate-100"
                            } ${isTemp ? "opacity-70" : ""}`}
                          >
                            {msg.content}
                          </div>
                          <p className="text-[10px] text-neutral-10 font-bold px-1 flex items-center gap-1">
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Sending..."}
                            {isTemp && (
                              <span className="text-primary-5 text-[8px]">
                                ⌛ Sending...
                              </span>
                            )}
                            {isOwn && !isTemp && msg.isRead && (
                              <span className="text-green-500 text-[8px]">
                                ✓✓ Read
                              </span>
                            )}
                            {isOwn && !isTemp && !msg.isRead && (
                              <span className="text-neutral-400 text-[8px]">
                                ✓ Sent
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-6 bg-white border-t border-slate-50">
              <div className="flex items-center gap-3 p-2 rounded-2xl border border-primary-5/30 focus-within:border-primary-5 bg-white transition-all shadow-inner">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={consultation?.data?.status === "ended"}
                  placeholder="Type your question here..."
                  className="flex-1 bg-transparent outline-none text-sm font-medium font-Satoshi text-neutral-5 placeholder:text-neutral-10/70"
                />
                {/* <button className="p-2 text-neutral-10 hover:text-primary-5 transition-colors">
                  <IoHappyOutline size={22} />
                </button> */}
                <button
                  onClick={handleSendMessage}
                  className="bg-primary-5 text-white p-3 rounded-xl shadow-lg shadow-primary-5/20 hover:bg-primary-10 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={consultation?.data?.status === "ended"}
                >
                  <IoSend size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ASTROLOGER DETAILS */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center sticky top-6">
              <div className="relative group">
                <img
                  src={astrologerDetails.profilePicture}
                  className="size-32 rounded-3xl object-cover ring-4 ring-primary-5/10"
                  alt={astrologerDetails.name}
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
                  {astrologerDetails.name}
                </h3>
              </div>

              <div className="mt-8 text-left">
                <p className="text-sm text-neutral-10 text-center leading-relaxed italic">
                  {consultation?.data?.astrologer?.bio}
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
