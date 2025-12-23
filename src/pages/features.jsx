import React from 'react'

export default function Features() {
    const features = [
        {
            icon: "💬",
            title: "Real-Time Messaging",
            desc: "Instantly send and receive messages with lightning-fast WebSocket technology. No refresh needed — ever.",
        },
        {
            icon: "👥",
            title: "Group Chats",
            desc: "Create chat rooms and stay connected with your communities, friends, or work teams all in one place.",
        },
        {
            icon: "🔒",
            title: "End-to-End Encryption",
            desc: "Your privacy matters. Messages are encrypted from sender to receiver for total security.",
        },
        {
            icon: "📸",
            title: "Media Sharing",
            desc: "Send photos, videos, and documents seamlessly without compromising quality or speed.",
        },
        {
            icon: "😊",
            title: "Custom Emojis & Reactions",
            desc: "Make conversations more expressive and fun with a library of custom emojis and reactions.",
        },
        {
            icon: "🌓",
            title: "Dark & Light Themes",
            desc: "Switch between dark and light modes to match your style or mood anytime.",
        },
        {
            icon: "🔔",
            title: "Smart Notifications",
            desc: "Get notified instantly about new messages and mentions — without being overwhelmed.",
        },
        {
            icon: "🌐",
            title: "Cross-Platform Access",
            desc: "Use ChatSphere on mobile, desktop, or tablet — your chats sync instantly everywhere.",
        },
        {
            icon: "⚡",
            title: "Optimized Performance",
            desc: "Built with modern tech for fast performance and smooth user experience even in large chat groups.",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-indigo-50 py-20 text-center">
                <h2 className="text-4xl font-bold text-indigo-700 mb-4">Why Choose ChatSphere?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Designed to keep your conversations smooth, secure, and fun — ChatSphere brings people closer
                    with every message.
                </p>
            </section>

            {/* Features Grid */}
            <section className="flex-grow py-16">
                <div className="max-w-7xl mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2 text-indigo-600">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-indigo-600 text-white py-16 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Chatting?</h3>
                <p className="mb-6 text-indigo-100">
                    Join ChatSphere today and experience seamless, secure, and real-time messaging.
                </p>
                <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Get Started Now
                </button>
            </section>
        </>
    );
}
