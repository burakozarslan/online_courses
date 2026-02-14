/**
 * Course utility functions for formatting and calculating course-related data
 */

/**
 * Formats duration from seconds to hours and minutes
 * @param totalSeconds - Total duration in seconds
 * @returns Formatted string like "2h 30m" or "45m"
 */
export function formatDurationFromSeconds(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Formats duration from minutes to hours and minutes
 * @param totalMinutes - Total duration in minutes
 * @returns Formatted string like "2h 30m"
 */
export function formatDurationFromMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

/**
 * Calculates total duration in seconds from an array of lessons
 * @param lessons - Array of lessons with duration property
 * @returns Total duration in seconds
 */
export function calculateModuleDurationInSeconds(
  lessons: { duration: number }[]
): number {
  return lessons.reduce((prev, current) => prev + current.duration, 0);
}

/**
 * Calculates and formats total course duration from modules
 * @param modules - Array of modules containing lessons
 * @returns Formatted duration string like "10h 45m"
 */
export function calculateFormattedCourseDuration(
  modules: { lessons: { duration: number }[] }[]
): string {
  const totalDurationInSeconds = modules.reduce(
    (prev, current) =>
      prev + calculateModuleDurationInSeconds(current.lessons),
    0
  );
  return formatDurationFromSeconds(totalDurationInSeconds);
}

/**
 * Formats course difficulty level to readable string
 * @param difficulty - Difficulty level (BEGINNER, INTERMEDIATE, ADVANCED)
 * @returns Formatted difficulty string
 */
export function formatCourseDifficulty(difficulty: string): string {
  if (difficulty === "BEGINNER") return "Beginner";
  if (difficulty === "INTERMEDIATE") return "Intermediate";
  return "Advanced";
}

/**
 * Gets the first category name or returns "General" as default
 * @param categories - Array of category objects
 * @returns Category name or "General"
 */
export function getCategoryName(categories: { name: string }[]): string {
  if (categories.length === 0) return "General";
  return categories[0].name;
}
