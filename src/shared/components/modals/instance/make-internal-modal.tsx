/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import type { FormProps } from '@/shared/interfaces/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import ModalDelete from '../base/modal-delete';
import '../index.css';
import type { Instance } from '@/modules/instance/types/instance';
import { useMakeInternal } from '@/modules/instance/hook/use-make-internal';
interface ModalFormProps extends FormProps {
  data?: Instance;
}
const formLabel = 'Domain name';
const formId = `${formLabel}-delete-form`;
const ModalMakeInternal = (props: ModalFormProps) => {
  const { group_id, subject_id } = useParams();
  const { isOpen, handleClose, data } = props;
  const queryClient = useQueryClient();
  const deleteFn = useMakeInternal({
    onSuccess: () => {
      toast.success(`${formLabel} deleted successfully`);
      queryClient.invalidateQueries({
        queryKey: ['instances', group_id || subject_id],
      });
    },
    onError: (err) => {
      toast.error(`Fail to delete ${formLabel}.`);
    },
    onMutate: () => {
      handleClose();
      toast.loading('Deleting...');
    },
  });
  // eslint-disable-next-line prefer-const

  const onSubmit = async () => {
    try {
      if (data?.id) {
        deleteFn.mutate({
          instance_id: data.id as string,
          subject_id: (group_id || subject_id) as string,
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
      data={data?.metadata.domain_name}
      onSubmit={onSubmit}
    />
  );
};

export default ModalMakeInternal;
