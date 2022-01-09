<template>
  <popup-dialog
    :isDialogOpen="isOpen"
    :closeDialog="closeDialog"
    header="Add Soldier"
    :onSubmit="handleSubmit"
  >
    <div class="form">
      <image-input
        :onChange="handleChange"
        fieldKey="picture"
        :image="formData.picture"
      />
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
        draggable="true"
        label="Unit"
        fieldKey="unit"
        :onChange="handleChange"
        :value="formData.unit"
        :error="errorMessages.unit"
      ></input-el>
      <input-el
        label="Rank"
        fieldKey="rank"
        :onChange="handleChange"
        :value="formData.rank"
        :error="errorMessages.rank"
      ></input-el>
      <div class="two-column-grid">
        <input-el
          label="Service start date"
          type="date"
          fieldKey="serviceStartDate"
          :onChange="handleChange"
          :value="formData.serviceStartDate"
          :error="errorMessages.serviceStartDate"
        ></input-el>
        <input-el
          label="Service end date"
          type="date"
          fieldKey="serviceEndDate"
          :onChange="handleChange"
          :value="formData.serviceEndDate"
          :error="errorMessages.serviceEndDate"
        ></input-el>
      </div>
    </div>
  </popup-dialog>
  <div class="add-soldier-container">
    <button class="mui-btn mui-btn--fab mui-btn--danger" @click="openDialog">
      +
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Dialog from "../commons/Dialog.vue";
import Dropdown from "../commons/form/Dropdown.vue";
import Input from "../commons/form/Input.vue";
import ImageInput from "../commons/form/ImageInput.vue";
import countryOptions from "../../constants/countries";
import useForm from "@/hooks/useForm";
import soldierSchema from "../../schemas/soldier";

export default defineComponent({
  name: "AddSoldierDialog",
  components: {
    "popup-dialog": Dialog,
    "input-el": Input,
    "dropdown-el": Dropdown,
    "image-input": ImageInput,
  },
  setup: function () {
    const { formData, errorMessages, handleChange, handleSubmit } = useForm({
      initialValues: {},
      schema: soldierSchema,
      onSubmit: (formData) => {
        console.log("submit", formData);
        //do nothing
      },
    });

    const isOpen = ref(false);
    const openDialog = function (event: MouseEvent) {
      event.stopPropagation();

      isOpen.value = true;
    };
    const closeDialog = function () {
      isOpen.value = false;
      formData.value = {};
      errorMessages.value = {};
    };

    return {
      isOpen,
      openDialog,
      closeDialog,
      countryOptions,
      formData,
      errorMessages,
      handleChange,
      handleSubmit,
    };
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

.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}
</style>
