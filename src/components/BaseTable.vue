<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th
            v-for="(column, index) in sortedColumns"
            :key="`column-${index}`"
            :draggable="isDraggable(column)"
            :class="isDraggable(column) && 'draggable'"
            @dragstart="onColumnDragStart($event, index)"
            @dragover.prevent
            @dragenter.prevent
            @drop="onColumnDrop($event, index)"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="`row-${index}`">
          <td
            v-for="(colInRowItem, colInRowIndex) in sortedColumns"
            :key="`column-in-row-${colInRowIndex}`"
          >
            {{ row[colInRowItem.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    isSortingActive: {
      type: Boolean,
      default: true,
    },
    isDraggingActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      sortedColumns: this.columns,
    };
  },
  methods: {
    onColumnDragStart(event, index) {
      event.dataTransfer.setData('draggedIndex', index);
    },
    onColumnDrop(event, droppedIndex) {
      const draggedIndex = Number(event.dataTransfer.getData('draggedIndex'));
      if (draggedIndex !== droppedIndex) {
        const item = this.sortedColumns[draggedIndex];
        this.sortedColumns.splice(draggedIndex, 1);
        this.sortedColumns = [
          ...this.sortedColumns.slice(0, droppedIndex),
          item,
          ...this.sortedColumns.slice(droppedIndex),
        ];
      }
    },
    isDraggable(item) {
      return this.isDraggingActive && item.draggable;
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  padding: 8px 16px;
  overflow-x: auto;
}
table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
}
table td,
table th {
  border: 1px solid #dee2e6;
  padding: 4px;
  text-align: left;
  min-width: 150px;
}
tbody tr:hover {
  background-color: #00000013;
}
.draggable {
  cursor: move;
}
</style>