<template>
  <div class="page-container">
    <h1>Add Soldier</h1>
    <add-edit-soldiers-form :onSubmit="onSubmit"> </add-edit-soldiers-form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import AddEditSoldiersForm from "@/components/AddEditSoldiersForm/AddEditSoldiersForm.vue";
import { addSoldier } from "@/services/solider";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "AddSoldierView",
  setup() {
    const router = useRouter();
    const store = useStore();

    async function onSubmit(formData: Record<string, unknown>) {
      const { id } = await addSoldier(formData);

      store.dispatch("alert/showAlert", {
        type: "success",
        message: "Soldier added successfully.",
      });
      router.push({ name: "soldiersDetailPage", params: { id } });
    }

    return { onSubmit };
  },
  components: { "add-edit-soldiers-form": AddEditSoldiersForm },
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
