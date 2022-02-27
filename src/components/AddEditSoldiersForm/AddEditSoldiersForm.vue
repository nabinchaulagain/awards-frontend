<template>
  <div class="form">
    <image-input
      :onChange="handleChange"
      fieldKey="picture"
      :image="formData.picture"
      :error="errorMessages.picture"
    />
    <input-el
      label="Name"
      fieldKey="name"
      :onChange="handleChange"
      :value="formData.name"
      :error="errorMessages.name"
    ></input-el>
    <div class="two-column-grid">
      <input-el
        label="Birthplace"
        fieldKey="birthplace"
        :onChange="handleChange"
        :value="formData.birthplace"
        :error="errorMessages.birthplace"
      ></input-el>
      <input-el
        label="Date of birth"
        type="date"
        fieldKey="dateOfBirth"
        :onChange="handleChange"
        :value="formData.dateOfBirth"
        :error="errorMessages.dateOfBirth"
      ></input-el>

      <input-el
        label="Deathplace"
        fieldKey="deathplace"
        :onChange="handleChange"
        :value="formData.deathplace"
        :error="errorMessages.deathplace"
      ></input-el>
      <input-el
        label="Date of death"
        type="date"
        fieldKey="dateOfDeath"
        :onChange="handleChange"
        :value="formData.dateOfDeath"
        :error="errorMessages.dateOfDeath"
      ></input-el>
    </div>
    <dropdown-el
      label="Unit"
      fieldKey="unit"
      :onChange="handleChange"
      labelKey="name"
      :options="unitOptions"
      :value="formData.unit"
      :error="errorMessages.unit"
    ></dropdown-el>
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
    <input-el
      label="Description"
      isTextArea
      fieldKey="description"
      :onChange="handleChange"
      :value="formData.description"
      :error="errorMessages.description"
    />
    <button class="mui-btn mui-btn--primary" @click="handleSubmit">
      {{ buttonText }}
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import Dropdown from "../commons/form/Dropdown.vue";
import Input from "../commons/form/Input.vue";
import ImageInput from "../commons/form/ImageInput.vue";
import countryOptions from "../../constants/countries";
import useForm from "@/hooks/useForm";
import soldierSchema from "../../schemas/soldier";
import { getUnits, Unit } from "@/services/unit";
import { useStore } from "vuex";

export default defineComponent({
  name: "AddEditSoldierForm",
  components: {
    "input-el": Input,
    "dropdown-el": Dropdown,
    "image-input": ImageInput,
  },
  props: {
    onSubmit: { type: Function, required: true },
    initialValues: { type: Object },
    buttonText: { type: String, default: "Add" },
  },
  setup: function (props) {
    const store = useStore();
    const { formData, errorMessages, handleChange, handleSubmit } = useForm({
      initialValues: (() => props.initialValues as Ref) ?? {},
      schema: soldierSchema,
      onSubmit: async (formData) => {
        props.onSubmit(formData.value);
      },
    });
    const unitOptions = ref<Unit[]>([]);

    onMounted(async () => {
      unitOptions.value = [...(await getUnits())];
    });

    return {
      countryOptions,
      formData,
      errorMessages,
      handleChange,
      handleSubmit,
      unitOptions,
      isAdmin: computed(() => store.state.auth.isAdmin),
    };
  },
});
</script>
<style scoped>
.two-column-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}
</style>
