import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object({
        username: yup.string().required(),
        password: yup.string().required(),
        domain: yup.string().required(),
    })
    .required();

    export const userLoginResolver = yupResolver(schema);