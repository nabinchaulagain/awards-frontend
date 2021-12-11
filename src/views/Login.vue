<template>
  <auth-form> </auth-form>
</template>

<script lang="ts">
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { "auth-form": AuthForm },
});
</script>
