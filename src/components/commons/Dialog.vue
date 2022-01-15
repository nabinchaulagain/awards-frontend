<template>
  <div class="overlay" :style="`display:${isOpen ? 'initial' : 'none'}`">
    <div class="dialog" ref="dialog">
      <div class="dialog-header">
        <div class="header-text">{{ header }}</div>
        <div class="close-container" @click="closeDialog">
          <vue-icon icon="times" size="24px" />
        </div>
      </div>
      <div class="divider"></div>
      <div class="main-content"><slot></slot></div>

      <div class="divider"></div>
      <div class="buttons">
        <button class="mui-btn mui-btn--accent" @click="onSubmit">
          {{ submitButtonText }}</button
        ><button class="mui-btn mui-btn--raised" @click="closeDialog">
          {{ cancelButtonText }}
        </button>
      </div>
    </div>
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
        dialog.value.setAttribute(
          "style",
          `top: calc(50% - ${
            dialog.value.clientHeight / 2
          }px); left: calc(50% - ${dialog.value.clientWidth / 2}px)`
        );
      }
    };
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        event.target !== dialog.value &&
        !dialog?.value?.contains(event?.target as Node)
      ) {
        // props.closeDialog();
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
    header: { type: String, required: true },
    submitButtonText: { type: String, default: () => "Submit" },
    cancelButtonText: { type: String, default: () => "Cancel" },
    onSubmit: { type: Function },
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
  width: 500px;
  border-radius: 4px;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4);
  background: white;
  position: absolute;
  padding: 16px;
}

.dialog-header {
  display: flex;
}

.header-text {
  flex-grow: 2;
  font-size: 24px;
}

.close-container {
  cursor: pointer;
}

.divider {
  height: 2px;
  width: calc(100% + 32px);
  background: rgba(0, 0, 0, 0.14);
  margin-top: 8px;
  margin-left: -16px;
  margin-bottom: 8px;
}

.buttons {
  margin-top: 16px;
}

.buttons button {
  margin-right: 8px;
}

.main-content {
  max-height: 500px;
  overflow: auto;
}
</style>
