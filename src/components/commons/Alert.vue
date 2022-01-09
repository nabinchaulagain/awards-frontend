<template>
  <el-alert
    class="el-alert"
    :title="title"
    :type="type"
    show-icon
    ref="alert"
    v-if="isOpen"
    effect="dark"
    :closable="false"
  >
  </el-alert>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Alert",

  setup: function () {
    const store = useStore();
    const alert = store.state.alert;

    return {
      title: computed(() => alert?.message),
      type: computed(() => alert?.type),
      isOpen: computed(() => alert?.isOpen),
    };
  },
});
</script>

<style scoped>
.el-alert {
  position: fixed;
  bottom: 4px;
  right: 4px;
  width: auto;
  padding: 20px 24px;
  z-index: 2;
}

.el-alert {
  --el-alert-title-font-size: 18px;
  --el-alert-icon-size: 20px;
  --el-alert-close-font-size: 18px;
}

span.el-alert__title {
  margin-right: 24px;
}
</style>
