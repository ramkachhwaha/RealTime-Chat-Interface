import React, { useState, useRef } from "react";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router";

// UserProfile.jsx
// Single-file React component styled with Tailwind CSS.
// Features:
// - Update profile fields (name, username, bio, phone, location)
// - Upload and preview display picture (DP)
// - Change password section with validation
// - Responsive layout ready to drop into your chat app
// - Placeholder save handlers where you can call your API

export default function UserProfile({ user = {} }) {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        phone: user.phone || "",
        location: user.location || "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl || "");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    // Password change
    const [showPwd, setShowPwd] = useState(false);
    const [pwd, setPwd] = useState({ current: "", new: "", confirm: "" });
    const [pwdError, setPwdError] = useState("");

    const fileInputRef = useRef(null);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    function handleAvatarChange(e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        // Basic client-side validation
        if (!file.type.startsWith("image/")) {
            setMessage({ type: "error", text: "Please upload an image file." });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: "error", text: "Image too large. Max 5MB." });
            return;
        }
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file);
    }

    function removeAvatar() {
        setAvatarFile(null);
        setAvatarPreview("");
        if (fileInputRef.current) fileInputRef.current.value = null;
    }

    async function handleSave(e) {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            // Example: construct FormData if you need to upload avatar
            const payload = new FormData();
            payload.append("fullName", form.fullName);
            payload.append("username", form.username);
            payload.append("bio", form.bio);
            payload.append("phone", form.phone);
            payload.append("location", form.location);
            if (avatarFile) payload.append("avatar", avatarFile);

            // TODO: replace URL with your API endpoint
            // const res = await fetch('/api/user/profile', { method: 'POST', body: payload });
            // const data = await res.json();

            // Mock delay + success
            await new Promise((r) => setTimeout(r, 700));
            setMessage({ type: "success", text: "Profile saved successfully." });
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Failed to save profile. Try again." });
        } finally {
            setSaving(false);
        }
    }

    function validatePassword() {
        setPwdError("");
        if (!pwd.current || !pwd.new || !pwd.confirm) {
            setPwdError("Fill all password fields.");
            return false;
        }
        if (pwd.new.length < 8) {
            setPwdError("New password must be at least 8 characters.");
            return false;
        }
        if (pwd.new !== pwd.confirm) {
            setPwdError("New password and confirmation do not match.");
            return false;
        }
        return true;
    }

    async function handleChangePassword(e) {
        e.preventDefault();
        if (!validatePassword()) return;
        try {
            // TODO: call your change-password API
            await new Promise((r) => setTimeout(r, 600));
            setMessage({ type: "success", text: "Password updated." });
            setPwd({ current: "", new: "", confirm: "" });
            setShowPwd(false);
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Password change failed." });
        }
    }

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-400 bg-white">
                <div className="flex items-center gap-5">
                    <IoReturnUpBack className="text-2xl cursor-pointer" onClick={() => navigate("/c")} />
                    <div>
                        <h2 className="font-semibold">Profile</h2>
                    </div>
                </div>
            </div>
            <div className="p-4 bg-gray-50 h-screen overflow-y-auto">
                <div className="bg-white rounded-2xl p-6">
                    {message && (
                        <div
                            className={`mb-4 p-3 rounded-md text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                                }`}
                            role="status"
                        >
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            <div className="flex flex-col items-center md:items-start">
                                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                    {avatarPreview ? (
                                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                        <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400">No photo</span>
                                    )}
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                    <label className="cursor-pointer inline-flex items-center px-3 py-1 border rounded-md text-sm select-none">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAvatarChange}
                                            className="hidden cursor-pointer"
                                        />
                                        Change
                                    </label>
                                    <button type="button" onClick={removeAvatar} className="cursor-pointer text-sm underline text-blue-600">
                                        Remove
                                    </button>
                                </div>

                                <p className="text-xs text-gray-500 mt-2">PNG/JPG up to 5MB. Recommended 1:1 ratio.</p>
                            </div>

                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full name</label>
                                        <input
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Username</label>
                                        <input
                                            name="username"
                                            value={form.username}
                                            onChange={handleChange}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                            placeholder="@username"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            name="email"
                                            value={form.email}
                                            readOnly
                                            disabled
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={form.bio}
                                            onChange={handleChange}
                                            rows={3}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                            placeholder="Write something about yourself"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            name="location"
                                            value={form.location}
                                            onChange={handleChange}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-400 pt-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Security</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((s) => !s)}
                                    className="text-sm underline cursor-pointer text-blue-500"
                                >
                                    {showPwd ? "Hide" : "Change password"}
                                </button>
                            </div>

                            {showPwd && (
                                <form onSubmit={handleChangePassword} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Current password</label>
                                        <input
                                            type="password"
                                            value={pwd.current}
                                            onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">New password</label>
                                        <input
                                            type="password"
                                            value={pwd.new}
                                            onChange={(e) => setPwd((p) => ({ ...p, new: e.target.value }))}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Confirm new</label>
                                        <input
                                            type="password"
                                            value={pwd.confirm}
                                            onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
                                            className="mt-1 px-2 py-2 block w-full rounded border border-gray-200 focus:outline-blue-500"
                                        />
                                    </div>

                                    {pwdError && <p className="text-sm text-red-600 mt-2 md:col-span-3">{pwdError}</p>}

                                    <div className="md:col-span-3 flex gap-3 mt-2">
                                        <button type="submit" className="px-4 py-2 rounded-lg cursor-pointer bg-indigo-600 text-white text-sm">
                                            Update password
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowPwd(false);
                                                setPwd({ current: "", new: "", confirm: "" });
                                                setPwdError("");
                                            }}
                                            className="px-4 py-2 rounded-lg border text-sm cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    // reset to initial user data
                                    setForm({
                                        fullName: user.fullName || "",
                                        username: user.username || "",
                                        email: user.email || "",
                                        bio: user.bio || "",
                                        phone: user.phone || "",
                                        location: user.location || "",
                                    });
                                    setAvatarPreview(user.avatarUrl || "");
                                    setAvatarFile(null);
                                    if (fileInputRef.current) fileInputRef.current.value = null;
                                    setMessage(null);
                                }}
                                className="px-4 py-2 rounded-lg border text-sm cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button type="submit" disabled={saving} className="cursor-pointer px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">
                                {saving ? "Saving..." : "Save changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
