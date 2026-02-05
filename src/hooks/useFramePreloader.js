import { useState, useEffect } from 'react';

const useFramePreloader = (sequences) => {
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [totalFrames, setTotalFrames] = useState(0);

    useEffect(() => {
        if (!sequences || Object.keys(sequences).length === 0) return;

        let framesToLoad = [];
        Object.keys(sequences).forEach(key => {
            const { path, count } = sequences[key];
            for (let i = 1; i <= count; i++) {
                const frameNum = String(i).padStart(3, '0');
                framesToLoad.push(`${path}/frame-${frameNum}.webp`);
            }
        });

        setTotalFrames(framesToLoad.length);

        let loaded = 0;
        framesToLoad.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loaded++;
                setLoadedCount(loaded);
                if (loaded === framesToLoad.length) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                loaded++; // Count errors too to avoid hanging
                setLoadedCount(loaded);
                if (loaded === framesToLoad.length) {
                    setIsLoaded(true);
                }
            };
        });

    }, [sequences]);

    return { loadedCount, totalFrames, isLoaded, progress: totalFrames > 0 ? (loadedCount / totalFrames) * 100 : 0 };
};

export default useFramePreloader;
