<template>
  <popup-dialog
    :isDialogOpen="isOpen"
    :closeDialog="closeDialog"
  ></popup-dialog>
  <div class="add-soldier-container">
    <button class="mui-btn mui-btn--fab mui-btn--danger" @click="openDialog">
      +
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Dialog from "../commons/Dialog.vue";

export default defineComponent({
  name: "AddSoldierDialog",
  components: {
    "popup-dialog": Dialog,
  },
  setup: function () {
    const isOpen = ref(false);
    const openDialog = function (event: MouseEvent) {
      event.stopPropagation();
      console.log("opened");

      isOpen.value = true;
    };
    const closeDialog = function () {
      console.log("closed");
      isOpen.value = false;
    };

    return { isOpen, openDialog, closeDialog };
  },
});
</script>
<style scoped>
.add-soldier-container {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.add-soldier-container button {
  font-size: 28px;
}
</style>
