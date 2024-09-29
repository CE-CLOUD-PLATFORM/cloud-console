"use client";
import React, { ReactElement, ReactNode } from "react";
import InstanceLayout from "./layout";
import page from "@/app/auth/login/page";
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
  } = useForm<NewInstanceInputs>();
  const onSubmit: SubmitHandler<NewInstanceInputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className="main">
      <h1>Create VMs</h1>
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
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <Controller
          name="flavors"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select label="flavors" id="flavors" variant="outlined" {...field}>
              <MenuItem value={"Default"}>Default</MenuItem>
            </Select>
          )}
        />
        {errors.flavors && <span>This field is required</span>}
        <div className="flex w-full items-center gap-x-2">
          <div className="flex-1">
            <Controller
              name="flavors"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  className="w-full min-w-[250px]"
                  label="flavors"
                  id="flavors"
                  variant="outlined"
                  {...field}
                >
                  <MenuItem value={"Default"}>Default</MenuItem>
                </Select>
              )}
            />
            {errors.flavors && <span>This field is required</span>}
          </div>
          <Link className="text-nowrap bg-gray-200 p-2 rounded-md" href={pageLink.manageKey}>
            Manage Key
          </Link>
        </div>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
    </div>
  );
};
export default Page;
