<template>
  <div class="container">
    <button class="mui-btn" @click="onClickBefore">
      <vue-icon icon="arrow-left" color="white"></vue-icon>
    </button>

    <button class="mui-btn" disabled>
      {{ page }}
    </button>

    <button class="mui-btn" @click="onClickAfter">
      <vue-icon icon="arrow-right" color="white"></vue-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "pagination",
  props: {
    size: { type: Number, required: true },
    pageSize: { type: Number, required: true },
    page: { type: Number, required: true },
    gotoPage: { type: Function, required: true },
  },
  setup(props) {
    const numPages =
      computed(() => Math.ceil(props.size / props.pageSize)) || 1;
    const onClickBefore = () => {
      if (props.page - 1 < 1) {
        return;
      }

      props.gotoPage(props.page - 1);
    };

    const onClickAfter = () => {
      if (props.page + 1 > props.size) {
        return;
      }

      props.gotoPage(props.page + 1);
    };

    return { numPages, onClickBefore, onClickAfter };
  },
});
</script>
<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-self: center;
}

button {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  padding: 0;
  background: black;
  color: white;
}
</style>
