/* eslint-disable @typescript-eslint/no-use-before-define */
import { useDeleteSubjectMember } from '@/modules/subject/hook/use-delete-subject-member';
import type { Member } from '@/modules/user/types/member';
import type { FormProps } from '@/shared/interfaces/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import ModalDelete from '../base/modal-delete';
import '../index.css';
interface MemberFormProps extends FormProps {
  data?: Member;
}
const formLabel = 'Member';
const formId = `${formLabel}-delete-form`;
const ModalSubjectMemberDelete = (props: MemberFormProps) => {
  const { subject_id } = useParams();
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();
  const deleteFn = useDeleteSubjectMember({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subject_members'] });
      toast.success('Deleted member successfully.');
    },
    onMutate: () => {
      handleClose();
      toast.loading('Deleting member...');
    },
    onError: () => {
      toast.error('Fail to delete member, try again.');
    },
  });
  // eslint-disable-next-line prefer-const

  const onSubmit = async () => {
    try {
      if (data?.id) {
        deleteFn.mutate({
          subject_id: subject_id as string,
          member: data,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    } catch (error) {}
  };

  return (
    <ModalDelete
      formId={formId}
      formLabel={formLabel}
      isOpen={isOpen}
      handleClose={handleClose}
      data={data?.name}
      onSubmit={onSubmit}
    />
  );
};

export default ModalSubjectMemberDelete;
