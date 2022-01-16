<template>
  <h1 v-if="isLoadingAuthStatus">Loading....</h1>
  <router-view v-else></router-view>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "Private page",
  setup: function () {
    const router = useRouter();
    const store = useStore();

    const isLoadingAuthStatus = computed(
      () => store?.state?.auth?.isLoadingAuthStatus
    );
    const isLoggedIn = computed(() => store?.state?.auth?.isLoggedIn);

    function redirectIfNotLoggedIn() {
      if (!isLoadingAuthStatus.value && !isLoggedIn.value) {
        router.replace("/login");
      }
    }

    onMounted(redirectIfNotLoggedIn);

    watch([isLoadingAuthStatus, isLoggedIn], () => {
      redirectIfNotLoggedIn();
    });

    return { isLoadingAuthStatus };
  },
});
</script>
