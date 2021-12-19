<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th
            v-for="(column, index) in sortedColumns"
            :key="`column-${index}`"
            :draggable="isDraggingActive && column.draggable"
            @dragstart="onColumnDragStart($event, index)"
            @dragover.prevent
            @dragenter.prevent
            @drop="onColumnDrop($event, index)"
          >
            <div class="table-header">
              <span
                :class="isDraggingActive && column.draggable && 'draggable'"
              >
              </span>
              <button
                v-if="isSortingActive && column.sortable"
                @click="sortDataByColumn(column.field)"
                @dblclick="removeSortDataFromList(column.field)"
                type="button"
                class="sort-btn"
                :class="getSortInfoByField(column.field) && 'active-btn'"
              >
                <span>{{ getSortOrder(column.field) }}</span>
                <font-awesome-icon icon="sort" />
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="`row-${index}`">
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
import { orderBy } from 'lodash';

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
      sortedRows: this.rows,
      sortInformations: [],
    };
  },
  watch: {
    sortInformations: {
      handler(value) {
        if (value?.length) {
          const fields = this.sortInformations.map((item) => item.field);
          const orders = this.sortInformations.map((item) => item.orderBy);
          this.sortedRows = orderBy(this.sortedRows, fields, orders);
        }
      },
      deep: true,
    },
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
    
    sortDataByColumn(field) {
      const ASCENDING_KEY = 'asc';
      const DESCENDING_KEY = 'desc';
      let sortInfo = this.getSortInfoByField(field);
      if (sortInfo) {
        if (sortInfo.orderBy === ASCENDING_KEY) {
          sortInfo.orderBy = DESCENDING_KEY;
        } else {
          sortInfo.orderBy = ASCENDING_KEY;
        }
      } else {
        sortInfo = {
          orderBy: ASCENDING_KEY,
          field,
        };
        this.sortInformations.push(sortInfo);
      }
    },
    getSortOrder(field) {
      const index = this.getSortInfoIndexByField(field);
      return index > -1 ? index + 1 : null;
    },
    removeSortDataFromList(field) {
      const index = this.getSortInfoIndexByField(field);
      this.sortInformations.splice(index, 1);
    },
    getSortInfoByField(field) {
      return this.sortInformations.find((item) => item.field === field);
    },
    getSortInfoIndexByField(field) {
      return this.sortInformations.findIndex((item) => item.field === field);
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
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sort-btn {
  color: #212529;
  background-color: #f8f9fa;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
}
.sort-btn:focus {
  outline: none;
}
.sort-btn svg {
  margin-left: 10px;
}
.active-btn {
  background-color: rgb(48, 133, 245);
  color: #f8f9fa;
}
</style>