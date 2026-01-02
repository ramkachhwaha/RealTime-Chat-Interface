import { useCallback, useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiPaperclip, FiSend } from "react-icons/fi";
import { IoReturnUpBack } from "react-icons/io5";
import { MdCall, MdVideocam } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router";
import { getMyChatMessages, sendMessageApi } from "../webservices/chatApi/apis";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Chatsection() {
    // Ref for auto-scroll
    const { chatId } = useParams();
    const { loggedUser } = useSelector(store => store.user)
    const messagesEndRef = useRef(null);
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [newMsg, setNewMsg] = useState("");

    const { state } = useLocation();


    const fetchChatMessages = useCallback(async () => {
        try {
            let response = await getMyChatMessages(chatId);
            if (response.success) {
                setMessages(response.data);
            } else {
                setMessages([])
            }
        } catch (error) {
            toast.error(error.messages || "Server Error")
        }
    }, [chatId])

    const handleSend = useCallback(async () => {
        if (newMsg.trim() === "") return;

        let data = {
            message: newMsg,
            chatId
        }

        try {
            let response = await sendMessageApi(data);

            if (response.success) {
                setNewMsg("");
                setMessages(prev => [...prev, response.data]);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message || "Server Error")
        }

    }, [chatId, newMsg]);

    const getStatusIcon = ({ seen, delivered }) => {
        if (seen.length) {
            return <span className="text-xs">
                <span className="text-blue-800 text-lg">✓✓</span>
            </span>;
        } else if (delivered) {
            return <span className="text-xs">
                <span className="text-lg">✓✓</span>
            </span>
        } else {
            return <span className="text-xs">
                <span className="text-lg">✓</span>
            </span>;
        }
    };

    // Auto scroll when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        fetchChatMessages()
    }, [fetchChatMessages]);


    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-400 bg-white shadow-sm">
                <div className="flex items-center gap-5">
                    <IoReturnUpBack className="text-2xl cursor-pointer" onClick={() => navigate("/c")} />
                    <img
                        src={state?.icon}
                        alt="dp"
                        className="w-12 h-12 rounded-full border-2 border-blue-600"
                    />
                    <div>
                        <h2 className="font-semibold">{state?.name}</h2>
                        <p
                            className={`text-xs ${state?.online ? "text-green-500" : "text-gray-400"
                                }`}
                        >
                            {state?.online ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xl text-gray-700">
                    <MdCall className="cursor-pointer" />
                    <MdVideocam className="cursor-pointer" />
                    <FiMoreVertical className="cursor-pointer" />
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex mb-2 ${msg.sender._id === loggedUser._id ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`p-2 rounded-lg max-w-lg ${msg.sender._id === loggedUser
                                ? "bg-green-400 text-white"
                                : "bg-white border"
                                }`}
                        >
                            <p className="whitespace-pre-wrap break-words">
                                {msg.message}
                                <span className={`text-xs ml-3 text-right mt-1 opacity-80`}>
                                    {msg.sender._id === loggedUser._id && getStatusIcon({ seen: msg.seen, delivered: msg.delivered })}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
                {/* Invisible div to auto-scroll */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center p-3 border-t border-gray-400 bg-white">
                <label className="cursor-pointer">
                    <FiPaperclip className="text-2xl mr-3 text-gray-600" />
                    <input type="file" className="hidden" />
                </label>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    className="flex-1 p-2 border border-gray-400 rounded-full outline-none"
                />
                <button
                    onClick={handleSend}
                    className="ml-3 bg-blue-500 text-white p-3 rounded-full"
                >
                    <FiSend />
                </button>
            </div>
        </>
    )
}
