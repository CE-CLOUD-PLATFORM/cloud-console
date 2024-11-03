"use client";
import React, { ReactElement, ReactNode } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
// import { NewInstanceInputs } from "@/interfaces/Instance";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { PublicKeyReq } from "@/interfaces/keys";
import { usePostPublicKey, useQueryPublicKeys } from "@/services/setting/key";

const pageLink = {
  manageKey: "/settings/keys",
};

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<PublicKeyReq>({ defaultValues: { user_id: "1" } });
  let [{ loading: postLoading, error: postError }, execute] = usePostPublicKey(
    undefined,
    { manual: true }
  );
  let [{ loading, error, data }] = useQueryPublicKeys({ user_id: "1" });
  const onSubmit: SubmitHandler<PublicKeyReq> = async (data) => {
    console.log(data);
  };

  return (
    <div className="main">
      <h1>Public key</h1>
      <Stack
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="name"
          variant="outlined"
          label="name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <TextField
          id="key"
          variant="outlined"
          label="key"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}

        <Button variant="contained" type="submit">
          Add
        </Button>
      </Stack>
      <h1>Your key</h1>
      <div>
        {data?.keys.map((e) => (
          <div>{e.name}</div>
        ))}
      </div>
    </div>
  );
};
export default Page;
