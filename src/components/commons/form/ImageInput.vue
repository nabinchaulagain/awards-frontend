<template>
  <input type="file" />
  <div
    :class="`image-container ${isDragging ? 'drag-active' : ''}`"
    draggable="true"
    @drop="handleDrop"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragEnter"
  >
    <img :src="image" v-if="image" />
    <div class="drop-container" v-else>Please drop a file here</div>
  </div>
  <error :message="error" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { uploadFile } from "@/services/file";
import ErrorMessage from "../ErrorMessage.vue";

export default defineComponent({
  setup(props) {
    const isDragging = ref(false);
    const store = useStore();

    function handleDragEnter(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();

      isDragging.value = true;
    }

    function handleDragLeave(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();

      isDragging.value = false;
    }

    async function handleDrop(ev: DragEvent) {
      ev.preventDefault();
      ev.stopPropagation();
      const fileToUpload = ev.dataTransfer?.files[0];
      if (
        fileToUpload &&
        ["image/png", "image/jpeg"].includes(fileToUpload.type)
      ) {
        const response = await uploadFile(fileToUpload);

        props.onChange(props.fieldKey, response.link);
      } else {
        store.dispatch("alert/showAlert", {
          type: "error",
          message: "Invalid file type.",
        });
      }
    }

    return { handleDragEnter, handleDrop, handleDragLeave, isDragging };
  },
  name: "image-input",
  components: { error: ErrorMessage },
  props: {
    image: { type: String },
    onChange: { type: Function, required: true },
    fieldKey: { type: String, required: true },
    error: { type: String },
  },
});
</script>
<style scoped>
input {
  display: none;
}

.image-container {
  background: rgba(125, 125, 126, 0.1);
  padding: 16px;
  margin: 12px 0;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  border: 1px dashed rgba(125, 125, 126, 0.7);
  transition: 200ms all;
}

.drag-active {
  opacity: 1;
  border: none;
}

img {
  height: 100%;
  padding: 8px;
  border: 1px dashed rgba(125, 125, 126, 0.5);
}

.drop-container {
  font-size: 28px;
  text-align: center;
  pointer-events: none;
}
</style>
