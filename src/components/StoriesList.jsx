
import StoryItem from "./StoryItem";

const StoriesList = ({ stories, onStoryClick }) => {
    return (
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-6">
            <div className="flex overflow-x-auto px-4 gap-4 hide-scrollbar">
                {stories.map((user, index) => (
                    <StoryItem
                        key={user.id}
                        user={user}
                        onClick={() => onStoryClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StoriesList;