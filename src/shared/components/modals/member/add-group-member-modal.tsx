/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
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
import { useGetSubjectMembers } from '@/modules/subject/hook/use-get-members';
import type { IMemberSubjectAdd, Member } from '@/modules/user/types/member';
import type { User } from '@/modules/user/types/user';
import XClose from '@untitled-ui/icons-react/build/esm/X';
import { Scrollbar } from '../../scrollbar';
import { useGetRoles } from '@/modules/roles/hook/use-get-role-list';
import Papa from 'papaparse';
import { toast } from 'react-hot-toast';
import { useAddSubjectMember } from '@/modules/subject/hook/use-add-subject-member';
import { CsvDownloadBtn } from '../../button/csv-download';
import { Upload02 } from '@untitled-ui/icons-react';

const groupFormId = 'group-member-add-form';

const ModalAddSubjectMember = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { subject_id, group_id } = useParams();
  const { user } = useUserStore();
  const addMember = useAddSubjectMember({
    onMutate: () => {
      handleClose();
      toast.loading('Adding Members...');
    },
    onSuccess: () => {
      toast.success('Member added sucessfully.');
      queryClient.invalidateQueries({
        queryKey: ['group_members'],
      });
      reset();
    },
    onError: () => {
      toast.error('fail to add members');
    },
  });
  const queryClient = useQueryClient();
  const { data: allUser } = useGetSubjectMembers({
    subject_id: subject_id as string,
  });
  const { data: rolesData } = useGetRoles();

  const { handleSubmit, reset, watch, setValue, getValues } =
    useForm<IMemberSubjectAdd>({
      defaultValues: {
        members: [],
        subject_id: group_id as string,
      },
    });

  const onSubmit = async (data: IMemberSubjectAdd) => {
    try {
      // Do something here
      addMember.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const [defaultRoleId, setDefaultRoleId] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const readerRole = rolesData?.roles.find((role) => role.name === 'reader');
    setDefaultRoleId(
      readerRole ? readerRole.id : (rolesData?.roles[0].id as string),
    );
  }, [rolesData]);

  const handleSelect = (event: React.SyntheticEvent, newValue: User | null) => {
    if (newValue) {
      const { members } = getValues();
      setValue('members', [...members, { ...newValue, role: defaultRoleId }]);
    }
    setSearchValue('');
  };

  const handleDelete = (id: string) => {
    const { members } = getValues();
    setValue(
      'members',
      members.filter((member) => member.id !== id),
    );
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results: any) => {
        const parsedData = results.data as any[];

        if (!parsedData[0] || !('student_id' in parsedData[0])) {
          toast.error('CSV must contain "student_id" field.');
          return;
        }

        const { members } = getValues();
        const existingIds = members.map((m) => m.id);
        const matchedUsers = parsedData
          .map((row) => {
            return allUser?.members.find(
              (user) => user.name === row.student_id,
            );
          })
          .filter(
            (user): user is Member => !!user && !existingIds.includes(user.id),
          );

        if (matchedUsers.length === 0) {
          toast.error('No matching users found or all users already added.', {
            duration: 3000,
          });
          return;
        }

        const updatedMembers = [
          ...members,
          ...matchedUsers.map((user) => ({
            ...user,
            role: defaultRoleId,
          })),
        ];

        setValue('members', updatedMembers);
        toast.success(`${matchedUsers.length} members imported successfully.`);
      },
      error: (err: Error) => {
        toast.error('Error parsing CSV file');
        console.error(err);
      },
    });

    e.target.value = '';
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
          <Stack spacing={1} display="flex" direction="row">
            <Autocomplete
              className="flex-grow"
              options={
                allUser?.members.filter((user) => {
                  const members = watch('members').map((mem) => mem.id);
                  return !members.includes(user.id);
                }) || []
              }
              getOptionLabel={(option) => option.name}
              value={null}
              inputValue={searchValue || ''}
              onInputChange={(event, newInputValue) => {
                setSearchValue(newInputValue);
              }}
              onChange={handleSelect}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={searchValue || ''}
                  label="Search User"
                />
              )}
            />

            <Select
              size="small"
              value={defaultRoleId}
              onChange={(e) => setDefaultRoleId(e.target.value)}
              sx={{ width: 120 }}
            >
              {rolesData?.roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack
            spacing={1}
            display="flex"
            justifyContent={'end'}
            direction="row"
            alignItems={'end'}
          >
            <Typography variant="caption">Download CSV Template</Typography>
            <CsvDownloadBtn />
            <Button
              onClick={handleImportClick}
              startIcon={
                <SvgIcon>
                  <Upload02 />
                </SvgIcon>
              }
              variant="contained"
            >
              Upload
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
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
                      sx={{ width: '1%', whiteSpace: 'nowrap' }}
                    >
                      ROLE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: '1%', whiteSpace: 'nowrap' }}
                    >
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(watch('members') as Member[])?.map((member) => (
                    <TableRow hover key={member.id} className="bg-white">
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={1}>
                          <Typography variant="body1">{member.name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          sx={{ height: 30 }}
                          value={member.role}
                          onChange={(e) => {
                            const { members } = getValues();
                            const updated = members.map((m) =>
                              m.id === member.id
                                ? { ...m, role: e.target.value }
                                : m,
                            );
                            setValue('members', updated);
                          }}
                        >
                          {rolesData?.roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleDelete(member.id)}
                          sx={{ p: 0 }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
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
