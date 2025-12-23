import React from 'react'

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                    <p className="text-sm">
                        © {new Date().getFullYear()} ChatSphere. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                        <a href="#" className="hover:text-white">Support</a>
                    </div>
                </div>
            </footer>
        </>
    )
}
