"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NewInstanceInputs } from "@/interfaces/Instance";
import {
  Autocomplete,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";

const pageLink = {
  manageKey: "/settings/keys",
};
const top100Tags = [
  { title: "Tag1" },
  { title: "Tag2" },
  { title: "Tag3" },
  { title: "Tag4" },
  { title: "Tag5" },
];
const Page = () => {
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm<NewInstanceInputs>();
  const onSubmit: SubmitHandler<NewInstanceInputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="main">
      <h1>Create VMs</h1>
      <Stack
        component="form"
        autoComplete="off"
        className="w-[70%] p-4 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="username"
          variant="outlined"
          label="Name"
          {...register("name", { required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <FormControl fullWidth>
          <InputLabel id="flavors-label">Flavors</InputLabel>
          <Controller
            name="flavors"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                labelId="flavors-label"
                id="flavors"
                label="Flavors"
                variant="outlined"
                {...field}
              >
                <MenuItem value={"Default"}>Default</MenuItem>
              </Select>
            )}
          />
          {errors.flavors && <span>This field is required</span>}
        </FormControl>
        <div className="flex w-full items-center gap-x-2">
          <div className=" w-full">
            <Controller
              name="public_key"
              control={control}
              defaultValue={[]}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  className="w-full"
                  id="tags-filled"
                  options={top100Tags
                    .filter((option) => !field.value?.includes(option.title))
                    .map((option) => option.title)}
                  freeSolo
                  value={field.value}
                  onChange={(event, newValue) => {
                    field.onChange(newValue); 
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Public Key"
                    />
                  )}
                />
              )}
            />
            {errors.public_key && <span>{errors.public_key.message}</span>}
          </div>

          <Link
            className="text-nowrap bg-gray-200 p-2 rounded-md"
            href={pageLink.manageKey}
          >
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
