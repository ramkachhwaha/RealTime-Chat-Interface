import { useCallback, useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { getMyChats } from "../webservices/chatApi/apis";
import { toast } from "react-toastify";

export default function ChatPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation()
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const { chats } = useSelector(store => store.chatState);

    const logOut = useCallback(() => {
        window.localStorage.clear();
        navigate("/")
    }, [navigate])

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchChats = useCallback(async () => {
        try {
            let res = await getMyChats()
            if (res.success) {
                dispatch({ type: "chatsSlice/SET_MY_CHATS", payload: res.data })
            } else {
                toast.error(res.message)
            }

        } catch (error) {
            toast.error(error.message || "Server Error")
        }
    }, [dispatch])

    useEffect(() => {
        fetchChats()
    }, [fetchChats])


    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 border-r border-gray-400 bg-white flex flex-col">
                <div className="p-3 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">ChatSphere</h1>
                    <div ref={menuRef} className="relative inline-block text-left">
                        {/* Menu Button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="p-3 rounded-full hover:bg-gray-200 focus:outline-none"
                        >
                            <FiMoreVertical className="cursor-pointer" />
                        </button>

                        {/* Dropdown List */}
                        {open && (
                            <div className="absolute right-0 mt-2 w-40 rounded-sm shadow-lg bg-white border border-gray-400">
                                <div className="py-2 text-sm text-gray-700">
                                    <Link to="/c/new-chat" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        New Chat
                                    </Link>
                                    <Link to="/c/profile" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Profile
                                    </Link>
                                    <Link to="/c/setting" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        Setting
                                    </Link>
                                    <button onClick={logOut} className="w-full text-left block px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Search bar */}
                <div className="m-2 p-3 border border-gray-400 rounded-2xl flex items-center bg-gray-50">
                    <FiSearch className="text-xl mr-2 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full outline-none bg-transparent"
                    />
                </div>

                <hr className="text-gray-400" />

                {/* Users list */}
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat, index) => {
                        let user = chat.members[1];
                        return (
                            <NavLink
                                to={`/c/chat/${chat._id}`}
                                key={index}
                                className={({ isActive }) =>
                                    `flex items-center p-3 cursor-pointer transition-all duration-200 
        hover:bg-gray-100 rounded-lg 
        ${isActive ? "bg-blue-100" : ""}`
                                }
                            >
                                {/* User DP */}
                                <div className="relative">
                                    <img
                                        src={chat.isGroupChat ? chat.groupIcon : user.avatar}
                                        alt="dp"
                                        className="w-12 h-12 border-2 border-blue-600 rounded-full"
                                    />
                                    {/* Online status indicator dot */}
                                    <span
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white 
          ${user.online ? "bg-green-500" : "bg-gray-400"}`}
                                    />
                                </div>

                                {/* User details */}
                                <div className="flex flex-col ml-3 flex-1">
                                    <span className="font-medium text-gray-800">{chat.isGroupChat ? chat.groupName : user.user_name}</span>
                                    <span className="text-xs text-gray-500 truncate max-w-[180px]">
                                        {chat.lastMessage.message}
                                    </span>
                                </div>

                                {/* Unread count badge */}
                                {chat.unreadCounts.length > 0 && (
                                    <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        {chat.unreadCounts.length}
                                    </span>
                                )}
                            </NavLink>
                        )
                    })}
                </div>

            </div>

            <div className="flex-1 flex flex-col">
                <Outlet />
            </div>

            {
                pathname === "/c" && <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
                    <p className="text-md text-gray-500">Start chating here....</p>
                </div>
            }
        </div >
    );
}
