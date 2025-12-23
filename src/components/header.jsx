import { Link, NavLink } from 'react-router'

export default function Header() {
    return (
        <>
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">ChatSphere</h1>
                    <nav className="space-x-6 hidden md:flex">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `${isActive && 'bg-indigo-600 text-white rounded-lg'} px-6 py-2 font-medium hover:text-indigo-600 transition`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/features"
                            className={({ isActive }) => `${isActive && 'bg-indigo-600 text-white rounded-lg'} px-6 py-2 font-medium hover:text-indigo-600 transition`}
                        >
                            Features
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => `${isActive && 'bg-indigo-600 text-white rounded-lg'} px-6 py-2 font-medium hover:text-indigo-600 transition`}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => `${isActive && 'bg-indigo-600 text-white rounded-lg'} px-6 py-2 font-medium hover:text-indigo-600 transition`}
                        >
                            Contact
                        </NavLink>
                    </nav>
                    <Link to="/login" className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                        Login
                    </Link>
                </div>
            </header>
        </>
    )
}
