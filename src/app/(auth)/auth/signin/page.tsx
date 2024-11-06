"use client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ILoginReq } from "@/shared/interfaces/login";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth/hook";
import { setCookie } from "cookies-next";

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: Authtentication } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginReq>();

  const onSubmit: SubmitHandler<ILoginReq> = async (value: ILoginReq) => {};
  return (
    <div>
      {" "}
      <div className="min-h-screen min-w-full flex">
        <div className="flex w-full flex-col items-center justify-center bg-white p-5 text-2xl font-semibold md:w-1/3">
          <h1 className="text-center text-lg md:text-2xl">CE CLOUD PLATFORM</h1>
          <hr />
          <Stack
            component="form"
            noValidate
            className="w-full space-y-4 p-5"
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
            <div className="w-full">
              <button
                className="bg-orange-600 w-full p-3 text-sm text-white rounded-md"
                type="submit"
              >
                Login
              </button>
            </div>
          </Stack>
        </div>
        <div className="hidden md:flex w-full flex-col items-center justify-center bg-orange-500 p-3  text-2xl font-semibold md:w-2/3 "></div>
      </div>
    </div>
  );
}
