import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import '../../index.css';
import { Controller, useForm } from 'react-hook-form';
import { ISubjectCreate, Subject } from '@/modules/subject/types/subject';
import { useUserStore } from '@/modules/auth/store/auth';
import { FormProps } from '@/shared/interfaces/modal';
import { useCreateSubject } from '@/modules/subject/hook/use-create-subject';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useGetFlavors } from '@/modules/flavor/hook/use-get-flavors';
import { useGetDomainUsers } from '@/modules/user/hook/use-get-domain-users';
import { CreditDetail, ICreditCreate } from '@/modules/subject/types/credit';
import { time } from 'console';

interface FlavorSpec {
  max_instance: number;
  flavor_id: string;
  time_in_day: number;
  time_in_hour: number;
}

const form_id = 'credit-request-form';
const ModalCreditRequestForm = (props: FormProps) => {
  const { isOpen, handleClose } = props;
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const createSubject = useCreateSubject({
    onSuccess: () => {
      toast.success('Project created successfully');
      reset();
      handleClose();
    },
    onError: () => {
      toast.error('Fail to create Subject.');
    },
    onMutate: () => {
      toast.loading('Creating...');
    },
  });
  const { data: flavorsData } = useGetFlavors();
  const { data: usersData } = useGetDomainUsers({
    domain_id: user?.info.domain.id as string,
  });
  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<ICreditCreate>({
    defaultValues: {
      details: '',
      academic_year: '',
      amount: 0,
    },
  });
  const flavorSpecForm = useForm<FlavorSpec>({
    defaultValues: {
      max_instance: 1,
      flavor_id: flavorsData?.flavors?.[0].id || '',
      time_in_hour: 1,
      time_in_day: 0,
    },
  });
  const [resourceTab, setResourceTab] = useState(0);
  const [resourceChecked, setResourceChecked] = useState(false);

  const onSubmit = async (data: ICreditCreate) => {
    try {
    } catch (error) {
      console.error(error);
    }
  };
  const onFlavorSpecFormChange = () => {
    const data = flavorSpecForm.getValues();
    const flavor = flavorsData?.flavors.find(
      (flavor) => flavor.id === data.flavor_id,
    );
    let { time_in_hour, time_in_day, max_instance } = data;
    if (flavor) {
      if (time_in_hour > 24) {
        const additional_days = Math.floor(time_in_hour / 24);
        time_in_day = additional_days;
        time_in_hour = time_in_hour % 24;
        flavorSpecForm.setValue('time_in_day', time_in_day);
        flavorSpecForm.setValue('time_in_hour', time_in_hour);
      }
      const resource: CreditDetail = {
        flavor_id: flavor?.id,
        instance: data.max_instance,
        time_in_hour: time_in_hour + time_in_day * 24,
      };

      setValue('resource', resource);
      setValue('amount', 5 * max_instance * resource.time_in_hour);
    }
  };

  return (
    <Box className="hidden-scrollbar flex-1  overflow-y-auto">
      <Typography variant="h5">Request Credit</Typography>
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
            name="details"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Usage details" />
            )}
          />
          <Controller
            name="academic_year"
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
              Credit Calculator
            </Divider>
            <Switch
              checked={resourceChecked}
              onChange={(e) => {
                setResourceChecked(e.target.checked);
              }}
            />
          </Box>
          {resourceChecked && (
            <Stack
              display={'flex'}
              direction={'column'}
              spacing={1}
              position={'relative'}
              marginTop={0}
            >
              <InputLabel
                variant="filled"
                sx={{
                  '&': {
                    transform: 'translate(12px, 32px) scale(1) !important',
                    marginTop: 0,
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
              <Typography variant="subtitle2">Time usage</Typography>
              <Stack display={'flex'} direction={'row'} spacing={1}>
                <Controller
                  name="time_in_day"
                  control={flavorSpecForm.control}
                  rules={{
                    pattern: {
                      value: /^[1-9][0-9]*$/,
                      message: 'Must be a positive integer',
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Day"
                      onChange={(event) => {
                        field.onChange(event);
                        onFlavorSpecFormChange();
                      }}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="time_in_hour"
                  control={flavorSpecForm.control}
                  rules={{
                    pattern: {
                      value: /^[1-9][0-9]*$/,
                      message: 'Must be a positive integer',
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Hour"
                      onChange={(event) => {
                        field.onChange(event);
                        onFlavorSpecFormChange();
                      }}
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
        </Stack>
        <Typography marginTop={2} variant="subtitle2">
          Total Credit
        </Typography>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: 'Credit field is required.',
            pattern: {
              value: /^[1-9][0-9]*$/,
              message: 'Must be a positive integer.',
            },
            min: {
              value: 1,
              message: 'Value must be greater than 0.',
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              label="Credit"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

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

export default ModalCreditRequestForm;
