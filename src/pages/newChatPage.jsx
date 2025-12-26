import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi';
import { IoReturnUpBack } from 'react-icons/io5';
import { useNavigate } from 'react-router';

export default function NewChatPage() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-400 bg-white">
                <div className="flex items-center gap-5">
                    <IoReturnUpBack className="text-2xl cursor-pointer" onClick={() => navigate("/c")} />
                    <div>
                        <h2 class="text-xl font-semibold">New Chats</h2>
                    </div>
                </div>
                <button
                    onClick={() => setOpen(true)}
                    class="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    + Create Group
                </button>
            </div>

            <div class="p-4 bg-gray-50 h-screen overflow-y-auto">

                {/* Search bar */}
                <div className='grid grid-cols-1 md:grid-cols-3 ml-1'>
                    <div className="m-2 px-3 py-2 border border-gray-400 rounded flex items-center bg-gray-50">
                        <FiSearch className="text-xl mr-2 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* <!-- User List --> */}
                <ul class="space-y-2 p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <li class="user" data-name="Rahul Sharma">
                        <div onclick="selectChat('Rahul Sharma','user')"
                            class="flex items-center justify-between p-3 border border-gray-400 rounded hover:bg-indigo-50 cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 bg-indigo-500 text-white rounded-full flex items-center justify-center">R</div>
                                <span>Rahul Sharma</span>
                            </div>
                            {/* <input type="checkbox" /> */}
                        </div>
                    </li>

                    <li class="user" data-name="Priya Verma">
                        <div onclick="selectChat('Priya Verma','user')"
                            class="flex items-center justify-between p-3 border border-gray-400 rounded hover:bg-indigo-50 cursor-pointer">
                            <div class="flex items-center gap-3">
                                <div class="w-9 h-9 bg-pink-500 text-white rounded-full flex items-center justify-center">P</div>
                                <span>Priya Verma</span>
                            </div>
                            {/* <input type="checkbox" /> */}
                        </div>
                    </li>
                </ul>

            </div>

            {/* <!-- CREATE GROUP MODAL --> */}
            {open && <div id="groupModal" class="fixed inset-0 bg-black/40 flex justify-center items-center">

                <div class="bg-white w-full max-w-md rounded-lg p-5">
                    <h3 class="text-lg font-semibold mb-3">Create Group</h3>

                    <input
                        type="text"
                        placeholder="Group Name"
                        class="w-full px-3 py-2 border rounded mb-3"
                    />

                    <p class="text-sm text-gray-500 mb-2">Select Members</p>

                    {/* <!-- Select Users --> */}
                    <ul class="space-y-2 mb-4">
                        <li>
                            <label class="flex items-center gap-3 p-2 border rounded cursor-pointer">
                                <input type="checkbox" />
                                Rahul Sharma
                            </label>
                        </li>
                        <li>
                            <label class="flex items-center gap-3 p-2 border rounded cursor-pointer">
                                <input type="checkbox" />
                                Priya Verma
                            </label>
                        </li>
                        <li>
                            <label class="flex items-center gap-3 p-2 border rounded cursor-pointer">
                                <input type="checkbox" />
                                Amit Patel
                            </label>
                        </li>
                    </ul>

                    <div class="flex justify-end gap-2">
                        <button
                            onClick={() => setOpen(false)}
                            class="px-3 py-1 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            class="px-3 py-1 bg-indigo-600 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}
