<template>
  <header>Header here</header>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Private page",
  setup: function () {
    const router = useRouter();

    onMounted(async () => {
      const test = await window.fetch(
        "https://dev.to/shubhadip/vue-3-vuex-4-modules-typescript-2i2o"
      );

      const test2 = true;

      if (test2) {
        router.replace("/");
      }
    });
  },
});
</script>
