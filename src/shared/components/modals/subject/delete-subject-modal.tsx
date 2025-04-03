/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useDeleteSubject } from '@/modules/subject/hook/use-delete-subject';
import type { Subject } from '@/modules/subject/types/subject';
import type { FormProps } from '@/shared/interfaces/modal';
import { useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import ModalDelete from '../base/modal-delete';
import '../index.css';
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
      toast.success(`${formLabel} deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['subjects'] });
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
    //   <Box className="modal-box !min-h-[auto]" gap={3}>
    //     <Box className="hidden-scrollbar flex-1 space-y-2 overflow-y-auto">
    //       <Typography variant="h5">Confirm Delete {formLabel}</Typography>
    //       <Box
    //         component="form"
    //         id={form_id}
    //         display="flex"
    //         flexDirection="column"
    //         justifyContent="space-between"
    //         className="flex-1 p-1"
    //       >
    //         <Stack
    //           display={'flex'}
    //           flexDirection={'row'}
    //           alignItems={'center'}
    //           px={3}
    //           gap={1}
    //         >
    //           <Typography fontWeight={600} variant="body1">
    //             {formLabel}:
    //           </Typography>
    //           <Typography fontWeight={400}>{data?.name}</Typography>
    //         </Stack>
    //         <Divider
    //           sx={{
    //             height: '2px',
    //             mt: 2,
    //           }}
    //         />
    //         <Box
    //           sx={{
    //             alignItems: 'center',
    //             display: 'flex',
    //             marginTop: 2,
    //           }}
    //         >
    //           <Box sx={{ flexGrow: 1 }} />
    //           <Button variant="outlined" onClick={handleCloseBtn}>
    //             Cancel
    //           </Button>
    //           <Button
    //             sx={{ ml: 1 }}
    //             // type="submit"
    //             // form={form_id}
    //             variant="contained"
    //             color="error"
    //             onClick={onSubmit}
    //           >
    //             Confirm
    //           </Button>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>
    // </ModalCover>
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

export default ModalSubjectDelete;
