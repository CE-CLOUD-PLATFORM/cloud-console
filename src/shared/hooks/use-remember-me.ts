import type { IAuthLogin } from '@/modules/auth/types/auth';
import { decryptData, encryptData } from '@/shared/utils/encryption';
import { safeGetItem, safeRemoveItem, safeSetItem, testStorage } from '@/shared/utils/storage-recovery';
import { useEffect, useState } from 'react';

const REMEMBER_ME_KEY = 'ce-cloud-remember-me';
const SAVED_CREDENTIALS_KEY = 'ce-cloud-saved-credentials';

interface SavedCredentials {
    username: string;
    domain: string;
    rememberMe: boolean;
}

/**
 * Hook for managing remember me functionality
 * Handles saving and loading user credentials with encryption
 */
export const useRememberMe = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const [savedCredentials, setSavedCredentials] = useState<SavedCredentials | null>(null);

    // Load saved credentials on mount
    useEffect(() => {
        if (testStorage()) {
            try {
                const encryptedData = safeGetItem(SAVED_CREDENTIALS_KEY);
                const shouldRemember = safeGetItem(REMEMBER_ME_KEY) === 'true';

                if (encryptedData && shouldRemember) {
                    const decryptedData = decryptData(encryptedData);
                    if (decryptedData) {
                        const credentials = JSON.parse(decryptedData) as SavedCredentials;
                        // Validate credentials before using
                        if (credentials.username && credentials.domain) {
                            setSavedCredentials(credentials);
                            setRememberMe(true);
                        }
                    }
                }
            } catch (error) {
                console.warn('Failed to load saved credentials:', error);
                // Clear corrupted data
                safeRemoveItem(SAVED_CREDENTIALS_KEY);
                safeRemoveItem(REMEMBER_ME_KEY);
            }
        }
    }, []);

    /**
     * Save credentials if remember me is enabled
     * Only saves username and domain, never passwords
     */
    const saveCredentials = (loginData: IAuthLogin, remember: boolean) => {
        if (!testStorage()) return;

        try {
            if (remember) {
                // Only save non-sensitive data
                const credentials: SavedCredentials = {
                    username: loginData.username.trim(),
                    domain: loginData.domain,
                    rememberMe: true,
                };

                // Validate data before saving
                if (credentials.username && credentials.domain) {
                    const encryptedData = encryptData(JSON.stringify(credentials));
                    const saved = safeSetItem(SAVED_CREDENTIALS_KEY, encryptedData) &&
                        safeSetItem(REMEMBER_ME_KEY, 'true');

                    if (!saved) {
                        console.warn('Failed to save credentials to storage');
                    }
                }
            } else {
                // Clear saved credentials if remember me is disabled
                safeRemoveItem(SAVED_CREDENTIALS_KEY);
                safeRemoveItem(REMEMBER_ME_KEY);
            }
        } catch (error) {
            console.warn('Failed to save credentials:', error);
        }
    };

    /**
     * Clear all saved credentials
     */
    const clearCredentials = () => {
        if (!testStorage()) return;

        try {
            safeRemoveItem(SAVED_CREDENTIALS_KEY);
            safeRemoveItem(REMEMBER_ME_KEY);
            setSavedCredentials(null);
            setRememberMe(false);
        } catch (error) {
            console.warn('Failed to clear credentials:', error);
        }
    };

    return {
        rememberMe,
        setRememberMe,
        savedCredentials,
        saveCredentials,
        clearCredentials,
    };
};
