import { removeSession } from '@/shared/utils';
import { isStorageAvailable } from '@/shared/utils/auth-storage';

/**
 * Enhanced logout hook that clears session and optionally saved credentials
 * @param clearRememberedData - Whether to clear saved login data on logout
 */
export const useLogout = (clearRememberedData: boolean = false) => {
    const logout = () => {
        removeSession();

        // Optionally clear saved credentials
        if (clearRememberedData && isStorageAvailable()) {
            try {
                localStorage.removeItem('ce-cloud-remember-me');
                localStorage.removeItem('ce-cloud-saved-credentials');
                localStorage.removeItem('ce-cloud-last-domain');
            } catch (error) {
                console.warn('Failed to clear saved data on logout:', error);
            }
        }
    };

    return { logout };
};
