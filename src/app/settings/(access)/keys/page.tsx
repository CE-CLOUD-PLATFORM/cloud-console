"use client";
import React, { ReactElement, ReactNode } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NewInstanceInputs } from "@/interfaces/Instance";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import Link from "next/link";

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
  } = useForm<NewSSHKey>();
  const onSubmit: SubmitHandler<NewSSHKey> = async (data) => {
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
    </div>
  );
};
export default Page;
