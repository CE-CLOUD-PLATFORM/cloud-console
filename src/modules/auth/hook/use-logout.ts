import { removeSession } from '@/shared/utils';

export const useLogout = () => {
    removeSession();
};
