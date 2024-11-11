import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createStore } from 'vuex';
import SearchComponent from '../src/components/SearchComponent.vue';
import debounce from 'lodash/debounce';
import { ComponentPublicInstance } from 'vue';

const store = createStore({
  state: {
    selectedCard: { id: 'test-card' },
    filterValue: '',
  },
  mutations: {
    setFilterValue(state, value) {
      state.filterValue = value;
    },
  },
});

const wrapper = mount(SearchComponent, {
  global: {
    plugins: [store],
  },
});

type SearchComponentInstance = ComponentPublicInstance<{
  loading: boolean;
  error: string;
}>;

describe('SearchComponent', () => {
  it('should not filter when input is empty or only spaces', async () => {
    // Arrange

    // Act
    const input = wrapper.find('[data-testid="filter-input"]');
    await input.setValue('   ');

    // Assert
    expect(store.state.filterValue).toBe('');
  });

  it('should handle input correctly', async () => {
    const input = wrapper.find('[data-testid="filter-input"]');
    const vm = wrapper.vm as SearchComponentInstance; // Cast the instance

    // Test empty input
    await input.setValue('');
    expect(store.state.filterValue).toBe('');
    expect(vm.loading).toBe(false);
    expect(vm.error).toBe('');

    // Test non-empty input
    await input.setValue('test');
    store.commit('setFilterValue', 'test');
    expect(vm.loading).toBe(true);
    expect(vm.error).toBe('');
    expect(store.state.filterValue).toBe('test');
  });
});
