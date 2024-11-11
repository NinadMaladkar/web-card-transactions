import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createStore } from 'vuex';
import CardComponent from '../src/components/CardComponent.vue';
import { Card } from '../src/types/card';
import cardsData from '../src/ApiClient/data/cards.json'; // Import the mock data

interface State {
  selectedCard: Card | null;
}

const store = createStore<State>({
  state: {
    selectedCard: null,
  },
  mutations: {
    setSelectedCard(state, card: Card | null) {
      state.selectedCard = card;
    },
  },
});

describe('CardComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CardComponent, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          cards: cardsData,
        };
      },
    });
  });

  it('renders the component', () => {
    const cardSelector = wrapper.find('.card-selector');
    expect(cardSelector.exists()).toBe(true);
  });

  it('renders the correct number of cards', () => {
    const cards = wrapper.findAll('.card');
    expect(cards.length).toBe(cardsData.length);
  });

  it('updates the selected card in the store when a card is clicked', async () => {
    const card = wrapper.find('.card');
    await card.trigger('click');

    expect(store.state.selectedCard).toEqual(cardsData[0]);
  });
});
