import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import ProgressBar from './ProgressBar';

const StoryViewer = ({
    currentUserIndex,
    currentStoryIndex,
    stories,
    onClose,
    onNext,
    onPrev,
    onStoryComplete
}) => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [imgError, setImgError] = useState(false);
    const intervalRef = useRef(null);
    const imageRef = useRef(null);

    const currentUser = stories[currentUserIndex];
    const currentStory = currentUser?.stories[currentStoryIndex];

    useEffect(() => {
        setProgress(0);
        setIsLoading(true);
        setImgError(false);
    }, [currentUserIndex, currentStoryIndex]);

    useEffect(() => {
        if (!isLoading && !imgError) {
            intervalRef.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        onStoryComplete();
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
    }, [isLoading, imgError, onStoryComplete]);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsLoading(false);
        setImgError(true);
    };

    const handleNavClick = (direction) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (direction === 'prev') {
            onPrev();
        } else {
            onNext();
        }
    };

    if (!currentUser || !currentStory) return null;

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col slide-up">

            <div className="flex gap-1 p-4 pb-3">
                {currentUser.stories.map((_, index) => (
                    <ProgressBar
                        key={index}
                        isActive={index === currentStoryIndex}
                        progress={index === currentStoryIndex ? progress : index < currentStoryIndex ? 100 : 0}
                    />
                ))}
            </div>


            <div className="flex items-center px-4 pb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">
                        {currentUser.username.charAt(0).toUpperCase()}
                    </span>
                </div>
                <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{currentUser.username}</p>
                    <p className="text-white text-xs opacity-70">{currentStory.timestamp}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-white p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                >
                    <X size={20} />
                </button>
            </div>


            <div className="flex-1 relative flex items-center justify-center">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {imgError ? (
                    <div className="flex flex-col items-center justify-center text-white">
                        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                            <span className="text-4xl">📷</span>
                        </div>
                        <p className="text-lg font-semibold">Story Image</p>
                        <p className="text-sm opacity-70">Tap to continue</p>
                    </div>
                ) : (
                    <img
                        ref={imageRef}
                        src={currentStory.image}
                        alt="Story"
                        className="max-w-full max-h-full object-contain rounded-lg"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        style={{ opacity: isLoading ? 0 : 1 }}
                    />
                )}


                <div
                    className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer"
                    onClick={() => handleNavClick('prev')}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer"
                    onClick={() => handleNavClick('next')}
                />
            </div>
        </div>
    );
};

export default StoryViewer;