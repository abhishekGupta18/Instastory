// Story configuration constants
export const STORY_DURATION = 5000; // 5 seconds
export const PROGRESS_INTERVAL = 100; // 100ms
export const PROGRESS_INCREMENT = 2; // 2% per interval

// Animation durations
export const SLIDE_ANIMATION_DURATION = 300; // 0.3s
export const FADE_ANIMATION_DURATION = 300; // 0.3s

// Image dimensions
export const AVATAR_SIZE = 64; // 16 * 4 (w-16)
export const STORY_IMAGE_MAX_WIDTH = 400;
export const STORY_IMAGE_MAX_HEIGHT = 700;

// Navigation zones
export const NAV_ZONE_WIDTH_PERCENT = 50; // 50% of screen width

// Colors
export const GRADIENT_COLORS = {
  primary: "from-purple-600 via-pink-600 to-blue-600",
  avatar: "from-purple-500 to-pink-500",
};

// Z-index layers
export const Z_INDEX = {
  storyViewer: 50,
  navigation: 10,
  progressBars: 10,
  header: 10,
};
