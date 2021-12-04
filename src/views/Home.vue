<template>
  <div class="home">
    <button @click="showAlert">West</button>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  setup: function () {
    const store = useStore();

    return {
      showAlert: () => {
        store.dispatch("alert/showAlert", {
          type: "error",
          message: "6-1 is Down",
        });
      },
    };
  },
});
</script>
