<template>
  <div class="page-container">
    <div class="image-container">
      <img :src="soldier.picture" />
    </div>
    <div class="text-center font-md">
      <div class="bold font-xxl">{{ soldier.name }}</div>
      <div>
        Rank: <span class="bold">{{ soldier.rank }}</span>
      </div>
      <div>
        Allegiance:
        <span class="bold-semi"> {{ soldier.allegiance }} </span> ({{
          soldier.serviceStartDate
        }}
        to {{ soldier.serviceEndDate }})
      </div>
      <p class="text-justify">
        {{ soldier.description }}
      </p>
    </div>
    <div></div>
  </div>
</template>
<script lang="ts">
import { getSoldier, Soldier } from "@/services/solider";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getSoldierAllegiance } from "@/utils/misc";

export default defineComponent({
  setup() {
    const route = useRoute();
    const soldier = ref<Soldier | null>(null);

    onMounted(async () => {
      soldier.value = { ...(await getSoldier(+route.params.id)) };
    });

    return {
      soldier: computed(() => {
        if (soldier.value) {
          return {
            ...soldier.value,
            allegiance: getSoldierAllegiance(soldier.value),
            serviceStartDate: new Date(
              soldier.value.serviceStartDate
            ).toLocaleDateString(),
            serviceEndDate: new Date(
              soldier.value.serviceEndDate
            ).toLocaleDateString(),
          };
        }

        return {};
      }),
    };
  },
  name: "SoldiersDetail",
});
</script>

<style scoped>
.page-container {
  width: 1200px;
  margin: 16px auto;
}

.image-container {
  width: 300px;
  margin: auto;
}

.image-container img {
  width: 100%;
}

p {
  margin-top: 16px;
}
</style>
