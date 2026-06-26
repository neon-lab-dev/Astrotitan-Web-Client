/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { useCurrentUser, type TLoggedInUser } from "./redux/Features/Auth/authSlice";
import {
    addConsultationMessage,
    setConsultationChatList,
    markConsultationMessagesAsRead,
    updateConsultationMessageId,
    addConsultationOnlineUser,
    removeConsultationOnlineUser,
    setConsultationOnlineUsers,
    selectSelectedConsultationId,
} from "./redux/Features/Consultation/consultationChatSlice";
import { backendBaseUrl } from "./redux/Api/baseApi";

let socketInstance: Socket | null = null;

export const useConsultationSocket = () => {
    const dispatch = useDispatch();
    const user = useSelector(useCurrentUser) as TLoggedInUser;
    const selectedConsultationId = useSelector(selectSelectedConsultationId);
    const socketRef = useRef<Socket | null>(null);
    const isConnectedRef = useRef<boolean>(false);

    useEffect(() => {
        if (!user?._id) {
            console.log("No user, skipping consultation socket connection");
            return;
        }

        console.log("🔄 Initializing consultation socket for user:", user._id);

        // Close existing connection if any
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            isConnectedRef.current = false;
        }

        const socket = io(backendBaseUrl, {
            withCredentials: true,
            query: { userId: user._id },
            transports: ["websocket", "polling"],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current = socket;
        socketInstance = socket;

        // ✅ Connection handlers
        socket.on("connect", () => {
            console.log("✅ Connected to consultation socket server");
            isConnectedRef.current = true;
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from consultation socket server");
            isConnectedRef.current = false;
        });

        socket.on("connect_error", (error: any) => {
            console.error("❌ Consultation socket connection error:", error);
            isConnectedRef.current = false;
        });

        // ✅ Handle receiving message
        socket.on("receiveConsultationMessage", (message: any) => {
            console.log("📩 Received consultation message via socket:", message);

            // Add message to selected consultation if it's the current one
            if (message.consultationId === selectedConsultationId) {
                dispatch(addConsultationMessage(message));
            }
        });

        // ✅ Handle message sent confirmation
        socket.on("consultationMessageSent", (message: any) => {
            console.log("✅ Consultation message sent confirmation:", message);

            if (message.tempId && message._id) {
                dispatch(
                    updateConsultationMessageId({
                        tempId: message.tempId,
                        realId: message._id,
                        createdAt: message.createdAt,
                    })
                );
            }
        });

        // ✅ Handle chat list update
        socket.on("updateConsultationChatList", (chatList: any[]) => {
            console.log("📋 Consultation chat list updated:", chatList);
            dispatch(setConsultationChatList(chatList));
        });

        // ✅ Handle messages read
        socket.on("consultationMessagesRead", ({ consultationId, by }: any) => {
            console.log("📖 Consultation messages read:", consultationId, by);
            if (consultationId === selectedConsultationId) {
                dispatch(markConsultationMessagesAsRead(consultationId));
            }
        });

        // ✅ Handle typing indicator
        socket.on("consultationUserTyping", ({ consultationId, sender, isTyping }: any) => {
            console.log("✍️ User typing:", consultationId, sender, isTyping);
        });

        // ✅ Handle online users
        socket.on("consultationOnlineUsers", (users: string[]) => {
            console.log("👥 Consultation online users:", users);
            dispatch(setConsultationOnlineUsers(users));
        });

        socket.on("consultationUserOnline", (userId: string) => {
            console.log("🟢 Consultation user online:", userId);
            dispatch(addConsultationOnlineUser(userId));
        });

        socket.on("consultationUserOffline", (userId: string) => {
            console.log("🔴 Consultation user offline:", userId);
            dispatch(removeConsultationOnlineUser(userId));
        });

        // ✅ Cleanup function
        return () => {
            console.log("🧹 Cleaning up consultation socket connection");
            
            if (socketRef.current) {
                // ✅ Remove all event listeners before disconnecting
                socketRef.current.removeAllListeners();
                socketRef.current.disconnect();
                socketRef.current = null;
                isConnectedRef.current = false;
                socketInstance = null;
            }
        };
    }, [user?._id, dispatch, selectedConsultationId]);

    // ✅ Send message function
    const sendConsultationMessage = (data: {
        consultationId: string;
        sender: string;
        receiver: string;
        content: string;
        tempId: string;
    }) => {
        if (!socketRef.current || !isConnectedRef.current) {
            console.warn("⚠️ Socket not connected, unable to send message");
            return false;
        }

        console.log("📤 Sending consultation message:", data);
        socketRef.current.emit("sendConsultationMessage", data);
        return true;
    };

    // ✅ Mark messages as read function
    const markConsultationMessagesRead = (consultationId: string) => {
        if (!socketRef.current || !isConnectedRef.current) {
            console.warn("⚠️ Socket not connected, unable to mark messages as read");
            return false;
        }

        console.log("📖 Marking messages as read for consultation:", consultationId);
        socketRef.current.emit("markConsultationMessagesRead", {
            consultationId,
            userId: user?._id,
        });
        return true;
    };

    // ✅ Typing indicator function
    const sendTypingIndicator = (data: {
        consultationId: string;
        sender: string;
        receiver: string;
        isTyping: boolean;
    }) => {
        if (!socketRef.current || !isConnectedRef.current) {
            return false;
        }

        socketRef.current.emit("consultationTyping", data);
        return true;
    };

    return {
        socket: socketRef.current,
        isConnected: isConnectedRef.current,
        sendConsultationMessage,
        markConsultationMessagesRead,
        sendTypingIndicator,
    };
};

export const getConsultationSocket = () => socketInstance;