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
    watch,
    control,
    formState: { errors },
    setValue,
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
  );
};
export default Page;
