/* eslint-disable @typescript-eslint/no-use-before-define */

import type { FormProps } from '@/shared/interfaces/modal';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteGroup } from '@/modules/group/hook/use-delete-group';
import type { Group } from '@/modules/group/types/group';
import toast from 'react-hot-toast';
import ModalDelete from '../base/modal-delete';
import '../index.css';
interface ModalDeleteFormProps extends FormProps {
  data?: Group;
}
const formLabel = 'Group';
const form_id = `${formLabel}-delete-form`;
const ModalGroupDelete = (props: ModalDeleteFormProps) => {
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();
  const deleteFn = useDeleteGroup({
    onSuccess: () => {
      toast.success(`${formLabel} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: () => {
      toast.error(`Fail to delete ${formLabel}.`);
    },
    onMutate: () => {
      handleClose();
      toast.loading('Deleting...');
    },
  });

  const onSubmit = async () => {
    try {
      if (data?.id) {
        deleteFn.mutate(data);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
    } catch (error) {}
  };

  return (
    <ModalDelete
      formId={form_id}
      formLabel={formLabel}
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={onSubmit}
      data={data?.name}
      key={data?.id}
    />
  );
};

export default ModalGroupDelete;
