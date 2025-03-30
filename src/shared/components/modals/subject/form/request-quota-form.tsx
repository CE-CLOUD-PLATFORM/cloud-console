/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetFlavors } from '@/modules/flavor/hook/use-get-flavors';
import { useCreateQuota } from '@/modules/resource/hook/use-create-quota';
import type { IQuotaCreate } from '@/modules/resource/types/quota';
import type { FormProps } from '@/shared/interfaces/modal';
import {
  Box,
  Button,
  Divider,
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
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import '../../index.css';

interface FlavorSpec {
  max_instance: number;
  flavor_id: string;
}

const form_id = 'quota-request-form';
const ModalQuotaRequestForm = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const createSubject = useCreateQuota({
    onSuccess: () => {
      toast.success('Quota requested successfully');
      reset();
    },
    onError: () => {
      toast.error('Fail to request Quota.');
    },
    onMutate: () => {
      handleClose();

      toast.loading('Requesting Quota...');
    },
  });
  const { data: flavorsData } = useGetFlavors();
  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<IQuotaCreate>({
    defaultValues: {
      subject_name: 'untitled',
      subject_description: '',
      subject_domain_id: user?.info.domain.id,
      req_resource: {
        cores: flavorsData?.flavors?.[0].vcpus || 1,
        max_instance: 1,
        memory: flavorsData?.flavors?.[0].ram || 4096,
      },
      request_user_id: user?.info.id,
      subject_academic_year: '',
    },
  });
  const flavorSpecForm = useForm<FlavorSpec>({
    defaultValues: {
      max_instance: 1,
      flavor_id: flavorsData?.flavors?.[0].id || '',
    },
  });
  const [resourceTab, setResourceTab] = useState(0);
  const [resourceChecked, setResourceChecked] = useState(false);

  const onSubmit = async (data: IQuotaCreate) => {
    try {
      setValue('subject_domain_id', user?.info.domain.id as string);
      // data.req_resource = {
      //   cores: Number(data.req_resource.cores),
      //   max_instance: Number(data.req_resource.max_instance),
      //   memory: Number(data.req_resource.memory),
      // };
      if (!resourceChecked) {
        data.req_resource = undefined
      }
      createSubject.mutate(data);
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
    <Box className="hidden-scrollbar flex-1 space-y-3 overflow-y-auto">
      <Typography variant="h5">Request Quota</Typography>
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
            name="subject_name"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Subject Name" />
            )}
          />

          <Controller
            name="subject_description"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Subject Description" />
            )}
          />
          <Controller
            name="subject_academic_year"
            control={control}
            rules={{
              required: 'Academic year is required',
              pattern: {
                value: /^[0-9]{1,2}$/,
                message: 'Must be a number with up to 2 digits',
              },

              validate: (value) =>
                parseInt(value, 10) > 0 ? true : 'Must be a positive integer',
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Academic Year"
                inputProps={{
                  maxLength: 2,
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                }}
                error={!!fieldState.error}
                helperText={
                  fieldState.error?.message
                    ? fieldState.error?.message
                    : 'Must be a positive integer, e.g. 2568 as 68'
                }
              />
            )}
          />

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
                        transform: 'translate(12px, 32px) scale(1) !important',
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
                            {flavor.name} ({flavor.vcpus} vCPUs, {flavor.ram}
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
  );
};

export default ModalQuotaRequestForm;
