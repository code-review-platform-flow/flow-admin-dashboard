import ky from "ky-universal";

export const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
  ky(`/api/${input}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  }).then((res) => res.json());

export const fetchApi = ky.create({
  prefixUrl: "/api",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        // CSRF 토큰이 있다면 추가
        const csrfToken = document.cookie.match(new RegExp("(^| )next-auth.csrf-token=([^;]+)"));
        if (csrfToken) {
          request.headers.set("X-CSRF-Token", csrfToken[2]);
        }
      },
    ],
  },
});
