import React, { useEffect, useState } from 'react';
import ModalCover from '../index';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import '../index.css';
import { Controller, useForm } from 'react-hook-form';
import { ISubjectCreate, Subject } from '@/modules/subject/types/subject';
import { useUserStore } from '@/modules/auth/store/auth';
import { FormProps } from '@/shared/interfaces/modal';
import { useCreateSubject } from '@/modules/subject/hook/use-create-subject';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useGetFlavors } from '@/modules/flavor/hook/use-get-flavors';
import ModalSubjectCreateForm from './form/create-subject-form';

interface FlavorSpec {
  max_instance: number;
  flavor_id: string;
}
const ModalSubjectCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const {user} = useUserStore()

  const { data: flavorsData } = useGetFlavors();
  const [formTab, setFormTab] = useState(0);
  return (
    <ModalCover isOpen={isOpen}>
      <Box className="modal-box" gap={2}>
        <Box>
          <Tabs
            value={formTab}
            onChange={(e, v) => {
              setFormTab(v);
            }}
          >
            <Tab label="Subject" />
            <Tab label="Quota" />
            <Tab label="Credit" />
          </Tabs>
          <Divider></Divider>
        </Box>

        {formTab === 0 && (
          <ModalSubjectCreateForm isOpen={isOpen} handleClose={handleClose} />
        )}
      </Box>
    </ModalCover>
  );
};

export default ModalSubjectCreate;
