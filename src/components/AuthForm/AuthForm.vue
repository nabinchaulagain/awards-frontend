<template>
  <div class="page-container">
    <form class="mui-form mui-panel container" @submit="onSubmit">
      <h1 class="mui--text-display1">
        {{ isSignupForm ? "Sign Up" : "Login" }}
      </h1>
      <input-el
        label="Username"
        :value="formData.username"
        :error="errorMessages.username"
        fieldKey="username"
        :onChange="handleChange"
      />
      <input-el
        label="Email"
        :value="formData.email"
        fieldKey="email"
        :onChange="handleChange"
        :error="errorMessages.email"
        v-if="isSignupForm"
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
        {{ isSignupForm ? "Sign Up" : "Login" }}
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Input from "../commons/form/Input.vue";
import useForm from "../../hooks/useForm";
import { AxiosError } from "axios";
import { SchemaLike } from "yup/lib/types";

export default defineComponent({
  name: "AuthForm",
  components: { "input-el": Input },
  props: {
    isSignupForm: { type: Boolean },
    handleSubmit: {
      type: Function,
      default: () => {
        // do nothing.
      },
    },
    schema: { type: Object },
  },
  setup(props) {
    const initialValues: {
      username: string;
      password: string;
      email?: string;
    } = { username: "", password: "" };

    if (props.isSignupForm) {
      initialValues.email = "";
    }

    const { formData, errorMessages, handleChange, handleSubmit } = useForm({
      initialValues: {},
      schema: props.schema as SchemaLike,
      onSubmit: async function (formData) {
        try {
          await props?.handleSubmit(formData.value);
        } catch (err) {
          if ((err as AxiosError)?.response?.status === 400) {
            errorMessages.value = (
              err as AxiosError
            ).response?.data?.fieldErrors;
          }
        }
      },
    });

    return {
      formData,
      errorMessages,
      handleChange,
      onSubmit: handleSubmit,
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
  box-sizing: border-box;
  height: 100vh;
  background: var(--color-light-green);
  padding-top: 24px;
  display: flex;
  align-items: center;
}
</style>
