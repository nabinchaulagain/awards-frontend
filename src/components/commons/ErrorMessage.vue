<template>
  <div class="message-container">{{ $props.message }}</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: { type: String },
  },
  name: "ErrorMessage",
});
</script>
<style scoped>
.message-container {
  margin: 8px 0;
  color: #d50000;
  font-size: 12px;
}
</style>
