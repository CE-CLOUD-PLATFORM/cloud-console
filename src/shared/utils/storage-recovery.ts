/**
 * Enhanced error handling and recovery for authentication storage
 */

import { isStorageAvailable } from './auth-storage';

/**
 * Test if localStorage is working properly
 * @returns true if localStorage is functional
 */
export const testStorage = (): boolean => {
    if (!isStorageAvailable()) return false;

    try {
        const testKey = 'ce-cloud-storage-test';
        const testValue = 'test';

        localStorage.setItem(testKey, testValue);
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);

        return retrieved === testValue;
    } catch {
        return false;
    }
};

/**
 * Safely get item from localStorage with fallback
 * @param key - Storage key
 * @param fallback - Fallback value if retrieval fails
 * @returns Stored value or fallback
 */
export const safeGetItem = (key: string, fallback: string = ''): string => {
    if (!testStorage()) return fallback;

    try {
        return localStorage.getItem(key) || fallback;
    } catch {
        return fallback;
    }
};

/**
 * Safely set item to localStorage
 * @param key - Storage key
 * @param value - Value to store
 * @returns true if successful
 */
export const safeSetItem = (key: string, value: string): boolean => {
    if (!testStorage()) return false;

    try {
        localStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
};

/**
 * Safely remove item from localStorage
 * @param key - Storage key
 * @returns true if successful
 */
export const safeRemoveItem = (key: string): boolean => {
    if (!testStorage()) return false;

    try {
        localStorage.removeItem(key);
        return true;
    } catch {
        return false;
    }
};

/**
 * Check storage quota and clean up if needed
 */
export const cleanupStorage = (): void => {
    if (!testStorage()) return;

    try {
        // Get all CE Cloud related keys
        const ceKeys = Object.keys(localStorage).filter(key =>
            key.startsWith('ce-cloud-')
        );

        // If we have too many keys, remove oldest non-essential ones
        if (ceKeys.length > 10) {
            const nonEssential = ceKeys.filter(key =>
                !key.includes('remember-me') &&
                !key.includes('saved-credentials') &&
                !key.includes('last-domain')
            );

            nonEssential.forEach(key => {
                localStorage.removeItem(key);
            });
        }
    } catch (error) {
        console.warn('Storage cleanup failed:', error);
    }
};
