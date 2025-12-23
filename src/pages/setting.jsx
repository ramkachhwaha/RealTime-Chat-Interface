import { useState } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router";

// UserSettings.jsx
// A settings page for a chat app styled with Tailwind CSS
// Includes sections: account, notifications, privacy, theme

export default function UserSettings() {
    const navigate = useNavigate()
    const [theme, setTheme] = useState("light");
    const [notifications, setNotifications] = useState({
        messages: true,
        mentions: true,
        sounds: false,
    });

    const [privacy, setPrivacy] = useState({
        showStatus: true,
        readReceipts: true,
        lastSeen: "Everyone",
    });

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-400 bg-white shadow-sm">
                <div className="flex items-center gap-5">
                    <IoReturnUpBack className="text-2xl cursor-pointer" onClick={() => navigate("/c")} />
                    <div>
                        <h2 className="font-semibold">Setting</h2>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-50 h-screen overflow-y-auto">
                <div className="bg-white rounded-2xl p-6 space-y-8">

                    {/* Notifications */}
                    <section>
                        <h3 className="text-lg font-medium mb-3">Notifications</h3>
                        <div className="space-y-3">
                            {Object.keys(notifications).map((key) => (
                                <div key={key} className="flex justify-between items-center">
                                    <span className="capitalize text-sm text-gray-700">{key}</span>
                                    <input
                                        type="checkbox"
                                        checked={notifications[key]}
                                        onChange={(e) =>
                                            setNotifications({ ...notifications, [key]: e.target.checked })
                                        }
                                        className="w-4 h-4"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Privacy */}
                    <section>
                        <h3 className="text-lg font-medium mb-3">Privacy</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Show online status</span>
                                <input
                                    type="checkbox"
                                    checked={privacy.showStatus}
                                    onChange={(e) => setPrivacy({ ...privacy, showStatus: e.target.checked })}
                                    className="w-4 h-4"
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Read receipts</span>
                                <input
                                    type="checkbox"
                                    checked={privacy.readReceipts}
                                    onChange={(e) => setPrivacy({ ...privacy, readReceipts: e.target.checked })}
                                    className="w-4 h-4"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Last seen</label>
                                <select
                                    value={privacy.lastSeen}
                                    onChange={(e) => setPrivacy({ ...privacy, lastSeen: e.target.value })}
                                    className="px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                >
                                    <option>Everyone</option>
                                    <option>My contacts</option>
                                    <option>Nobody</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Appearance */}
                    <section>
                        <h3 className="text-lg font-medium mb-3">Appearance</h3>
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Theme</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>
                        </div>
                    </section>

                    {/* Account */}
                    <section>
                        <h3 className="text-lg font-medium mb-3 text-red-600">Danger Zone</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-700">Delete account</span>
                                <button className="px-3 py-1 cursor-pointer rounded-md border border-red-500 text-red-600 text-sm">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm cursor-pointer">
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
