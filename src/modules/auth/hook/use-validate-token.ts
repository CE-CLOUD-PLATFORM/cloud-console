import { useQuery } from "@tanstack/react-query";
import { validateToken } from "../service";
import type { IAuthValidateToken } from "../types/auth";

export const useValidateToken = (params: IAuthValidateToken) => {
    const { token } = params
    
    return useQuery({
        queryKey: ['token-validate',token as string],
        queryFn: validateToken,
        enabled: !!token,
        staleTime: 1000 * 60 * 2
    });
}


