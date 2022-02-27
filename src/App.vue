<template>
  <router-view v-if="!$store.state.auth.isLoadingAuthStatus" />
  <alert></alert>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import Alert from "./components/commons/Alert.vue";

export default defineComponent({
  components: { alert: Alert },
  setup: function () {
    const store = useStore();
    onMounted(() => {
      store.dispatch("auth/loadAuthState");
    });
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
  --color-grey: #808080;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgb(172, 172, 172);
  border-radius: 8px;
}

.text-center {
  text-align: center;
}

.text-justify {
  text-align: justify;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.font-sm {
  font-size: 12px;
}

.font-md {
  font-size: 16px;
}

.font-lg {
  font-size: 20px;
}

.font-xl {
  font-size: 24px;
}

.font-xxl {
  font-size: 28px;
}

.bold-semi {
  font-weight: 550;
}

.bold {
  font-weight: 600;
}
</style>
