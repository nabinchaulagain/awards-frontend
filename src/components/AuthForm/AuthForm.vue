<template>
  <div class="page-container">
    <form class="mui-form mui-panel container" @submit="handleSubmit">
      <h1 class="mui--text-display1">Login</h1>
      <input-el
        label="Username"
        :value="formData.username"
        :error="errorMessages.username"
        fieldKey="username"
        :onChange="handleChange"
      />
      <input-el
        label="Password"
        :value="formData.password"
        :error="errorMessages.password"
        fieldKey="password"
        :onChange="handleChange"
        type="password"
      />
      <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">
        Login
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import authSchema from "../../schemas/auth";
import Input from "../commons/form/Input.vue";
import useForm from "../../hooks/useForm";
import { AxiosError } from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Login",
  components: { "input-el": Input },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { formData, errorMessages, handleChange, handleSubmit } = useForm({
      initialValues: { username: "", password: "" },
      schema: authSchema,
      onSubmit: async function (formData) {
        try {
          await store.dispatch("auth/login", formData.value);
          store.dispatch("alert/showAlert", {
            type: "success",
            message: "You are successfully logged in.",
          });
          router.push("/test");
        } catch (err) {
          errorMessages.value = (err as AxiosError).response?.data?.fieldErrors;
        }
      },
    });

    return {
      formData,
      errorMessages,
      handleChange,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.container {
  width: 500px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgb(0 0 0 / 20%), 0 0 4px 0 rgb(0 0 0 / 20%);
}

h1 {
  margin: 0;
  margin-bottom: 16px;
}

.page-container {
  height: 100vh;
  background: var(--color-light-green);
  padding-top: 24px;
  display: flex;
  align-items: center;
}
</style>
