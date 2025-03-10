
import { useContext } from 'react';
import { SettingsContext } from '@/shared/contexts/settings-context';

export const useSettings = () => useContext(SettingsContext);
