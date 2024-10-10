"use client";
import React, { ReactElement, useEffect } from "react";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LoginLayout from "./layout";
import { ILoginReq } from "@/interfaces/auth";
import { useLogin } from "@/app/API/auth/login";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/userContextType";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<ILoginReq>();
  const [{ data, loading, error }, execute] = useLogin();
  let { user, login } = useUserContext() as UserContextType;
  const onSubmit: SubmitHandler<ILoginReq> = (value) => {
    execute({ data: value });
  };
  useEffect(() => {
    if (!data?.error) {
      login({ token: data?.token as string });
    }
  }, [data]);
  return (
    <div className="">
      <Stack
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="username"
          variant="outlined"
          label="username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}
        <TextField
          id="password"
          variant="outlined"
          label="password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <Controller
          name="domain"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label="domain" id="domain" variant="outlined" {...field}>
              <MenuItem value={"Default"}>Default</MenuItem>
            </Select>
          )}
        />
        {errors.domain && <span>This field is required</span>}

        <Button variant="contained" type="submit">
          Contained
        </Button>
      </Stack>
    </div>
  );
};
export default page;
