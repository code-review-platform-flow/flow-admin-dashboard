import useSWR from "swr";

export interface IDashboardResponse {
  member: {
    value: number;
  };
  order: {
    value: number;
  };
  income: {
    value: number;
  };
}

export const useDashboard = () => {
  return useSWR<IDashboardResponse>(`api/admin/dashboard`);
};
