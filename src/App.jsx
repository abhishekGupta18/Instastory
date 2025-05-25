import React, { useState } from 'react';
import StoriesList from './components/StoriesList';
import StoryViewer from './components/StoryViewer';
import { storiesData } from './data/stories';

function App() {
  const [stories] = useState(storiesData);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openStoryViewer = (userIndex) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  const nextStory = () => {
    const currentUser = stories[currentUserIndex];
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {

      if (currentUserIndex < stories.length - 1) {
        setCurrentUserIndex(prev => prev + 1);
        setCurrentStoryIndex(0);
      } else {
        closeViewer();
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

  const handleStoryComplete = () => {
    nextStory();
  };

  return (
    <div className="min-h-screen bg-black">

      <StoriesList
        stories={stories}
        onStoryClick={openStoryViewer}
      />


      <div className="p-6 text-center">
        <h2 className="text-white text-xl font-bold mb-4">Instagram Stories Demo</h2>
        <p className="text-gray-400 text-sm">
          Tap on any story above to start viewing. Stories auto-advance every 5 seconds.
          <br />
          Tap left/right sides to navigate manually.
        </p>
      </div>


      {isViewerOpen && (
        <StoryViewer
          currentUserIndex={currentUserIndex}
          currentStoryIndex={currentStoryIndex}
          stories={stories}
          onClose={closeViewer}
          onNext={nextStory}
          onPrev={prevStory}
          onStoryComplete={handleStoryComplete}
        />
      )}
    </div>
  );
}

export default App;