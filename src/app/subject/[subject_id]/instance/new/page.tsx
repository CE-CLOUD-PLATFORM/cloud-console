"use client";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InstanceReq } from "@/interfaces/Instance";
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
import {
  usePostInstance,
  useQueryInstanceOption,
} from "@/services/instance/instance";
import { useQueryPublicKeys } from "@/services/setting/key";
import { PublicKey } from "@/interfaces/keys";
interface PageProps {
  params: {
    subject_id: string;
  };
}
const pageLink = {
  manageKey: "/settings/keys",
};

const Page = ({ params }: PageProps) => {
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm<InstanceReq>();
  const onSubmit: SubmitHandler<InstanceReq> = async (data) => {
    console.log({ ...data, subject_id: params.subject_id });
    execute({ data: { ...data, subject_id: params.subject_id } });
  };
  let [{ loading, data, error }] = useQueryInstanceOption({
    subject_id: params.subject_id,
  });
  let [{ data: keyData }] = useQueryPublicKeys({ user_id: "1" });
  let [
    {
      loading: loadingCreateResult,
      data: dataCreateResult,
      error: errCreateResult,
    },
    execute,
  ] = usePostInstance(undefined, { manual: true });
  // name: string;
  // subject_id: string;
  // flavor_id: string;
  // image_id: string;
  // volume_size: number;
  // public_key: string[];
  // username: string;
  // password: string;
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
            name="flavor_id"
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
                {data?.flavors.map((flavor) => (
                  <MenuItem key={flavor.id} value={flavor.id}>
                    {flavor.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.flavor_id && <span>This field is required</span>}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="images-label">Images</InputLabel>
          <Controller
            name="image_id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                labelId="images-label"
                id="images"
                label="Images"
                variant="outlined"
                {...field}
                sx={{
                  "& .MuiSelect-select": {
                    display: "flex",
                    gap: "10px",
                  },
                }}
              >
                {data?.images.map((image) => (
                  <MenuItem
                    key={image.id}
                    className="flex gap-x-2"
                    value={image.id}
                  >
                    <img
                      width={24}
                      height={24}
                      src={
                        image.Properties?.logo_url || "/assets/navbar/os.png"
                      }
                    />
                    {image.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          {errors.flavor_id && <span>This field is required</span>}
        </FormControl>
        <div className="flex w-full items-center gap-x-2">
          <div className=" w-full">
            <Controller
              name="public_key"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  className="w-full"
                  id="tags-filled"
                  options={
                    keyData?.keys?.filter((option) => !field.value?.includes(option.id))
                      .map((option) => option) as PublicKey[]
                  }
                  getOptionLabel={(option) => (option as PublicKey).name}
                  isOptionEqualToValue={(option, value) =>
                    option.key === value.key
                  }
                  freeSolo
                  value={(field.value as string[])?.map(
                    (key) =>
                      keyData?.keys.find((option) => option.key === key) || {
                        key,
                        name: key,
                      }
                  )}
                  onChange={(event, newValue) => {

                    field.onChange(newValue.map((key) => (key as PublicKey).id));
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.name}
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
        <TextField
          id="username"
          variant="outlined"
          label="Username"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}
        <TextField
          id="password"
          variant="outlined"
          type="password"
          label="Password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <Button variant="contained" type="submit">
          Create
        </Button>
      </Stack>
    </div>
  );
};
export default Page;
