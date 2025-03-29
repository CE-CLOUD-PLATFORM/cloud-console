/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import React, { useState } from 'react';
import ModalCover from '../index';

import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
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
import type { FormProps } from '@/shared/interfaces/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useGetDomainUsers } from '@/modules/user/hook/use-get-domain-users';
import { useGetSubjectMembers } from '@/modules/subject/hook/use-get-members';
import type { IMemberSubjectAdd, Member } from '@/modules/user/types/member';
import type { User } from '@/modules/user/types/user';
import AlignBottom01 from '@untitled-ui/icons-react/build/esm/AlignBottom01';
import XClose from '@untitled-ui/icons-react/build/esm/X';
import { Scrollbar } from '../../scrollbar';
import { useGetRoles } from '@/modules/roles/hook/use-get-role-list';
const groupFormId = 'subject-member-add-form';

const ModalAddSubjectMember = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { data: allUser } = useGetDomainUsers({
    domain_id: user?.info.domain.id as string,
  });
  const { data: rolesData } = useGetRoles();
  const { data: subjectMembers } = useGetSubjectMembers({
    subject_id: subject_id as string,
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
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
      const {members} = getValues();

      setValue('members', [...members, { ...newValue, role: 'test' }]);
    }
    setSearchValue(null);
  };
  const handleDelete = (id: string) => {
    const {members} = getValues();

    setValue(
      'members',
      members.filter((member) => member.id != id),
    );
  };
  return (
    <ModalCover handleOnClose={handleClose} isOpen={isOpen}>
      <Box className="modal-box !h-[80%] overflow-hidden" gap={2}>
        <Typography variant="h5">Add Member</Typography>
        <Box
          component="form"
          id={groupFormId}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          className="flex-1 overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={1} display={'flex'} direction={'row'}>
            <Autocomplete
              sx={{}}
              className="flex-grow"
              options={
                allUser?.users.filter((user) => {
                  const members = watch('members').map((mem) => mem.id);
                  return !members.includes(user.id);
                }) || []
              }
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
            className="mt-2 flex-1 overflow-y-scroll"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.100',
            }}
          >
            <Scrollbar className="flex-1">
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
                      align="center"
                      sx={{
                        whiteSpace: 'nowrap',
                        width: '1%',
                        paddingInline: '40px',
                      }}
                    >
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(watch('members') as Member[])?.map((member) => (
                    <TableRow
                      sx={{
                        height: 20,
                        maxHeight: 20,
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
                        <Select
                          sx={{
                            height: 30,
                          }}
                          value={member.role}
                        >
                          <MenuItem value={member.role}>{member.role}</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ whiteSpace: 'nowrap', width: '1%' }}
                      >
                        <IconButton
                          onClick={() => handleDelete(member.id)}
                          sx={{
                            p: 0,
                          }}
                        >
                          <SvgIcon>
                            <XClose />
                          </SvgIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
            <Divider />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              marginTop: 2,
              flexShrink: 0,
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="inherit"
              onClick={() => {
                reset();
                handleClose();
              }}
            >
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
