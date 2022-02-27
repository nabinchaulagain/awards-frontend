<template>
  <popup-dialog
    :isDialogOpen="isOpen"
    :closeDialog="closeDialog"
    header="Add Unit"
    :onSubmit="handleSubmit"
  >
    <input-el
      label="Name"
      fieldKey="name"
      :onChange="handleChange"
      :value="formData.name"
      :error="errorMessages.name"
    ></input-el>
    <dropdown-el
      label="Country"
      fieldKey="country"
      :options="countryOptions"
      labelKey="name"
      :onChange="handleChange"
      :value="formData.country"
      :error="errorMessages.country"
    >
      <template v-slot:option="props">
        {{ props.option.emoji }}
        {{ props.option.name }}
      </template>
    </dropdown-el>
    <input-el
      label="Branch"
      fieldKey="branch"
      :onChange="handleChange"
      :value="formData.branch"
      :error="errorMessages.branch"
    ></input-el
    ><input-el
      type="date"
      label="Established date"
      fieldKey="establishedDate"
      :onChange="handleChange"
      :value="formData.establishedDate"
      :error="errorMessages.establishedDate"
    ></input-el>
  </popup-dialog>
  <div class="add-unit-container" v-if="isAdmin">
    <button class="mui-btn mui-btn--fab mui-btn--danger" @click="openDialog">
      +
    </button>
  </div>
</template>
<script lang="ts">
import countries from "@/constants/countries";
import useForm from "@/hooks/useForm";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Dialog from "../commons/Dialog.vue";
import Dropdown from "../commons/form/Dropdown.vue";
import Input from "../commons/form/Input.vue";
import unitSchema from "../../schemas/unit";
import { addUnit, Unit } from "@/services/unit";

export default defineComponent({
  setup(props) {
    const store = useStore();
    const isOpen = ref(false);

    const { formData, errorMessages, handleChange, handleSubmit } = useForm({
      initialValues: {},
      schema: unitSchema,
      onSubmit: async (formData) => {
        await addUnit({
          ...formData.value,
          country: (formData.value as unknown as { country: { code: string } })
            ?.country?.code,
        } as unknown as Unit);

        isOpen.value = false;
        props.refreshTable();
      },
    });
    function openDialog() {
      isOpen.value = true;
    }

    function closeDialog() {
      isOpen.value = false;
    }

    const isAdmin = computed(() => store.state.auth.isAdmin);

    return {
      isOpen,
      isAdmin,
      openDialog,
      closeDialog,
      countryOptions: countries,
      formData,
      errorMessages,
      handleChange,
      handleSubmit,
    };
  },
  components: {
    "popup-dialog": Dialog,
    "dropdown-el": Dropdown,
    "input-el": Input,
  },
  props: { refreshTable: { type: Function, required: true } },
});
</script>
<style scoped>
.add-unit-container {
  position: fixed;
  bottom: 16px;
  right: 16px;
}

.add-unit-container button {
  font-size: 28px;
}
</style>
