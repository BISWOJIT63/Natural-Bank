import { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

const useScrollSequence = (frameCount) => {
    const [frameIndex, setFrameIndex] = useState(0);
    const containerRef = useRef(null);

    useEffect(() => {
        // We can use Lenis scroll or just native/framer scroll listener
        // Ideally we map scrollY directly to frame index
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            // If we scroll 100% of the page, we reach the last frame.
            // But we probably want the sequence to finish earlier or span specific section.
            // For now, map 0-100% of page height? Or just the hero section height?
            // Assuming Hero is Sticky and 300vh tall to allow scrolling.

            const scrollProgress = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);
            const index = Math.floor(scrollProgress * (frameCount - 1));
            setFrameIndex(index);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [frameCount]);

    return frameIndex;
};

export default useScrollSequence;
