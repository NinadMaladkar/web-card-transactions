import { createStore } from 'vuex';
import { Card } from '../types/card';
import { State } from '../types/state';
import { Transaction } from '../types/transaction';

const store = createStore<State>({
  state: {
    selectedCard: null as Card | null,
    filterValue: '',
    transactions: [] as Transaction[],
  },
  mutations: {
    setSelectedCard(state, card: Card | null) {
      state.selectedCard = card;
    },
    setFilterValue(state, value: string) {
      state.filterValue = value;
    },
    setTransactions(state, transactions: Transaction[]) {
      state.transactions = transactions;
    },
  },
  actions: {},
  getters: {
    filteredTransactions: (state) => {
      if (!state.filterValue) return state.transactions;
      const filterLowerCase = state.filterValue.toLowerCase();
      return state.transactions.filter((transaction: Transaction) => {
        const amountMatch = transaction.amount >= Number(state.filterValue);
        const descriptionMatch = transaction.description
          .toLowerCase()
          .includes(filterLowerCase);

        return amountMatch || descriptionMatch;
      });
    },
  },
});

export default store;
