import { login, refreshAccessToken } from "@/services/auth";
import tokenStorage from "@/utils/auth";
import { Module } from "vuex";

interface User {
  username: string;
  roles: string[];
}

interface AuthState {
  isLoadingAuthStatus: boolean;
  isLoggedIn: boolean;
  user: User | null;
}

const auth: Module<AuthState, unknown> = {
  namespaced: true,
  state: {
    isLoadingAuthStatus: true,
    isLoggedIn: false,
    user: null,
  },
  mutations: {
    login(state, payload) {
      state.user = { username: payload.username, roles: payload.roles };

      tokenStorage.setAccessToken(payload.access_token);
      localStorage.setItem("refreshToken", payload.refresh_token);

      state.isLoggedIn = true;
    },
    setNotLoggedInState(state) {
      state.isLoggedIn = false;
      state.isLoadingAuthStatus = false;
    },
    setLoggedInState(state, payload) {
      state.user = { username: payload.username, roles: payload.roles };

      tokenStorage.setAccessToken(payload.access_token);
      localStorage.setItem("refreshToken", payload.refresh_token);

      state.isLoggedIn = true;
      state.isLoadingAuthStatus = false;
    },
  },
  actions: {
    async login(state, payload) {
      const user = await login(payload);

      this.commit("auth/login", user);
    },
    async loadAuthState() {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        this.commit("auth/setNotLoggedInState");
        return;
      }

      try {
        this.commit("auth/setLoggedInState", await refreshAccessToken());
      } catch (error) {
        this.commit("auth/setNotLoggedInState");
      }
    },
  },
};

export default auth;
