import { format } from "date-fns";

export const getDateddMMYYYYHHmmss = (date: string) => format(date, 'dd MMM, yyyy HH:mm:ss');
export const getDateddMMYYYY = (date: string) => format(date, 'dd MMM, yyyy');