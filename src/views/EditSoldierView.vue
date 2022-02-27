<template>
  <div class="page-container">
    <add-edit-soldiers-form
      :initialValues="initialValues"
      :onSubmit="onSubmit"
      buttonText="Edit"
    ></add-edit-soldiers-form>
  </div>
</template>

<script lang="ts">
import AddEditSoldiersForm from "@/components/AddEditSoldiersForm/AddEditSoldiersForm.vue";
import { editSoldier, getSoldier, Soldier } from "@/services/solider";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const initialValues = ref({});
    const { id } = route.params;

    async function onSubmit(formData: Soldier) {
      await editSoldier(+id, formData);

      store.dispatch("alert/showAlert", {
        type: "success",
        message: "Soldier edited successfully.",
      });
      router.push({ name: "soldiersDetailPage", params: { id } });
    }

    onMounted(async () => {
      initialValues.value = await getSoldier(+id);
    });

    return { onSubmit, initialValues };
  },
  name: "EditSoldierView",
  components: {
    "add-edit-soldiers-form": AddEditSoldiersForm,
  },
});
</script>

<style scoped>
.page-container {
  width: 1200px;
  margin: 16px auto;
  padding: 16px 32px;
  border: 3px solid #eee;
  border-radius: 8px;
}
</style>
