<template>
  <section class="card-selector">
    <SingleCardComponent
      v-for="card in cards"
      :key="card.id"
      :card="card"
      @selectCard="selectCard" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

import { State } from '../types/state';
import { Card } from '../types/card';
import { getCards } from '../ApiClient';
import SingleCardComponent from '../components/SingleCardComponent.vue';

const store = useStore<State>();
const cards = ref<Card[]>([]);

onMounted(async () => {
  try {
    const fetchedCards = await getCards();
    cards.value = fetchedCards;
  } catch (error) {
    console.error('Failed to fetch cards:', error);
  }
});

function selectCard(card: Card | null): void {
  store.commit('setSelectedCard', card);
}
</script>

<style scoped>
.card-selector {
  display: flex;
  justify-content: space-between;
  gap: 2%;
  margin-bottom: 30px;
}

@media only screen and (max-width: 768px) {
  .card-selector {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
