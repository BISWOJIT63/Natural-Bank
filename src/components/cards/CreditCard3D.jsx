'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { cn } from '@/lib/utils';

const CreditCard3D = ({
    isActive,
    className,
    cardNumber = "5412 1111 2222 3333",
    holder = "JOHN DOE",
    expiry = "06/29",
    showDetails = false
}) => {

    const formatNumber = (num) => {
        // Handle pre-formatted or raw string
        const clean = num.replace(/\s/g, '');
        if (!showDetails) return "•••• •••• •••• " + clean.slice(-4);
        return clean.match(/.{1,4}/g).join(" ");
    };

    return (
        <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            transitionSpeed={1000}
            scale={1.05}
            className={cn("w-[400px] h-[250px] relative preserve-3d", className)}
        >
            <div className={cn(
                "w-full h-full rounded-[20px] p-8 text-white relative overflow-hidden transition-all duration-500",
                // Gradient for Credit (Platinum/Darker or different accent)
                "bg-gradient-to-br from-[#2c3e50] via-[#000000] to-[#4ca1af] border border-white/10", // Example premium gradient
                "shadow-2xl shadow-cyan-900/20"
            )}>

                <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-col justify-between h-full relative z-10">
                    <div className="flex justify-between items-start">
                        <div className="text-sm font-light tracking-widest opacity-70">CREDIT</div>
                        <div className="italic font-bold tracking-tighter text-lg">Natural Bank</div>
                    </div>

                    <div className="w-12 h-9 rounded bg-slate-300 opacity-80 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                    </div>

                    {/* Number */}
                    <div className="text-2xl font-mono tracking-widest mt-4 text-cyan-50">
                        {formatNumber(cardNumber)}
                    </div>

                    <div className="flex justify-between items-end mt-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] opacity-60 uppercase">Card Holder</span>
                            <span className="text-sm font-medium tracking-wide uppercase">{holder}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] opacity-60 uppercase">Expires</span>
                            <span className="text-sm font-medium tracking-wide">{expiry}</span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 right-8 opacity-90">
                    {/* Mastercard circles */}
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-red-600"></div>
                        <div className="w-10 h-10 rounded-full bg-yellow-500"></div>
                    </div>
                </div>

            </div>
        </Tilt>
    );
};

export default CreditCard3D;
