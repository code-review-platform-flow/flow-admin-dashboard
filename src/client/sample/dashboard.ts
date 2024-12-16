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
  return useSWR<IDashboardResponse>("/api/admin/dashboard", {
    fetcher: async (url) => {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          // 필요한 경우 인증 헤더 추가
          // 'Authorization': `Bearer ${getToken()}`
        },
      });
      if (!response.ok) {
        throw new Error("API 요청 실패");
      }
      return response.json();
    },
  });
};
