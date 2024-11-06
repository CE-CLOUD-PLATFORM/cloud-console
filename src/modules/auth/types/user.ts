export interface UserInfo {
  domain: Domain;
  id: string;
  name: string;
}

export interface Domain {
  id: string;
  name: string;
}

export type User = {
  token: string;
  info: UserInfo;
};
