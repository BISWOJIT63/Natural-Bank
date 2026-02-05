'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

const RegisterPage = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await register(formData.fullName, formData.email, formData.password);
        if (!res.success) {
            setError(res.error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden py-20">
            <div className="absolute top-0 right-0 w-full h-full">
                <div className="absolute bottom-[20%] left-[-5%] w-[600px] h-[600px] bg-[#00ff88]/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg p-8 glass rounded-3xl relative z-10"
            >
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Join Natural Bank</h2>
                <p className="text-white/50 text-center mb-8">Start your gravity-defying journey</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                            placeholder="john@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff88]/50 transition-colors"
                            placeholder="Create a strong password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#00ff88] text-black font-bold py-4 rounded-xl hover:bg-[#00cc6a] transition-colors mt-4"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-white/50">
                    Already have an account? <Link href="/login" className="text-[#00ff88] hover:underline">Log In</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
