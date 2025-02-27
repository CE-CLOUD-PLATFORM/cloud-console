import { useQuery } from '@tanstack/react-query';
import { getFlavors } from '../service';

export const useGetFlavors = () =>
  useQuery({
    queryKey: ['flavors'],
    queryFn: getFlavors,
    staleTime: 1000 * 60 * 3,
  
  });
