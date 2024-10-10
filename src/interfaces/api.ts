import { UseMutationOptions } from "@tanstack/react-query";
export interface IResponse {
    error: boolean
    msg: string
}

export interface IMutationOptions<
    TData = unknown,
    TError = unknown,
    TVariables = unknown,
    TContext = unknown
> extends Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
> { }