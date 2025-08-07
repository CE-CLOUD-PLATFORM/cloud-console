/**
 * Simple encryption/decryption utilities for sensitive data
 * Note: This is basic obfuscation, not cryptographically secure
 * For production, consider using more robust encryption
 */

const SECRET_KEY = 'ce-cloud-platform-2025';

/**
 * Simple XOR encryption for basic data obfuscation
 * @param text - Text to encrypt
 * @param key - Encryption key
 * @returns Encrypted string
 */
const xorEncrypt = (text: string, key: string): string => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(
            text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
    }
    return btoa(result); // Base64 encode
};

/**
 * Simple XOR decryption for basic data obfuscation
 * @param encryptedText - Encrypted text to decrypt
 * @param key - Decryption key
 * @returns Decrypted string
 */
const xorDecrypt = (encryptedText: string, key: string): string => {
    try {
        const decoded = atob(encryptedText); // Base64 decode
        let result = '';
        for (let i = 0; i < decoded.length; i++) {
            result += String.fromCharCode(
                decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return result;
    } catch {
        return '';
    }
};

/**
 * Encrypt sensitive data before storing
 * @param data - Data to encrypt
 * @returns Encrypted string
 */
export const encryptData = (data: string): string => {
    try {
        return xorEncrypt(data, SECRET_KEY);
    } catch (error) {
        console.warn('Failed to encrypt data:', error);
        return data; // Fallback to unencrypted
    }
};

/**
 * Decrypt sensitive data after retrieving
 * @param encryptedData - Encrypted data to decrypt
 * @returns Decrypted string
 */
export const decryptData = (encryptedData: string): string => {
    try {
        return xorDecrypt(encryptedData, SECRET_KEY);
    } catch (error) {
        console.warn('Failed to decrypt data:', error);
        return ''; // Return empty on error
    }
};

/**
 * Check if data is encrypted (basic check)
 * @param data - Data to check
 * @returns true if data appears to be encrypted
 */
export const isEncrypted = (data: string): boolean => {
    try {
        // Try to decode as base64 and check if it's different from original
        atob(data);
        return data !== btoa(atob(data));
    } catch {
        return false;
    }
};
