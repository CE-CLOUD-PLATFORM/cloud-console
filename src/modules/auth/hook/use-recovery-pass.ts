/* eslint-disable @typescript-eslint/no-explicit-any */
import type {  MutationOptions} from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { IRecoveryPassword } from "../types/account";
import { recoveryPassword } from "../service";

export const useRecoveryPassword = (options?: MutationOptions<any, Error, IRecoveryPassword,unknown>) => {
    return useMutation({
        ...options,
        mutationFn: recoveryPassword,
        
    })

}