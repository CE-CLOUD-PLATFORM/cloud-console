/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useDeleteInstance } from '@/modules/instance/hook/use-delete-instance';
import type { Instance } from '@/modules/instance/types/instance';
import type { FormProps } from '@/shared/interfaces/modal';
import { generateToastId, toastPatterns, toastPromise } from '@/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ModalDelete from '../base/modal-delete';
import '../index.css';
interface ModalFormProps extends FormProps {
  data?: Instance;
}
const formLabel = 'Instance';
const formId = `${formLabel}-delete-form`;
const ModalInstanceDelete = (props: ModalFormProps) => {
  const { group_id, subject_id } = useParams();
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();
  const deleteFn = useDeleteInstance({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['instances', group_id || subject_id],
      });
    },
    onError: (error) => {
      console.error('Delete instance error:', error);
    },
  });
  // eslint-disable-next-line prefer-const

  const onSubmit = async () => {
    try {
      if (data?.id) {
        // Close modal first
        handleClose();

        // Generate unique toast ID
        const toastId = generateToastId(
          'delete',
          'instance',
          data.name || data.id,
        );

        // Use toast promise pattern
        const deletePromise = deleteFn.mutateAsync({
          instance_id: data.id as string,
          subject_id: (group_id || subject_id) as string,
        });

        await toastPromise(deletePromise, toastPatterns.delete('Instance'), {
          id: toastId,
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
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

export default ModalInstanceDelete;
