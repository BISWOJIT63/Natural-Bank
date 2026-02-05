'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';


const Navbar = () => {
    const { user, logout } = useAuth();
    // Theme Toggle State
    const [theme, setTheme] = React.useState('dark');

    React.useEffect(() => {
        // Init theme from local storage or system
        const saved = localStorage.getItem('theme');
        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle('dark', saved === 'dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('banking-upgraded-title');
            if (section) {
                const rect = section.getBoundingClientRect();
                // Hide when title crosses near the top of the viewport (e.g. 100px from top)
                if (rect.top < 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-40 px-6 py-4 transition-transform duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 transition-colors duration-300 dark:bg-white/5 bg-black/5 dark:border-white/10 border-black/10">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-[#00ff88] group-hover:scale-110 transition-transform overflow-hidden" >
                        <img src="/nature-icon-vector-22753202.jpg" alt="N" className="w-full h-full object-center" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white">NATURAL BANK</span>
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium opacity-80 text-gray-800 dark:text-white">
                    <Link href="/account-opening" className="hover:text-[#00ff88] transition-colors">Accounts</Link>
                    <Link href="/cards" className="hover:text-[#00ff88] transition-colors">Cards</Link>
                    <Link href="/loans" className="hover:text-[#00ff88] transition-colors">Loans</Link>
                    <Link href="/about" className="hover:text-[#00ff88] transition-colors">About</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition text-black dark:text-white"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <i className="ri-sun-fill"></i> : <i className="ri-moon-fill"></i>}
                    </button>

                    {user ? (
                        <div className="relative group">
                            {/* User Icon */}
                            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full glass hover:bg-white/10 transition border border-transparent hover:border-[#00ff88]/30">
                                <span className="text-sm font-semibold hidden sm:block text-gray-900 dark:text-white">Hi, {user.fullName.split(' ')[0]}</span>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00ff88] to-cyan-400 flex items-center justify-center text-black font-bold text-xs shadow-lg shadow-[#00ff88]/20">
                                    {user.fullName[0]}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-white dark:bg-[#0a0a0a] rounded-xl border border-black/5 dark:border-white/10 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                                <Link href="/dashboard" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#00ff88]/10 hover:text-[#00ff88] transition-colors">
                                    <i className="ri-dashboard-fill"></i> Dashboard
                                </Link>
                                <Link href="/dashboard/profile" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#00ff88]/10 hover:text-[#00ff88] transition-colors">
                                    <i className="ri-user-settings-fill mr-2"></i>Settings
                                </Link>
                                <Link href="/" className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#00ff88]/10 hover:text-[#00ff88] transition-colors">
                                    <i className="ri-home-smile-fill mr-2"></i>Home
                                </Link>
                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors border-t border-black/5 dark:border-white/5"
                                >
                                    <i className="ri-logout-circle-r-line"></i> Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link href="/login" className="px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-[#00ff88] transition-colors shadow-lg shadow-black/5">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
