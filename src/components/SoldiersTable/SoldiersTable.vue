<template>
  <div class="page-container">
    <table-view
      title="Soldiers"
      :rowValues="soldiers"
      :columnsMetadata="columns"
    ></table-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import TableView from "../commons/TableView.vue";
import { getSoldiers, Soldier } from "@/services/solider";
import countries from "@/constants/countries";

export default defineComponent({
  setup() {
    const soldiersList = ref<Soldier[]>([]);
    const isLoading = ref(true);

    onMounted(async () => {
      soldiersList.value = await getSoldiers();
    });

    function getCountry(soldier: Soldier) {
      return countries.find(({ code }) => code === soldier?.unit?.country);
    }

    const soldiers = computed(() =>
      soldiersList.value.map((soldier) => ({
        ...soldier,
        unit: ` ${getCountry(soldier)?.emoji} ${soldier?.unit?.name}, ${
          soldier?.unit?.branch
        }, ${soldier?.unit?.country}`,
        yearsOfService: `${new Date(
          soldier.serviceStartDate
        ).toLocaleDateString()} - ${new Date(
          soldier.serviceEndDate
        ).toLocaleDateString()}`,
      }))
    );

    return {
      columns: [
        { path: "name", header: "Name", width: "8rem" },
        { path: "unit", header: "Unit", width: "14rem" },
        { path: "rank", header: "Rank", width: "10rem" },
        { path: "yearsOfService", header: "Years of service", width: "12rem" },
      ],
      isLoading,
      soldiers,
    };
  },
  components: { "table-view": TableView },
});
</script>

<style scoped>
.page-container {
  width: 1200px;
  margin: 16px auto;
}
</style>
