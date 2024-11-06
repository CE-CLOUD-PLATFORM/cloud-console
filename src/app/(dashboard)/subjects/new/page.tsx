"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { NewSubjectInputs } from "@/interfaces/Subject";

const pageLink = {
  // manageKey: "/settings/keys",
};

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm<NewSubjectInputs>();
  const onSubmit: SubmitHandler<NewSubjectInputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className="flex min-h-screen w-full flex-col p-6 space-y-5">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">Create Subject</h1>
      </div>
      <div className="w-1/2 mx-auto">
        <Stack
          component="form"
          sx={{ "& > :not(style)": { m: 1 } }}
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
            id="description"
            variant="outlined"
            label="description"
            {...register("description")}
          />
          {errors.name && <span>This field is required</span>}
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </div>
    </div>
  );
};
export default Page;
