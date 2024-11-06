"use client";
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
import Image from "next/image";
import {
  usePostInstance,
  useQueryInstanceOption,
} from "@/services/instance/instance";
import { useQueryPublicKeys } from "@/services/setting/key";
import { PublicKey } from "@/interfaces/keys";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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
  let router = useRouter();

  let [{ loading, data, error }] = useQueryInstanceOption({
    subject_id: params.subject_id,
  });
  let [{ data: keyData }] = useQueryPublicKeys({ user_id: "1" });
  let [, createInstance] = usePostInstance(undefined, { manual: true });

  const onSubmit: SubmitHandler<InstanceReq> = async (data) => {
    const createInstancePromise = createInstance({
      data: { ...data, subject_id: params.subject_id },
    });
    toast.promise(createInstancePromise, {
      loading: "Creating Instance",
      success: "Created",
      error: "Failed",
    });

    const instance = await createInstancePromise;

    console.log(instance);

    router.push(`/subject/${params.subject_id}`);
  };

  // name: string;
  // subject_id: string;
  // flavor_id: string;
  // image_id: string;
  // volume_size: number;
  // public_key: string[];
  // username: string;
  // password: string;
  return (
    <div className="flex min-h-screen w-full flex-col p-6 space-y-5">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">Create Instance</h1>
      </div>
      <div className="w-3/4 mx-auto">
        <Stack
          component="form"
          autoComplete="off"
          className="p-4 gap-3"
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
                      <Image
                        width={24}
                        height={24}
                        src={
                          image.Properties?.logo_url || "/assets/navbar/os.png"
                        }
                        alt=""
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
                defaultValue={[]}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    className="w-full"
                    id="tags-filled"
                    options={
                      (keyData?.keys
                        ?.filter((option) => !field.value?.includes(option.id))
                        .map((option) => option) as PublicKey[]) || []
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
                      field.onChange(
                        newValue.map((key) => (key as PublicKey).key)
                      );
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        // eslint-disable-next-line react/jsx-key
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
    </div>
  );
};
export default Page;
