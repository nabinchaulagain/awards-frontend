<template>
  <router-view v-if="!$store.state.auth.isLoadingAuthStatus" />
  <alert></alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import Alert from "./components/commons/Alert.vue";

export default defineComponent({
  components: { alert: Alert },
  setup: function () {
    const store = useStore();

    store.dispatch("auth/loadAuthState");
  },
});
</script>

<style lang="css">
:root {
  --color-dark-green: #4d784e;
  --color-light-green: #6ea171;
  --color-yellow: #e1d798;
  --color-brown: #675645;
  --color-dark-blue: #424756;
  --color-light: #eaeaea;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgb(172, 172, 172);
  border-radius: 8px;
}
</style>
