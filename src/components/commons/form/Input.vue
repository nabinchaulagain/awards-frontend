<template>
  <div
    :class="
      type === 'text' || type === 'password'
        ? 'mui-textfield mui-textfield--float-label'
        : ''
    "
  >
    <label v-if="type === 'date'" class="date-label">{{ label }}</label>
    <input
      :type="type"
      @input="handleChange"
      :value="value"
      v-if="!isTextArea"
    />
    <textarea @input="handleChange" v-else>{{ value }} </textarea>
    <label v-if="type !== 'date'">{{ label }}</label>
    <error :message="error" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ErrorMessage from "../ErrorMessage.vue";

export default defineComponent({
  props: {
    value: { type: String },
    error: { type: String },
    label: { type: String },
    fieldKey: { type: String },
    onChange: { type: Function },
    type: { type: String, default: "text" },
    isTextArea: { type: Boolean },
  },
  components: { error: ErrorMessage },
  setup(props) {
    const handleChange = function (event: MouseEvent) {
      props.onChange?.(
        props.fieldKey,
        (event?.target as HTMLInputElement).value
      );
    };

    return { handleChange };
  },
  name: "Input",
});
</script>

<style scoped>
.date-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 12px;
}

input {
  width: 100%;
}
</style>
