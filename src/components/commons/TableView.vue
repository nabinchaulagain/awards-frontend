<template>
  <h1>{{ title }}</h1>
  <div :style="`max-height:${maxHeight};overflow:auto;`">
    <table class="mui-table mui-table--bordered">
      <thead>
        <tr>
          <th
            v-for="columnMetadata in columnsMetadata"
            :key="columnMetadata.path"
            :style="`width:${columnMetadata.width || 'auto'}`"
          >
            <slot name="header" :columnMetadata="columnMetadata">
              {{ columnMetadata.header }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rowValue in rowValues" :key="rowValue.id">
          <td
            v-for="columnMetadata in columnsMetadata"
            :key="columnMetadata.path"
            :style="`width:${columnMetadata.width || 'auto'}`"
          >
            <slot name="column"> {{ rowValue?.[columnMetadata?.path] }} </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface ColumnMetadata {
  header: string;
  path: string;
}

export default defineComponent({
  name: "TableView",
  props: {
    title: { type: String },
    columnsMetadata: { type: Array as PropType<ColumnMetadata[]> },
    rowValues: { type: Array },
    maxHeight: { type: String, default: "500px" },
  },
});
</script>
<style scoped>
table {
  border-spacing: 0;
}

.mui-table > thead > tr > th {
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-right: none;
}

.mui-table > thead > tr > th:last-of-type {
  border-right: 2px solid rgba(0, 0, 0, 0.12);
}

.mui-table > tbody > tr > td {
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-top: none;
  border-right: none;
}

.mui-table > tbody > tr > td:last-of-type {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
