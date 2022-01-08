<template>
  <div class="overlay" :style="`display:${isOpen ? 'initial' : 'none'}`">
    <div class="dialog" ref="dialog"></div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";

export default defineComponent({
  setup(props) {
    const dialog = ref<HTMLDivElement | null>(null);

    const setDialogPosition = function () {
      if (dialog.value) {
        console.log(dialog);
        dialog.value.setAttribute(
          "style",
          `top: calc(50% - ${
            dialog.value.clientHeight / 2
          }px); left: calc(50% - ${dialog.value.clientWidth / 2}px)`
        );
      }
    };
    const handleOutSideClick = (event: MouseEvent) => {
      if (event.target !== dialog.value) {
        props.closeDialog();
      }
    };

    onUpdated(() => {
      setDialogPosition();
    });

    onMounted(() => {
      window.addEventListener("click", handleOutSideClick);
    });

    onUnmounted(() => {
      window.removeEventListener("click", handleOutSideClick);
    });

    return { dialog, isOpen: computed(() => props.isDialogOpen) };
  },
  name: "Dialog",
  props: {
    isDialogOpen: { type: Boolean, default: false, required: true },
    closeDialog: { type: Function, required: true },
  },
});
</script>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dialog {
  min-width: 600px;
  min-height: 800px;
  background: white;
  position: absolute;
}
</style>
