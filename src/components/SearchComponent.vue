<template>
  <section class="input-container">
    <input
      v-model="filterValue"
      :disabled="!store.state.selectedCard"
      type="text"
      class="filter-input"
      data-testid="filter-input"
      placeholder="Search by amount or description"
      @input="handleInput" />
    <p class="loading-text" data-testid="loading-text" v-if="loading">
      Loading...
    </p>
    <p class="error-text" v-if="error">{{ error }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import debounce from 'lodash/debounce';

import { State } from '../types/state';

const emit = defineEmits(['updatePage']);
const store = useStore<State>();
const filterValue = ref('');
const loading = ref(false);
const error = ref('');

watch(
  () => store.state.selectedCard,
  () => {
    resetFilter();
  }
);

function resetFilter() {
  filterValue.value = '';
  store.commit('setFilterValue', filterValue.value);
  loading.value = false;
  error.value = '';
}

const handleInput = (event: InputEvent): void => {
  const inputValue = (event.target as HTMLInputElement).value;
  if (inputValue.trim() === '') {
    resetFilter();
    return;
  }
  loading.value = true;
  error.value = '';
  emit('updatePage', 1);
  debouncedFilterTransactions(inputValue);
};

const debouncedFilterTransactions = debounce(
  async (value: string): Promise<void> => {
    try {
      filterValue.value = value;
      store.commit('setFilterValue', filterValue.value);
    } catch (error) {
      error.value = 'Error fetching transactions..';
    } finally {
      loading.value = false;
    }
  },
  300
);
</script>

<style scoped>
.input-container {
  position: relative;
  min-height: 80px;
}

.filter-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #000000;
}

.loading-text,
.error-text {
  text-align: center;
  color: #676666;
  margin: 0;
  height: 20px;
  line-height: 20px;
}
.error-text {
  color: red;
}
</style>
