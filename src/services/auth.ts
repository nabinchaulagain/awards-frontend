import api from "../utils/api";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  roles: string[];
  username: string;
}

export const login = async (payload: {
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<unknown, AuthResponse>(
    "/auth/login",
    payload
  );

  return response;
};

export const refreshAccessToken = async (): Promise<AuthResponse> => {
  const response = await api.post<unknown, AuthResponse>("/auth/refresh", {
    grant_type: "refresh_token",
    refresh_token: localStorage.getItem("refreshToken"),
  });

  return response;
};

export const resolveLater = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 7000);
  });
};
