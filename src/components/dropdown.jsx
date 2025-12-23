import { useState } from "react";

export default function DropdownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
      >
        ⋮
      </button>

      {/* Dropdown List */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white border">
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Change Password
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Block User
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
