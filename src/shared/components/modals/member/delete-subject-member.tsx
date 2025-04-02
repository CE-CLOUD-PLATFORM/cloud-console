/* eslint-disable @typescript-eslint/no-use-before-define */
import { useDeleteSubjectMember } from '@/modules/subject/hook/use-delete-subject-member';
import type { IMemberSubjectDel, Member } from '@/modules/user/types/member';
import type { FormProps } from '@/shared/interfaces/modal';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ModalCover from '../index';
import '../index.css';
import ModalDelete from '../base/modal-delete';
interface MemberFormProps extends FormProps {
  data?: Member;
}
const formLabel = 'Member';
const formId = `${formLabel}-delete-form`;
const ModalConfirmDeleteMember = (props: MemberFormProps) => {
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

export default ModalConfirmDeleteMember;
