'use client';

import React, { useRef, useEffect } from 'react';

const ImageSequenceCanvas = ({ currentFrame, folder }) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef({});

    // We should have images preloaded in browser cache, 
    // but for Canvas we need to instantiate new Image objects or reuse them.
    // Since we rely on cache, new Image().src = ... should be instant.

    useEffect(() => {
        const renderCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            const frameNum = String(currentFrame + 1).padStart(3, '0');
            const src = `/sequences/${folder}/frame-${frameNum}.webp`;

            const img = new Image();
            img.src = src;
            img.onload = () => {
                // Maintain aspect ratio or cover?
                // Usually cover for hero background.
                // For now simple drawImage cover logic

                const cw = canvas.width;
                const ch = canvas.height;
                const iw = img.width;
                const ih = img.height;

                // Scale to cover
                const scale = Math.max(cw / iw, ch / ih);
                const x = (cw - iw * scale) / 2;
                const y = (ch - ih * scale) / 2;

                ctx.clearRect(0, 0, cw, ch);
                ctx.drawImage(img, x, y, iw * scale, ih * scale);
            };
        };

        renderCanvas();
    }, [currentFrame, folder]);

    useEffect(() => {
        // Resize handler
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Trigger re-render of current frame? 
                // The dependency on currentFrame above handles frame updates. 
                // But resizing might clear canvas? No, but parameters change.
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Init
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        />
    );
};

export default ImageSequenceCanvas;
