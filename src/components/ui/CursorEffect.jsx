'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorEffect = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [leaves, setLeaves] = useState([]);
    const leafIdCounter = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Spawn a leaf occasionally
            if (Math.random() > 0.7) { // 30% chance per move event to limit count
                const id = leafIdCounter.current++;
                const newLeaf = {
                    id,
                    x: e.clientX,
                    y: e.clientY,
                    rotation: Math.random() * 360,
                    scale: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
                };

                setLeaves(prev => [...prev.slice(-20), newLeaf]); // Keep last 20

                // Remove leaf after animation
                setTimeout(() => {
                    setLeaves(prev => prev.filter(l => l.id !== id));
                }, 1000);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {/* The Tree Cursor */}
            <div
                className="fixed pointer-events-none text-2xl"
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                🌳
            </div>

            {/* The Leaves Trail */}
            <AnimatePresence>
                {leaves.map(leaf => (
                    <motion.div
                        key={leaf.id}
                        initial={{ opacity: 1, x: leaf.x, y: leaf.y, scale: 0 }}
                        animate={{
                            opacity: 0,
                            y: leaf.y + 20, // Fall down slightly
                            x: leaf.x + (Math.random() - 0.5) * 20, // Drift
                            scale: leaf.scale
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="fixed pointer-events-none text-xs text-[#00ff88]"
                        style={{
                            rotate: leaf.rotation
                        }}
                    >
                        🍃
                    </motion.div>
                ))}
            </AnimatePresence>

            <style jsx global>{`
                body, a, button, input {
                    cursor: none !important;
                }
            `}</style>
        </div>
    );
};

export default CursorEffect;
