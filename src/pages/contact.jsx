import React from "react";

function Contact() {
    return (
        < >
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-300 to-white-600 text-white py-20 text-center animate-fadeIn">
                <h2 className="text-4xl text-indigo-700 font-bold mb-4">Get in Touch with ChatSphere</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Have any questions or feedback? We’d love to hear from you!
                    Let’s connect and make communication simpler together.
                </p>
            </section>

            {/* Contact Form + Image */}
            <section className="flex-grow py-16">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-md animate-slideUp">
                        <h3 className="text-2xl font-bold text-indigo-600 mb-6">Send Us a Message</h3>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Write your message..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full font-semibold hover:bg-indigo-700 hover:scale-105 transform transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center animate-slideLeft">
                        <img
                            src="images/chat-image2.avif"
                            alt="Contact illustration"
                            className="rounded-2xl shadow-lg w-full max-w-md hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Info Section */}
            <section className="bg-indigo-50 py-16 text-center animate-fadeInSlow">
                <h3 className="text-3xl font-bold text-indigo-700 mb-10">Reach Us Directly</h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 text-gray-700">
                    <div className="bg-white p-6 rounded-xl shadow-md w-64 hover:shadow-lg hover:scale-105 transform transition duration-300">
                        <span className="text-3xl">📧</span>
                        <p className="mt-3 font-semibold">Email Us</p>
                        <p className="text-sm text-gray-500">support@chatsphere.com</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md w-64 hover:shadow-lg hover:scale-105 transform transition duration-300">
                        <span className="text-3xl">📞</span>
                        <p className="mt-3 font-semibold">Call Us</p>
                        <p className="text-sm text-gray-500">+91 98765 43210</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-md w-64 hover:shadow-lg hover:scale-105 transform transition duration-300">
                        <span className="text-3xl">📍</span>
                        <p className="mt-3 font-semibold">Visit Us</p>
                        <p className="text-sm text-gray-500">Pune, Maharashtra, India</p>
                    </div>
                </div>
            </section>
            {/* Tailwind Keyframes */}
            <style>
                {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInSlow {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideLeft {
            0% { opacity: 0; transform: translateX(50px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-fadeInSlow {
            animation: fadeInSlow 1.5s ease-out forwards;
          }
          .animate-slideUp {
            animation: slideUp 1s ease-out forwards;
          }
          .animate-slideLeft {
            animation: slideLeft 1s ease-out forwards;
          }
        `}
            </style>
        </>
    );
};

export default Contact;
