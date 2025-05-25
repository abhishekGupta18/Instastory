import React from 'react';

const ProgressBar = ({ isActive, progress }) => (
    <div className="flex-1 h-0.5 bg-white bg-opacity-30 rounded-full overflow-hidden">
        <div
            className="h-full bg-[#9855bb] rounded-full transition-all duration-100 ease-linear"
            style={{ width: isActive ? `${progress}%` : '0%' }}
        />
    </div>
);

export default ProgressBar;