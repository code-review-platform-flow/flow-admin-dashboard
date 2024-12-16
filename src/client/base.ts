import ky from "ky-universal";

export const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
  ky(`/api/${input}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    retry: 0,
    timeout: 10000,
  }).then((res) => res.json());

export const fetchApi = ky.create({
  prefixUrl: "/api",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  retry: 0,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
