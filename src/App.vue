<template>
  <div id="app"><BaseTable :columns="columns" :rows="rows"></BaseTable>,</div>
</template>

<script>
import { columns, rows } from './data';
import BaseTable from './components/BaseTable';

export default {
  name: 'App',
  components: {
    BaseTable,
  },
  data() {
    return {
      columns,
      rows,
    };
  },
};
</script>
<style scoped></style>