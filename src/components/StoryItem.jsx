import { useState } from 'react';

const StoryItem = ({ user, onClick }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="flex-shrink-0 text-center cursor-pointer transform transition-transform duration-200 active:scale-95"
            onClick={onClick}
        >
            <div className="relative">
                {imgError ? (
                    <div className="w-16 h-16 rounded-full border-3 border-white bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
                        <span className="text-white font-bold text-lg">
                            {user.username.charAt(0).toUpperCase()}
                        </span>
                    </div>
                ) : (
                    <img
                        src={user.avatar}
                        alt={user.username}
                        onError={() => setImgError(true)}
                        className="w-16 h-16 rounded-full border-3 border-white object-cover mb-2 transition-transform duration-300 hover:scale-105"
                    />
                )}
            </div>
            <p className="text-white text-xs font-medium max-w-16 truncate">
                {user.username}
            </p>
        </div>
    );
};

export default StoryItem;