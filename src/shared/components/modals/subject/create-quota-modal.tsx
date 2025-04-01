/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import type { FormProps } from '@/shared/interfaces/modal';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ModalCover from '../index';
import '../index.css';
import ModalQuotaRequestForm from './form/request-quota-form';


const ModalQuotaCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;

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
            {/* <Tab label="Subject" /> */}
            <Tab label="Quota" />
            {/* <Tab label="Credit" /> */}
          </Tabs>
          <Divider></Divider>
        </Box>

        {formTab === 0 && (
          <ModalQuotaRequestForm isOpen={isOpen} handleClose={handleClose} />
        )}
      </Box>
    </ModalCover>
  );
};

export default ModalQuotaCreate;
