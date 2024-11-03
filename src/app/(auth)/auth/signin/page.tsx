"use client";
import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ILoginReq } from "@/interfaces/auth";
import { useLogin } from "@/services/auth/login";
import { useUserContext } from "@/contexts/UserContext";
import { UserContextType } from "@/interfaces/UserContextType";

import { useRouter } from "next/navigation";
const Page = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginReq>();
  const router = useRouter();
  const [, execute] = useLogin({ manual: true });
  let { user, login } = useUserContext() as UserContextType;
  const onSubmit: SubmitHandler<ILoginReq> = async (value) => {
    let { data, status } = await execute({ data: value });
    if (status === 200) {
      login({ token: data?.token as string, info: data?.user });
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen min-w-full flex">
      <div className="flex w-full flex-col items-center justify-center bg-red-300 p-3  text-2xl font-semibold md:w-2/3"></div>
      <div className="flex w-full flex-col items-center justify-center bg-slate-300 p-3  text-2xl font-semibold md:w-1/3">
        <h1 className="text-center text-lg md:text-2xl">CE CLOUD PLATFORM</h1>
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
        <FormControl fullWidth>
          <InputLabel id="domains-label">Domain</InputLabel>
          <Controller
            name="domain"
            control={control}
            defaultValue="Default"
            render={({ field }) => (
              <Select
                labelId="domains-label"
                id="domains"
                label="Domain"
                variant="outlined"
                {...field}
              >
                <MenuItem value={"Default"}>Default</MenuItem>
              </Select>
            )}
          />
          {errors.domain && <span>This field is required</span>}
        </FormControl>
        <Button variant="contained" type="submit">
          Contained
        </Button>
      </Stack>
      </div>
    </div>
  );
};
export default Page;
