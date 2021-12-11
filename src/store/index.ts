import { createStore } from "vuex";

import alert from "./alert/alert";
import auth from "./auth/auth";

export default createStore({
  mutations: {},
  actions: {},
  modules: { auth, alert },
});
