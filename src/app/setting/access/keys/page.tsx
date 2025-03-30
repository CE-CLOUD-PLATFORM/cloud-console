'use client';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { NewInstanceInputs } from "@/interfaces/Instance";
import { Button, Stack, TextField } from '@mui/material';
import { PublicKeyReq } from '@/modules/config/types/public-key';
import { useUserStore } from '@/modules/auth/store/auth';
import { useGetUserPublicKeys } from '@/modules/config/hook/use-get-user-public-key';

const pageLink = {
  manageKey: '/settings/keys',
};

const Page = () => {
  let { user } = useUserStore();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<PublicKeyReq>({ defaultValues: { user_id: '1' } });
  const { data } = useGetUserPublicKeys({
    user_id: user?.info.id as string,
  });
  const onSubmit: SubmitHandler<PublicKeyReq> = async (data) => {
    console.log(data);
  };

  return (
    <div className="main">
      <h1>Public key</h1>
      <Stack
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="name"
          variant="outlined"
          label="name"
          {...register('name', { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <TextField
          id="key"
          variant="outlined"
          label="key"
          {...register('key', { required: true })}
        />
        {errors.name && <span>This field is required</span>}

        <Button variant="contained" type="submit">
          Add
        </Button>
      </Stack>
      <h1>Your key</h1>
      <div>{data?.keys?.map((e) => <div key={e.id}>{e.name}</div>)}</div>
    </div>
  );
};
export default Page;
