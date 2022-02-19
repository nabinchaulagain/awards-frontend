<template>
  <div class="page-container">
    <table-view
      title="Soldiers"
      :rowValues="soldiers"
      :columnsMetadata="columns"
    >
      <template v-slot:header="{ columnMetadata }"
        >{{ columnMetadata.header }}
      </template>
      <template v-slot:column="{ columnMetadata, rowValue }">
        <router-link
          :to="{ name: 'soldiersDetailPage', params: { id: rowValue?.id } }"
          v-if="columnMetadata.path === 'name'"
        >
          {{ rowValue?.[columnMetadata.path] }}
        </router-link>
        <div v-else>{{ rowValue?.[columnMetadata.path] }}</div>
      </template>
    </table-view>
    <pagination
      :page="currentPage"
      :pageSize="3"
      :size="maxPages"
      :gotoPage="gotoPage"
    ></pagination>
    <add-soldier-dialog
      :refreshTable="fetchAndSetSoldiers"
    ></add-soldier-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import TableView from "../commons/TableView.vue";
import { getSoldiers, Soldier } from "@/services/solider";
import countries from "@/constants/countries";
import Pagination from "../commons/Pagination.vue";
import AddSoldierDialog from "../AddSoldierDialog/AddSoldierDialog.vue";

export default defineComponent({
  setup() {
    const soldiersList = ref<Soldier[]>([]);
    const isLoading = ref(true);
    const maxPages = ref(0);
    const currentPage = ref(1);

    const fetchAndSetSoldiers = async function () {
      const response = await getSoldiers(currentPage.value);
      soldiersList.value = response.data;
      maxPages.value = Math.ceil(response.size / 3);
    };

    onMounted(async () => {
      await fetchAndSetSoldiers();
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

    function gotoPage(page: number) {
      currentPage.value = page;

      fetchAndSetSoldiers();
    }

    return {
      columns: [
        { path: "name", header: "Name", width: "8rem" },
        { path: "unit", header: "Unit", width: "14rem" },
        { path: "rank", header: "Rank", width: "10rem" },
        { path: "yearsOfService", header: "Years of service", width: "12rem" },
      ],
      isLoading,
      soldiers,
      maxPages,
      currentPage,
      gotoPage,
      fetchAndSetSoldiers,
    };
  },
  components: {
    "table-view": TableView,
    Pagination,
    "add-soldier-dialog": AddSoldierDialog,
  },
});
</script>

<style scoped>
.page-container {
  width: 1200px;
  margin: 16px auto;
}
</style>
