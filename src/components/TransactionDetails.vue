<template>
  <section class="transaction-details">
    <SearchComponent
      :disabled="!store.state.selectedCard"
      @updatePage="updatePage" />
    <section class="transaction-list">
      <article v-if="emptyTransactions" class="no-transactions-message">
        No transactions found
      </article>
      <article
        v-else
        class="transaction"
        v-for="transaction in paginatedTransactions"
        :key="transaction.id">
        <span class="description">{{ transaction.description }}</span>
        <span class="amount">{{ transaction.amount }}€</span>
      </article>
    </section>
    <PaginationComponent
      :currentPage="currentPage"
      :totalPages="totalPages"
      :showPagination="showPagination"
      @updatePage="updatePage" />
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

import SearchComponent from './SearchComponent.vue';
import PaginationComponent from './PaginationComponent.vue';
import { getTransactions } from '../ApiClient';
import { Card } from '../types/card';

const store = useStore();
const transactionsPerPage = 5;
const currentPage = ref(1);
const showPagination = ref(false);
const filteredTransactions = computed(() => store.getters.filteredTransactions);
const emptyTransactions = ref(false);

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / transactionsPerPage);
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * transactionsPerPage;
  const end = start + transactionsPerPage;
  return filteredTransactions.value.slice(start, end);
});

const transactionBgColor = computed(
  () => store.state.selectedCard?.primaryColor || '#000000'
);

watch(transactionBgColor, (newColor) => {
  document.documentElement.style.setProperty(
    '--transaction-bg-color',
    newColor
  );
});

function updatePage(page: number): void {
  currentPage.value = page;
}

watch(
  () => store.state.selectedCard,
  async (newCard: Card): Promise<void> => {
    currentPage.value = 1;

    if (newCard) {
      try {
        const transactions = await getTransactions(newCard.id);
        store.commit('setTransactions', transactions);
        showPagination.value = transactions.length > 0;
        emptyTransactions.value = transactions.length === 0;
      } catch (error) {
        console.error('Error fetching transactions:', error);
        emptyTransactions.value = true;
      }
    } else {
      store.commit('setTransactions', []);
      showPagination.value = false;
      emptyTransactions.value = true;
    }

    store.commit('setFilterValue', '');
  }
);
</script>

<style scoped>
.transaction-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.transaction-list {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 300px;
  max-width: 100%;
}

.transaction {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  opacity: 0.6;
  background-color: var(--transaction-bg-color);
}

.transaction:hover {
  opacity: 0.8;
  cursor: pointer;
}

.description,
.amount {
  color: white;
}

.no-transactions-message {
  color: #cfcfcf;
}
</style>
