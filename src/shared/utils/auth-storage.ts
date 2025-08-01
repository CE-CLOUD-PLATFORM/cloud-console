/**
 * Utility functions for managing authentication-related storage
 * Handles remembering user preferences like domain selection
 */

const STORAGE_KEYS = {
    REMEMBER_DOMAIN: 'ce-cloud-remember-domain',
    LAST_DOMAIN: 'ce-cloud-last-domain',
} as const;

/**
 * Save domain preference to localStorage
 * @param domain - Selected domain value
 */
export const saveLastDomain = (domain: string): void => {
    try {
        if (domain && domain.trim()) {
            localStorage.setItem(STORAGE_KEYS.LAST_DOMAIN, domain.trim());
        }
    } catch (error) {
        console.warn('Failed to save domain preference:', error);
    }
};

/**
 * Get last used domain from localStorage
 * @returns Last used domain or default fallback
 */
export const getLastDomain = (): string => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.LAST_DOMAIN);
        return saved && saved.trim() ? saved.trim() : 'default';
    } catch (error) {
        console.warn('Failed to retrieve domain preference:', error);
        return 'default';
    }
};

/**
 * Clear stored domain preference
 */
export const clearLastDomain = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEYS.LAST_DOMAIN);
    } catch (error) {
        console.warn('Failed to clear domain preference:', error);
    }
};

/**
 * Check if we're in a browser environment
 * @returns true if localStorage is available
 */
export const isStorageAvailable = (): boolean => {
    try {
        return typeof localStorage !== 'undefined' && localStorage !== null;
    } catch {
        return false;
    }
};

/**
 * Clear all authentication-related storage
 */
export const clearAllAuthStorage = (): void => {
    if (!isStorageAvailable()) return;

    try {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        // Also clear remember me data
        localStorage.removeItem('ce-cloud-remember-me');
        localStorage.removeItem('ce-cloud-saved-credentials');
    } catch (error) {
        console.warn('Failed to clear auth storage:', error);
    }
};
