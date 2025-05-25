import { useState } from 'react';

const useStoryNavigation = (stories, onClose) => {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const nextStory = () => {
        const currentUser = stories[currentUserIndex];
        if (currentStoryIndex < currentUser.stories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
        } else {

            if (currentUserIndex < stories.length - 1) {
                setCurrentUserIndex(prev => prev + 1);
                setCurrentStoryIndex(0);
            } else {
                onClose();
            }
        }
    };

    const prevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
        } else {

            if (currentUserIndex > 0) {
                const prevUserIndex = currentUserIndex - 1;
                setCurrentUserIndex(prevUserIndex);
                setCurrentStoryIndex(stories[prevUserIndex].stories.length - 1);
            }
        }
    };

    const goToStory = (userIndex, storyIndex = 0) => {
        setCurrentUserIndex(userIndex);
        setCurrentStoryIndex(storyIndex);
    };

    return {
        currentUserIndex,
        currentStoryIndex,
        nextStory,
        prevStory,
        goToStory
    };
};

export default useStoryNavigation;