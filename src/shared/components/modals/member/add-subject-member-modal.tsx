import React, { SyntheticEvent, useEffect, useState } from 'react';
import ModalCover from '../index';

import {
  Autocomplete,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import '../index.css';
import { useForm } from 'react-hook-form';
import { useUserStore } from '@/modules/auth/store/auth';
import { FormProps } from '@/shared/interfaces/modal';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { PublicKey } from '@/modules/config/types/public-key';
import { useCreateInstance } from '@/modules/instance/hook/use-create-instance';
import { useGetDomainUsers } from '@/modules/user/hook/use-get-domain-users';
import { useGetSubjectMembers } from '@/modules/subject/hook/use-get-members';
import { IMemberSubjectAdd, Member } from '@/modules/user/types/member';
import { User } from '@/modules/user/types/user';
import AlignBottom01 from '@untitled-ui/icons-react/build/esm/AlignBottom01';
import { Scrollbar } from '../../scrollbar';
const groupFormId = 'subject-member-add-form';

const ModalAddSubjectMember = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { data: allUser } = useGetDomainUsers({
    domain_id: user?.info.domain.id as string,
  });

  const { data: subjectMembers } = useGetSubjectMembers({
    subject_id: subject_id as string,
  });

  const createInstance = useCreateInstance({
    onSuccess: () => {
      toast.success('Instance created successfully');
      queryClient.invalidateQueries({ queryKey: ['subject-members'] });
      reset();
      handleClose();
    },
    onError: () => {
      toast.error('Fail to create Instance.');
    },
    onMutate: () => {
      toast.loading('Creating...');
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<IMemberSubjectAdd>({
    defaultValues: {
      members: [],
    },
  });

  const onSubmit = async (data: IMemberSubjectAdd) => {
    try {
    } catch (error) {}
  };
  const [searchValue, setSearchValue] = useState<User | null>(null);

  const handleSelect = (event: React.SyntheticEvent, newValue: User | null) => {
    if (newValue) {
      console.log('Selected User:', newValue);
      setValue('members', [
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
        {
          id: '1',
          name: '1564165',
          role: '5',
        },
      ]);
    }
    setSearchValue(null);
  };

  return (
    <ModalCover isOpen={isOpen}>
      <Box className="modal-box !h-[80%] md:!min-w-[75%] overflow-hidden" gap={2}>
        <Typography variant="h5">Add Member</Typography>
        <Box
          component="form"
          id={groupFormId}
          display="flex"
          flexDirection="column"
          justifyContent="space-between h-[30%]"
          className="flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={1} display={'flex'} direction={'row'}>
            <Autocomplete
              sx={{}}
              className="flex-grow"
              options={allUser?.users || []}
              getOptionLabel={(option) => option.name}
              value={searchValue}
              onChange={handleSelect}
              renderInput={(params) => (
                <TextField {...params} label="Search User" />
              )}
            />
            <Button
              onClick={() => {}}
              startIcon={
                <SvgIcon>
                  <AlignBottom01 />
                </SvgIcon>
              }
              variant="contained"
            >
              Import
            </Button>
          </Stack>
          <Box
            className="mt-2 flex-1  h-[20%] "
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
            }}
          >
            <Scrollbar className="flex-1   overflow-y-scroll">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ paddingInline: '40px' }}>Name</TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        whiteSpace: 'nowrap',
                        width: '1%',
                        paddingInline: '40px',
                      }}
                    >
                      ROLE
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        whiteSpace: 'nowrap',
                        width: '1%',
                        paddingInline: '40px',
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(watch('members') as Member[])?.map((member) => (
                    <TableRow
                      sx={{
                        height: '20px',
                      }}
                      hover
                      key={member.id}
                      className="bg-white"
                    >
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Typography variant="body1">{member.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ whiteSpace: 'nowrap', width: '1%' }}
                      >
                        {member.role}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ whiteSpace: 'nowrap', width: '1%' }}
                      >
                        <IconButton>
                          <SvgIcon>{/* <Edit02Icon /> */}</SvgIcon>
                        </IconButton>
                        <IconButton>
                          <SvgIcon>{/* <ArrowRightIcon /> */}</SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              marginTop: 2,
              flexShrink:0,
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button
              sx={{ ml: 1 }}
              type="submit"
              variant="contained"
              form={groupFormId}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalCover>
  );
};

export default ModalAddSubjectMember;
