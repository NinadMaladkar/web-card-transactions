import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import TransactionDetails from '../src/components/TransactionDetails.vue';
import { expect, describe, it } from 'vitest';
import { getTransactions } from '../src/ApiClient';
import { computed } from 'vue';
import CardComponent from '../src/components/CardComponent.vue';

describe('TransactionDetails component', () => {
  const store = createStore({
    state: {
      selectedCard: {
        id: 'lkmfkl-mlfkm-dlkfm',
        color: '#fff',
        description: 'Private Card',
      },
      filteredTransactions: [
        {
          id: 'lkmlk-5kkm5-55gg',
          amount: 123.88,
          description: 'Food',
        },
        {
          id: '43mm3-lkm4-55gg',
          amount: 33.48,
          description: 'Snack',
        },
        {
          id: 'eefe-5kkm5-ffeefe',
          amount: 288.38,
          description: 'Tickets',
        },
      ],
    },
    getters: {
      filteredTransactions: (state) => state.filteredTransactions,
    },
  });

  it('should render the component', () => {
    const wrapper = mount(TransactionDetails, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should render transactions', () => {
    const wrapper = mount(TransactionDetails, {
      global: {
        plugins: [store],
      },
    });

    const transactions = wrapper.findAll('.transaction');
    expect(transactions.length).toBe(3);
  });

  it('should show pagination when there are transactions', () => {
    const wrapper = mount(TransactionDetails, {
      global: {
        plugins: [store],
      },
    });

    const pagination = wrapper.findComponent({ name: 'PaginationComponent' });
    expect(pagination.exists()).toBe(true);
  });
});
