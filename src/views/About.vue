<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button>I am ElButton</el-button
    ><el-row>
      <el-col :span="12"
        ><div style="background: green; height: 100px"></div></el-col
      ><el-col :span="6"
        ><div style="background: red; height: 100px"></div></el-col
      ><el-col :span="6"
        ><div style="background: grey; height: 100px"></div
      ></el-col>
    </el-row>

    <button @click="openDialog">Close button</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  data: function () {
    return {
      isAlertOpened: false,
    };
  },
  name: "About",
  methods: {
    openDialog: function () {
      this.isAlertOpened = true;

      setTimeout(() => (this.isAlertOpened = false), 2000);
    },
  },
});
</script>

<style scoped></style>
