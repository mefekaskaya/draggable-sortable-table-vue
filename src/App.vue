<template>
  <div id="app">
    <BaseTable :columns="columns" :rows="rows" :loading="loading" />
  </div>
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
      loading: false,
    };
  },
  beforeMount() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
};
</script>
<style scoped>
</style>