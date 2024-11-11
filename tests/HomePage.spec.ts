import { mount } from '@vue/test-utils';
import { expect, it, describe } from 'vitest';
import HomePage from '../src/components/HomePage.vue';
import { createStore } from 'vuex';

describe('HomePage', () => {
  it('should render', () => {
    const store = createStore({
      state: {
        selectedCard: null,
      },
      getters: {
        filteredTransactions: () => [],
      },
    });

    const wrapper = mount(HomePage, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('h1').text()).toBe('Web Card Transactions');
  });
});
