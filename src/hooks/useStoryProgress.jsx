import { useState, useEffect, useRef } from 'react';

const useStoryProgress = (isLoading, imgError, onComplete) => {
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        setProgress(0);
    }, [isLoading, imgError]);

    useEffect(() => {
        if (!isLoading && !imgError) {
            intervalRef.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        onComplete();
                        return 0;
                    }
                    return prev + 2; // 2% every 100ms = 5 seconds total
                });
            }, 100);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isLoading, imgError, onComplete]);

    const resetProgress = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setProgress(0);
    };

    return { progress, resetProgress };
};

export default useStoryProgress;