import { ISO8601DateTime } from "@/types/common";
import { Dayjs } from "dayjs";
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

export interface IUserSearchFormValue extends Omit<IUser, "userId" | "createDate" | "modifyDate" | "status" | "role"> {
  searchDateType: string;
  dateRange: {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  };
  searchType: string;
  status: string[];
  searchText: string;
  page: number;
  size: number;
}

export interface IUserFormValue extends Omit<IUser, "userId" | "createDate" | "modifyDate" | "status" | "role"> {}

export interface IUserSendEmailFormValue {
  email: string;
  universityName: string;
}

export interface IEmailCertificationRequest {
  email: string;
  universityName: string;
  code: number;
}

interface IUsersParams {
  page?: number;
  size?: number;
  searchDateType?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  searchType?: string;
  searchText?: string;
}

export interface ISort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface IPage {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalCount: number;
}

export interface IUsersResponse {
  items: IUser[];
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

export interface IUserWithdrawal {
  feedback: string;
}

export interface IUserLoginResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
  role: string;
}

export const useUsers = (params: IUsersParams = {}) => {
  return useSWR<IUsersResponse>(`api/admin/user?${qs.stringify(params)}`);
};

export const sendEmailUser = (value: IUserSendEmailFormValue) => {
  return fetchApi.post(`auth/email`, { body: JSON.stringify(value) });
};

export const certificationUser = (value: IEmailCertificationRequest) => {
  return fetchApi.post(`auth/code`, { body: JSON.stringify(value) });
};

export const createUser = (value: IUserFormValue) => {
  return fetchApi.post(`auth/register`, { body: JSON.stringify(value) });
};

export const loginUser = (value: IUserCredentials) => {
  return fetchApi.post(`auth/login`, { body: JSON.stringify(value) });
};

export const withdrawalUser = (value: IUserWithdrawal) => {
  return fetchApi.delete(`user`, { body: JSON.stringify(value) });
};
