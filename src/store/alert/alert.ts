import { Module } from "vuex";

export interface Alert {
  message: string;
  type: string;
  isOpen: boolean;
}

export interface AlertPayload extends Alert {
  time?: number;
}

const alert: Module<Alert, Alert> = {
  namespaced: true,
  state: { message: "", type: "", isOpen: false },
  mutations: {
    setAlert(state, payload: AlertPayload) {
      state.message = payload.message;
      state.type = payload.type;
      state.isOpen = true;
    },

    hideAlert(state) {
      state.message = "";
      state.type = "";
      state.isOpen = false;
    },
  },
  actions: {
    showAlert(state, payload: AlertPayload) {
      state.commit("setAlert", payload);

      setTimeout(() => state.commit("hideAlert"), payload.time || 5000);
    },
  },
};

export default alert;
