import React from 'react'

export default function About() {
    const team = [
        {
            name: "Krishna Patil",
            role: "Founder & Lead Developer",
            img: "https://avatars.githubusercontent.com/u/9919?s=280&v=4",
        },
        {
            name: "Aarav Mehta",
            role: "UI/UX Designer",
            img: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
        },
        {
            name: "Priya Sharma",
            role: "Frontend Engineer",
            img: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
        },
        {
            name: "Rohan Gupta",
            role: "Backend Engineer",
            img: "https://cdn-icons-png.flaticon.com/512/219/219988.png",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-indigo-50 py-20 text-center">
                <h2 className="text-4xl font-bold text-indigo-700 mb-4">About ChatSphere</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We believe communication should be simple, secure, and real-time. ChatSphere was built to bring people closer with modern technology that makes conversations effortless and fun.
                </p>
            </section>

            {/* About Content */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <img
                        src="images/chat-image1.avif"
                        alt="About ChatSphere"
                        className="rounded-xl shadow-lg"
                    />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-indigo-600 mb-4">Our Mission</h3>
                    <p className="text-gray-600 mb-4">
                        Our mission is to redefine the way people connect. With ChatSphere, we aim to create a space where everyone can communicate freely — whether it’s chatting with friends, collaborating with teammates, or sharing moments that matter.
                    </p>
                    <p className="text-gray-600">
                        We focus on speed, security, and design. ChatSphere is not just another messaging app — it’s your personal hub for meaningful conversations.
                    </p>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-3xl font-bold text-indigo-600 mb-10">Meet Our Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-indigo-100"
                                />
                                <h4 className="text-lg font-semibold">{member.name}</h4>
                                <p className="text-gray-500 text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-indigo-600 text-white py-16 text-center">
                <h3 className="text-3xl font-bold mb-4">Join Our Journey</h3>
                <p className="mb-6 text-indigo-100">
                    We're constantly improving ChatSphere to make conversations even more enjoyable. Be part of our growing community.
                </p>
                <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Get Started
                </button>
            </section>
        </>
    );
}
