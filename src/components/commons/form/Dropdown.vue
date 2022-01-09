<template>
  <div class="mui-dropdown">
    <label>{{ label }}</label>
    <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
      {{ value?.[labelKey] || "Please choose an option" }}
      <span class="mui-caret"></span>
    </button>
    <ul class="mui-dropdown__menu">
      <li
        v-for="option in options"
        @click="
          () => {
            this.onChange(fieldKey, option);
          }
        "
        :key="option?.[labelKey]"
      >
        <a href="#"
          ><slot name="option" :option="option">
            {{ option?.[labelKey] }}</slot
          ></a
        >
      </li>
    </ul>
  </div>
  <error-message :message="error" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ErrorMessage from "../ErrorMessage.vue";

export default defineComponent({
  name: "dropdown",
  props: {
    label: { type: String },
    value: { type: Object },
    error: { type: String },
    fieldKey: { type: String },
    onChange: { type: Function },
    options: { type: Array },
    labelKey: { type: String },
  },
  components: { "error-message": ErrorMessage },
});
</script>
<style scoped>
label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 12px;
}

.mui-dropdown__menu {
  max-height: 200px;
  z-index: 400;
  overflow: auto;
  position: absolute;
}

.mui-dropdown {
  position: relative;
}
</style>
