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
    </div>
  </popup-dialog>
  <div class="add-soldier-container" v-if="isAdmin">
    <button class="mui-btn mui-btn--fab mui-btn--danger" @click="openDialog">
      +
    </button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import Dialog from "../commons/Dialog.vue";
import Dropdown from "../commons/form/Dropdown.vue";
import Input from "../commons/form/Input.vue";
import ImageInput from "../commons/form/ImageInput.vue";
import countryOptions from "../../constants/countries";
import useForm from "@/hooks/useForm";
import soldierSchema from "../../schemas/soldier";
import { addSoldier } from "@/services/solider";
import { getUnits, Unit } from "@/services/unit";
import { useStore } from "vuex";

export default defineComponent({
  name: "AddSoldierDialog",
  components: {
    "popup-dialog": Dialog,
    "input-el": Input,
    "dropdown-el": Dropdown,
    "image-input": ImageInput,
  },
  props: {
    refreshTable: { type: Function, required: true },
  },
  setup: function (props) {
    const store = useStore();
    const { formData, errorMessages, handleChange, handleSubmit } = useForm({
      initialValues: {},
      schema: soldierSchema,
      onSubmit: async (formData) => {
        await addSoldier({
          ...formData.value,
        });

        isOpen.value = false;
        await props.refreshTable();
      },
    });
    const unitOptions = ref<Unit[]>([]);

    onMounted(async () => {
      unitOptions.value = [...(await getUnits())];
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
      unitOptions,
      isAdmin: computed(() => store.state.auth.isAdmin),
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
