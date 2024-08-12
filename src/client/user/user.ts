import { ISO8601DateTime } from "@/types/common";
import qs from "qs";
import useSWR from "swr";
import { fetchApi } from "../base";

export interface IUser {
  userId: number;
  email: string;
  userName: string;
  schoolName: string;
  schoolNumber: number;
  majorName: string;
  status: string;
  role: string;
  createDate: ISO8601DateTime;
  modifyDate: ISO8601DateTime;
}

export interface IUserFormValue extends Omit<IUser, "userId" | "createDate" | "modifyDate"> {}

interface IUsersParams {
  page?: number;
}

export interface ISort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface IPage {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface IUsersResponse {
  data: IUser[];
  page: IPage;
}
export interface IUserResponse {
  code: number;
  message: string;
  data: IUser;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export const useUsers = (params: IUsersParams = {}) => {
  return useSWR<IUsersResponse>(`api/admin/user?${qs.stringify(params)}`);
};

export const useUser = (id: string | number) => {
  return useSWR<IUserResponse>(`api/admin/user/${id}`);
};

export const createUser = (value: IUserFormValue) => {
  return fetchApi.post(`api/admin/user`, { body: JSON.stringify(value) });
};

export const updateUser = (id: string, value: IUserFormValue) => {
  return fetchApi.put(`api/admin/user/${id}`, { body: JSON.stringify(value) });
};

export const loginUser = (value: IUserCredentials) => {
  return fetchApi.post(`auth/login`, { body: JSON.stringify(value) });
};
