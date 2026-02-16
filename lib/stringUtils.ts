/**
 * String utility functions for text manipulation and formatting
 */

/**
 * Generates initials from a full name.
 * Takes the first letter of each word and returns up to 2 characters in uppercase.
 * 
 * @param name - The full name to generate initials from
 * @returns The initials (max 2 characters) in uppercase
 * 
 * @example
 * getInitials("John Doe") // returns "JD"
 * getInitials("Jane") // returns "JA"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
