'use client';

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { cn } from '@/lib/utils';

const DebitCard3D = ({
    isActive,
    className,
    cardNumber = "•••• •••• •••• 1234",
    holder = "JOHN DOE",
    expiry = "12/28",
    showDetails = false
}) => {

    // Helper to mask/unmask
    const formatNumber = (num) => {
        if (!showDetails) return "•••• •••• •••• " + num.slice(-4);
        return num.match(/.{1,4}/g).join(" "); // Space every 4 chars
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
                "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#0a0a0a] border border-white/10",
                "shadow-2xl shadow-black/50"
            )}>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Content */}
                <div className="flex flex-col justify-between h-full relative z-10">
                    {/* Top */}
                    <div className="flex justify-between items-start">
                        <div className="text-sm font-light tracking-widest opacity-70">DEBIT</div>
                        <div className="italic font-bold tracking-tighter text-lg">Natural Bank</div>
                    </div>

                    {/* Chip */}
                    <div className="w-12 h-9 rounded bg-gradient-to-tr from-yellow-200 to-yellow-500 opacity-90 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
                    </div>

                    {/* Number */}
                    <div className="text-2xl font-mono tracking-widest mt-4">
                        {formatNumber(cardNumber)}
                    </div>

                    {/* Bottom */}
                    <div className="flex justify-between items-end mt-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] opacity-60 uppercase">Card Holder</span>
                            <span className="text-sm font-medium tracking-wide first-letter:uppercase">{holder}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] opacity-60 uppercase">Expires</span>
                            <span className="text-sm font-medium tracking-wide">{expiry}</span>
                        </div>
                    </div>
                </div>

                {/* Visa/Mastercard Logo */}
                <div className="absolute bottom-6 right-8 opacity-80">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full bg-red-500/80 blur-[1px]"></div>
                        <div className="w-10 h-10 rounded-full bg-orange-500/80 blur-[1px]"></div>
                    </div>
                </div>

            </div>
        </Tilt>
    );
};

export default DebitCard3D;
