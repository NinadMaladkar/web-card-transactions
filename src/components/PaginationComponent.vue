<template>
  <section class="pagination" v-if="showPagination">
    <button @click="goToPreviousPage" :disabled="currentPage === 1"><</button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="goToNextPage" :disabled="currentPage === totalPages">
      >
    </button>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
  showPagination: boolean;
}>();

const emit = defineEmits(['updatePage']);

function goToPreviousPage(): void {
  if (props.currentPage > 1) {
    emit('updatePage', props.currentPage - 1);
  }
}

function goToNextPage(): void {
  if (props.currentPage < props.totalPages) {
    emit('updatePage', props.currentPage + 1);
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
}

button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: transparent;
  border: none;
  color: #b9b6b6;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:disabled {
  color: #716e6e;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #302f2f;
}
</style>
