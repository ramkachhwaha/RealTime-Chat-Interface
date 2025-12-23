import { useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiPaperclip, FiSend } from "react-icons/fi";
import { IoReturnUpBack } from "react-icons/io5";
import { MdCall, MdVideocam } from "react-icons/md";
import { useNavigate, useOutletContext, useParams } from "react-router";

export default function Chatsection() {
    // Ref for auto-scroll
    const { userId } = useParams();
    const messagesEndRef = useRef(null);
    const users = useOutletContext();
    const [selectedUser, setSelectedUser] = useState({})
    const navigate = useNavigate()
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello!", status: "sent", sender: "other" },
        { id: 2, text: "How are you?", status: "delivered", sender: "other" },
        { id: 3, text: "I’m good, thanks!", status: "read", sender: "me" },
    ]);
    const [newMsg, setNewMsg] = useState("");

    const handleSend = () => {
        if (newMsg.trim() === "") return;
        setMessages([
            ...messages,
            { id: messages.length + 1, text: newMsg, status: "sent", sender: "me", time: (new Date()) },
        ]);
        setNewMsg("");
    };

    const getStatusIcon = (status) => {
        if (status === "sent") return <span className="text-xs">
            <span className="text-lg">✓</span>
        </span>;
        if (status === "delivered") return <span className="text-xs">
            <span className="text-lg">✓✓</span>
        </span>;
        if (status === "read") return <span className="text-xs">
            <span className="text-blue-800 text-lg">✓✓</span>
        </span>;
    };

    // Auto scroll when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    useEffect(() => {
        let user = users?.find(item => item.id == userId);
        setSelectedUser(user)
    }, [userId, users])

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between p-2 border-b border-gray-400 bg-white shadow-sm">
                <div className="flex items-center gap-5">
                    <IoReturnUpBack className="text-2xl cursor-pointer" onClick={() => navigate("/c")} />
                    <img
                        src={selectedUser?.image}
                        alt="dp"
                        className="w-12 h-12 rounded-full border-2 border-blue-600"
                    />
                    <div>
                        <h2 className="font-semibold">{selectedUser?.firstName} {selectedUser?.lastName}</h2>
                        <p
                            className={`text-xs ${selectedUser?.online ? "text-green-500" : "text-gray-400"
                                }`}
                        >
                            {selectedUser?.online ? "Online" : "Offline"}
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
                        key={msg.id}
                        className={`flex mb-2 ${msg.sender === "me" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`p-2 rounded-lg max-w-lg ${msg.sender === "me"
                                ? "bg-green-400 text-white"
                                : "bg-white border"
                                }`}
                        >
                            <p className="whitespace-pre-wrap break-words">
                                {msg.text}
                            </p>
                            <span className={`text-xs block ml-3 text-right mt-1 opacity-80`}>
                                {msg.sender === "me" ? getStatusIcon(msg.status) : ""}
                            </span>
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
