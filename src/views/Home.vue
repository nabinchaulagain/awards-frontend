<template>
  <div class="home"></div>
  <soldiers-table></soldiers-table>
</template>

<script lang="ts">
import SoldiersTable from "@/components/SoldiersTable/SoldiersTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { "soldiers-table": SoldiersTable },
});
</script>
