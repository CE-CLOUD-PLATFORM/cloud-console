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
const ModalGroupMemberDelete = (props: MemberFormProps) => {
  const { group_id } = useParams();
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();
  const deleteFn = useDeleteSubjectMember({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group_members',] });
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
          subject_id: group_id as string,
          member: data,
        });
      }
    } catch (error) {
      console.error(error);
    }
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

export default ModalGroupMemberDelete;
