/**
 * Utility functions for formatting display names and text
 */

/**
 * Format subject name by removing timestamp suffix
 * Example: "Project-2568-20250718082101" -> "Project-2568"
 * @param subjectName - Original subject name
 * @returns Formatted subject name
 */
export const formatSubjectName = (subjectName: string): string => {
    if (!subjectName) return '';

    // Split by dash and remove the last part if it looks like a timestamp
    const parts = subjectName.split('-');

    // If last part is 14 digits (timestamp format: YYYYMMDDHHMMSS), remove it
    if (parts.length > 1) {
        const lastPart = parts[parts.length - 1];
        if (/^\d{14}$/.test(lastPart)) {
            return parts.slice(0, -1).join('-');
        }
    }

    return subjectName;
};

/**
 * Format display name with length limit
 * @param name - Original name
 * @param maxLength - Maximum length (default: 50)
 * @returns Truncated name with ellipsis if needed
 */
export const formatDisplayName = (name: string, maxLength: number = 50): string => {
    if (!name) return '';

    if (name.length <= maxLength) {
        return name;
    }

    return `${name.substring(0, maxLength - 3)}...`;
};

/**
 * Format entity name for display (combines subject formatting and length limit)
 * @param entityName - Original entity name
 * @param maxLength - Maximum length (default: 50)
 * @returns Formatted entity name
 */
export const formatEntityName = (entityName: string, maxLength: number = 50): string => {
    const formatted = formatSubjectName(entityName);
    return formatDisplayName(formatted, maxLength);
};

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalizeWords = (text: string): string => {
    if (!text) return '';

    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

/**
 * Format timestamp for display
 * @param timestamp - ISO timestamp string
 * @returns Formatted date string
 */
export const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return '';

    try {
        const date = new Date(timestamp);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return timestamp;
    }
};
