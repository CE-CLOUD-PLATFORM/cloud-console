import {  MutationOptions, useMutation } from "@tanstack/react-query";
import { IRecoveryPassword } from "../types/account";
import { recoveryPassword } from "../service";

export const useRecoveryPassword = (options?: MutationOptions<any, Error, IRecoveryPassword,unknown>) => {
    return useMutation({
        ...options,
        mutationFn: recoveryPassword,
        
    })

}