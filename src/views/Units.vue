<template>
  <div class="page-container">
    <table-view
      title="Units"
      :rowValues="units"
      :columnsMetadata="columns"
    ></table-view>
  </div>
  <add-unit-dialog :refreshTable="fetchAndSetUnits"> </add-unit-dialog>
</template>

<script lang="ts">
import AddUnitDialog from "@/components/AddUnitDialog/AddUnitDialog.vue";
import TableView from "@/components/commons/TableView.vue";
import countries from "@/constants/countries";
import { getUnits, Unit } from "@/services/unit";
import { computed, defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "Units",
  components: { "table-view": TableView, "add-unit-dialog": AddUnitDialog },
  setup: function () {
    const units = ref<Unit[]>([]);
    const fetchAndSetUnits = async function () {
      units.value = await getUnits();
    };

    const unitsFormatted = computed(() =>
      units.value.map((unit) => {
        const country = getCountry(unit);

        return {
          ...unit,
          country: `${country?.emoji} ${country?.name} `,
        };
      })
    );

    function getCountry(unit: Unit) {
      return countries.find(({ code }) => code === unit.country);
    }

    onMounted(() => {
      fetchAndSetUnits();
    });

    return {
      units: unitsFormatted,
      columns: [
        { path: "name", header: "Name", width: "14rem" },
        { path: "country", header: "Country", width: "14rem" },
        { path: "branch", header: "Branch", width: "14rem" },
      ],
      fetchAndSetUnits,
    };
  },
});
</script>
<style scoped>
.page-container {
  width: 1200px;
  margin: 16px auto;
}
</style>
