/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetFlavors } from '@/modules/flavor/hook/use-get-flavors';
import type { FormProps } from '@/shared/interfaces/modal';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ModalCover from '../index';
import '../index.css';
import ModalQuotaRequestForm from './form/request-quota-form';
import ModalSubjectCreateForm from './form/create-subject-form';

interface FlavorSpec {
  max_instance: number;
  flavor_id: string;
}
const ModalSubjectCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { admin } = useUserStore();

  const { data: flavorsData } = useGetFlavors();
  const [formTab, setFormTab] = useState(0);
  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box" gap={2}>
        <Box>
          <Tabs
            value={formTab}
            onChange={(e, v) => {
              setFormTab(v);
            }}
          >
            {admin && <Tab label="Subject" />}
            <Tab label="Quota" />
            {/* <Tab label="Credit" /> */}
          </Tabs>
          <Divider></Divider>
        </Box>

        {admin && formTab === 0 && (
          <ModalSubjectCreateForm isOpen={isOpen} handleClose={handleClose} />
        )}
        {((admin && formTab === 1) || (!admin && formTab === 0)) && (
          <ModalQuotaRequestForm isOpen={isOpen} handleClose={handleClose} />
        )}
        {/* {formTab === 2 && (
          <ModalCreditRequestForm isOpen={isOpen} handleClose={handleClose} />
        )} */}

        {/* {formTab === 0 && (
          <ModalQuotaRequestForm isOpen={isOpen} handleClose={handleClose} />
        )}
        {formTab === 1 && (
          <ModalCreditRequestForm isOpen={isOpen} handleClose={handleClose} />
        )} */}
      </Box>
    </ModalCover>
  );
};

export default ModalSubjectCreate;
