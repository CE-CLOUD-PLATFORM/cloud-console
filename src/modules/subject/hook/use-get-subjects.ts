import { useQuery } from '@tanstack/react-query';
import { getSubjects } from '../service';

type Props = {
  user_id?: string;
};

export const useGetSubjects = ({ user_id }: Props) =>
  useQuery({
    queryKey: user_id ? ['subjects', user_id] : ['subjects'],
    queryFn: getSubjects,
    enabled: !!user_id,
  });
