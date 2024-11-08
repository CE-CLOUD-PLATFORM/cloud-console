import { useQuery } from '@tanstack/react-query';
import { getSubject, getSubjects } from '../service';
import { ISubjectsReqParam, ISubjectReqParam } from '../types/subject';

// type Props = {
//   user_id?: string;
// };

export const useGetSubjects = ({ user_id }: ISubjectsReqParam) =>
  useQuery({
    queryKey: user_id ? ['subjects', user_id] : ['subjects'],
    queryFn: getSubjects,
    enabled: !!user_id,
  });


  export const useGetSubject = ({ subject_id,domain_name }: ISubjectReqParam) =>
    useQuery({
      queryKey:  ['subject', subject_id,domain_name],
      queryFn: getSubject,
      // enabled: ,
    });
  