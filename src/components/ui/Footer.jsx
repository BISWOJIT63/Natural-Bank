'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-[#050505] border-t border-white/5 py-16 px-6 relative z-10 text-white/60 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00ff88]" />
                        <span className="font-bold text-white text-lg tracking-tight">NATURAL BANK</span>
                    </div>
                    <p>
                        The future of finance, effectively gravity-free.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-semibold text-white mb-4">Banking</h4>
                    <ul className="space-y-2">
                        <li><Link href="/accounts" className="hover:text-[#00ff88] transition-colors">Personal Accounts</Link></li>
                        <li><Link href="/cards" className="hover:text-[#00ff88] transition-colors">Credit Cards</Link></li>
                        <li><Link href="/loans" className="hover:text-[#00ff88] transition-colors">Loans</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="hover:text-[#00ff88] transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-[#00ff88] transition-colors">Careers</Link></li>
                        <li><Link href="/contact" className="hover:text-[#00ff88] transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link href="/privacy" className="hover:text-[#00ff88] transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-[#00ff88] transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2024 Natural Bank. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
