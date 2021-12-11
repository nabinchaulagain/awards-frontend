<template>
  <auth-form :handleSubmit="handleSubmit" :schema="loginSchema"></auth-form>
</template>

<script lang="ts">
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { loginSchema } from "@/schemas/auth";

export default defineComponent({
  name: "Login",
  components: { "auth-form": AuthForm },
  setup: function () {
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async (formData: unknown) => {
      await store.dispatch("auth/login", formData);

      store.dispatch("alert/showAlert", {
        type: "success",
        message: "You are successfully logged in.",
      });
      router.push("/test");
    };

    return { handleSubmit, loginSchema };
  },
});
</script>
