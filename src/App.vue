<template>
  <router-view />
  <alert></alert>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Alert from "./components/commons/Alert.vue";

export default defineComponent({
  components: { alert: Alert },
});
</script>

<style lang="css"></style>
