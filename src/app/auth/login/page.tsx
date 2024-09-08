"use client";
import React from "react";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { json } from "stream/consumers";
import axios from "axios";
type Inputs = {
  username: string;
  password: string;
  domain: string;
};
const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let res = await axios.post("http://localhost:5000/api/v1/auth/login", data);
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
        <Controller
          name="domain"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              label="domain"
              id="domain"
              variant="outlined"
              {...field}
            >
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
