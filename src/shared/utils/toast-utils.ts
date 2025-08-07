/**
 * Utility functions for standardized toast handling with IDs and promise patterns
 */

import toast from 'react-hot-toast';

interface ToastPromiseOptions {
    loading: string;
    success: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: string | ((_error: any) => string);
}

interface ToastConfig {
    id?: string;
    duration?: number;
    position?: 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right';
}

/**
 * Enhanced toast.promise with standardized ID generation
 * @param promise - Promise to handle
 * @param messages - Toast messages for each state
 * @param config - Toast configuration
 */
export const toastPromise = <T>(
    promise: Promise<T>,
    messages: ToastPromiseOptions,
    config: ToastConfig = {}
): Promise<T> => {
    const defaultConfig: ToastConfig = {
        duration: 4000,
        position: 'top-center',
        ...config,
    };

    return toast.promise(promise, messages, defaultConfig);
};

/**
 * Generate unique toast ID for CRUD operations
 * @param operation - Type of operation (create, read, update, delete)
 * @param entityType - Type of entity (subject, group, instance, etc.)
 * @param entityId - ID of the entity (optional)
 */
export const generateToastId = (
    operation: 'create' | 'read' | 'update' | 'delete',
    entityType: string,
    entityId?: string
): string => {
    const timestamp = Date.now();
    const id = entityId ? `-${entityId}` : '';
    return `${operation}-${entityType}${id}-${timestamp}`;
};

/**
 * Standard toast patterns for CRUD operations
 */
export const toastPatterns = {
    delete: (entityType: string) => ({
        loading: `Deleting ${entityType}...`,
        success: `${entityType} deleted successfully`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
            console.error(`Delete ${entityType} error:`, error);
            return `Failed to delete ${entityType}`;
        },
    }),

    create: (entityType: string) => ({
        loading: `Creating ${entityType}...`,
        success: `${entityType} created successfully`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
            console.error(`Create ${entityType} error:`, error);
            return `Failed to create ${entityType}`;
        },
    }),

    update: (entityType: string) => ({
        loading: `Updating ${entityType}...`,
        success: `${entityType} updated successfully`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
            console.error(`Update ${entityType} error:`, error);
            return `Failed to update ${entityType}`;
        },
    }),

    login: {
        loading: 'Signing in...',
        success: 'Login successful',
        error: 'Login failed',
    },

    action: (actionName: string, entityType?: string) => ({
        loading: `${actionName}${entityType ? ` ${entityType}` : ''}...`,
        success: `${actionName} successful`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
            console.error(`${actionName} error:`, error);
            return `${actionName} failed`;
        },
    }),
};

/**
 * Manual toast with ID (for cases where promise pattern isn't suitable)
 */
export const toastWithId = {
    loading: (message: string, id: string) =>
        toast.loading(message, { id }),

    success: (message: string, id: string) =>
        toast.success(message, { id }),

    error: (message: string, id: string) =>
        toast.error(message, { id }),
};
