"use client";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import Link from "next/link";
import { NewSubjectInputs } from "@/interfaces/subject";

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
    <div className="main">
      <h1>New Subject</h1>
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
  );
};
export default Page;
