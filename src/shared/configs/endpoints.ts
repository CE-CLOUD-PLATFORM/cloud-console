const ROOTS = {
  AUTH: '/auth',
  SUBJECT: '/subject',
};

export const endpoints = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
  },
  subject: {
    getAll: `${ROOTS.SUBJECT}s`,
  },
};
