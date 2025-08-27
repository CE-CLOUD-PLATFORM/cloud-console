/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useDeleteSubject } from '@/modules/subject/hook/use-delete-subject';
import type { Subject } from '@/modules/subject/types/subject';
import type { FormProps } from '@/shared/interfaces/modal';
import {
  formatSubjectName,
  generateToastId,
  toastPatterns,
  toastPromise,
} from '@/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import ModalDelete from '../base/modal-delete';
import '../index.css';
import toast from 'react-hot-toast';
interface ModalDeleteFormProps extends FormProps {
  data?: Subject;
}
const formLabel = 'Subject';
const form_id = `${formLabel}-delete-form`;
const ModalSubjectDelete = (props: ModalDeleteFormProps) => {
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();

  const deleteFn = useDeleteSubject({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
    },
    onError: (error) => {
      toast.error('Delete subject error');
    },
  });

  const onSubmit = async () => {
    try {
      if (!data?.id) {
        return;
      }

      // Close modal first
      handleClose();

      // Generate unique toast ID
      const toastId = generateToastId('delete', 'subject', data.id);

      // Use toast promise pattern
      const deletePromise = deleteFn.mutateAsync(data);

      await toastPromise(deletePromise, toastPatterns.delete(formLabel), {
        id: toastId,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  return (
    <ModalDelete
      formId={form_id}
      formLabel={formLabel}
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={onSubmit}
      data={data?.name ? formatSubjectName(data.name) : ''}
      key={data?.id}
    />
  );
};

export default ModalSubjectDelete;
