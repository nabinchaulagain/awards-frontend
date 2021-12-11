<template>
  <router-view />
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
</style>
