import * as yup from "yup";
import { IRecoveryPassword } from "../types/account";

export const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required")
});
