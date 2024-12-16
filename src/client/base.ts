import ky from "ky-universal";

export const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
  ky(`/api/${input}`, init).then((res) => res.json());

export const fetchApi = ky.create({
  prefixUrl: "/api",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
