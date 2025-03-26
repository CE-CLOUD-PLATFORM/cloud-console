import React, { useEffect, useState } from 'react';
import ModalCover from '../index';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import '../index.css';
import { Controller, useForm } from 'react-hook-form';
import { Subject } from '@/modules/subject/types/subject';
import { useUserStore } from '@/modules/auth/store/auth';
import { FormProps } from '@/shared/interfaces/modal';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateGroup } from '@/modules/group/hook/use-create-group';
import { IGroupCreate } from '@/modules/group/types/group';
import { useParams } from 'next/navigation';
import { useGetFlavors } from '@/modules/flavor/hook/use-get-flavors';
import { useGetDomainUsers } from '@/modules/user/hook/use-get-domain-users';
interface FlavorSpec {
  max_instance: number;
  flavor_id: string;
}

const form_id = 'group-create-form';
const ModalGroupCreate = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { subject_id } = useParams();
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { data: flavorsData } = useGetFlavors();
  const { data: usersData } = useGetDomainUsers({
    domain_id: user?.info.domain.id as string,
  });
  const [resourceChecked, setResourceChecked] = useState(false);
  const [resourceTab, setResourceTab] = useState(0);
  const flavorSpecForm = useForm<FlavorSpec>({
    defaultValues: {
      max_instance: 1,
      flavor_id: flavorsData?.flavors?.[0].id || '',
    },
  });
  const createGroup = useCreateGroup({
    onSuccess: () => {
      toast.success('Group created successfully');
      queryClient.invalidateQueries({ queryKey: ['subjects', 'groups'] });
      reset();
      handleClose();
    },
    onError: () => {
      toast.error('Fail to create Group.');
    },
    onMutate: () => {
      toast.loading('Creating...');
    },
  });
  const { register, handleSubmit, reset, setValue, control } =
    useForm<IGroupCreate>({
      defaultValues: {
        name: 'untitled',
        description: '',
        domain_id: user?.info.domain.id,
        user_id: user?.info.id,
        project_id: subject_id as string,
        req_resource: {
          cores: flavorsData?.flavors?.[0].vcpus || 1,
          max_instance: 1,
          memory: flavorsData?.flavors?.[0].ram || 4096,
        },
        set_resource: false,
      },
    });

  const onSubmit = async (data: IGroupCreate) => {
    try {
      setValue('domain_id', user?.info.domain.id as string);

      createGroup.mutate(data);
    } catch (error) {
      console.error(error);
    }
  };
  const onFlavorSpecFormChange = () => {
    const data = flavorSpecForm.getValues();
    const flavor = flavorsData?.flavors.find(
      (flavor) => flavor.id === data.flavor_id,
    );
    if (flavor) {
      const resource = {
        cores: flavor?.vcpus * data.max_instance,
        max_instance: Number(data.max_instance),
        memory: flavor?.ram * data.max_instance,
      };

      setValue('req_resource', resource);
    }
  };

  return (
    <ModalCover  handleOnClose={handleClose}  isOpen={isOpen}>
      <Box className="modal-box" gap={2}>
        <Box className="hidden-scrollbar flex-1 overflow-y-auto">
          <Typography variant="h5">New Group</Typography>
          <Box
            component="form"
            id={form_id}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            className="flex-1 p-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={1}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Title" />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Description" />
                )}
              />
              <InputLabel
                sx={{
                  '&': {
                    transform: 'translate(12px, 32px) scale(1) !important',
                  },
                }}
                variant="filled"
                id="users-label"
              >
                User Admin
              </InputLabel>
              <Controller
                name="user_id"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    labelId="users-label"
                    id="user_id"
                    label="User Admin"
                    variant="filled"
                    {...field}
                  >
                    {usersData?.users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {/* {errors.user_id && <span>This field is required</span>} */}
              <Box
                display="flex"
                alignItems={'center'}
                justifyContent={'space-between'}
                width="100%"
              >
                <Divider
                  className="!ml-0 flex-1 font-semibold text-slate-600"
                  sx={{
                    '&::before, &::after': {
                      borderTopWidth: '2px',
                      borderColor: '#e1e1e1',
                    },
                  }}
                  textAlign="left"
                  variant="middle"
                >
                  Resource Limits
                </Divider>
                <Switch
                  checked={resourceChecked}
                  onChange={(e) => {
                    setResourceChecked(e.target.checked);
                  }}
                />
              </Box>
              {resourceChecked && (
                <Stack>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                      value={resourceTab}
                      onChange={(e, v) => {
                        setResourceTab(v);
                      }}
                    >
                      <Tab label="Flavors" />
                      <Tab label="Specific" />
                    </Tabs>
                  </Box>
                  {resourceTab === 0 && (
                    <Stack
                      display={'flex'}
                      direction={'column'}
                      spacing={1}
                      position={'relative'}
                    >
                      <InputLabel
                        variant="filled"
                        sx={{
                          '&': {
                            transform:
                              'translate(12px, 32px) scale(1) !important',
                          },
                        }}
                      >
                        Flavors
                      </InputLabel>

                      <Controller
                        name="flavor_id"
                        control={flavorSpecForm.control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onChange={(event) => {
                              field.onChange(event);
                              onFlavorSpecFormChange();
                            }}
                            variant="filled"
                          >
                            {flavorsData?.flavors?.map((flavor) => (
                              <MenuItem key={flavor.id} value={flavor.id}>
                                {flavor.name} ({flavor.vcpus} vCPUs,{' '}
                                {flavor.ram}
                                MB RAM, {flavor.disk}GB Disk)
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      />

                      <Controller
                        name="max_instance"
                        control={flavorSpecForm.control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            onChange={(event) => {
                              field.onChange(event);
                              onFlavorSpecFormChange();
                            }}
                            fullWidth
                            label="Max Instance"
                            type="number"
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                          />
                        )}
                      />
                      <Stack display={'flex'} direction={'row'} spacing={1}>
                        {/* Cores */}
                        <Controller
                          name="req_resource.cores"
                          control={control}
                          rules={{
                            required: 'Cores are required',
                            pattern: {
                              value: /^[1-9][0-9]*$/,
                              message: 'Must be a positive integer',
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              fullWidth
                              disabled
                              label="Cores"
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                              }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                        {/* Memory */}
                        <Controller
                          name="req_resource.memory"
                          control={control}
                          rules={{
                            required: 'Memory is required',
                            pattern: {
                              value: /^[1-9][0-9]*$/,
                              message: 'Must be a positive integer',
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <TextField
                              {...field}
                              fullWidth
                              disabled
                              label="Memory (MB)"
                              inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                              }}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          )}
                        />
                      </Stack>
                    </Stack>
                  )}
                  {resourceTab === 1 && (
                    <Stack
                      marginTop={'1.5rem'}
                      display={'flex'}
                      direction={'row'}
                      spacing={1}
                    >
                      {/* Cores */}
                      <Controller
                        name="req_resource.cores"
                        control={control}
                        rules={{
                          required: 'Cores are required',
                          pattern: {
                            value: /^[1-9][0-9]*$/,
                            message: 'Must be a positive integer',
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Cores"
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                      {/* Max Instance */}
                      <Controller
                        name="req_resource.max_instance"
                        control={control}
                        rules={{
                          required: 'Max Instance is required',
                          pattern: {
                            value: /^[1-9][0-9]*$/,
                            message: 'Must be a positive integer',
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Max Instance"
                            type="number"
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                      {/* Memory */}
                      <Controller
                        name="req_resource.memory"
                        control={control}
                        rules={{
                          required: 'Memory is required',
                          pattern: {
                            value: /^[1-9][0-9]*$/,
                            message: 'Must be a positive integer',
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Memory (MB)"
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    </Stack>
                  )}
                </Stack>
              )}
            </Stack>

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                marginTop: 2,
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
                form={form_id}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ModalCover>
  );
};

export default ModalGroupCreate;
