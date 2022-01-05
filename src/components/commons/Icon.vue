<template>
  <i
    :class="`fas fa-${icon}`"
    :style="`font-size: ${size}; color: ${color};line-height:calc(${size} + 8px); `"
  ></i>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Icon",
  props: {
    icon: { type: String },
    size: { type: String, default: "16px" },
    color: { type: String, default: "var(--color-grey)" },
  },
});
</script>
