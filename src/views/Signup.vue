<template>
  <auth-form isSignupForm :handleSubmit="handleSubmit" :schema="signupSchema">
  </auth-form>
</template>

<script lang="ts">
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { signupSchema } from "@/schemas/auth";
import { signup, SignupPayload } from "@/services/auth";
export default {
  name: "Signup",
  components: { "auth-form": AuthForm },
  setup: function (): unknown {
    const store = useStore();
    const router = useRouter();

    const handleSubmit = async (formData: SignupPayload) => {
      await signup(formData);

      store.dispatch("alert/showAlert", {
        type: "success",
        message: "Account created successfully.",
      });

      router.push("/login");
    };

    return { handleSubmit, signupSchema };
  },
};
</script>
