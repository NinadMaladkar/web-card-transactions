<template>
  <article
    class="card"
    :style="{
      '--primary-color': card.primaryColor,
      '--secondary-color': card.secondaryColor,
    }"
    @click="selectCard(card)">
    <p>{{ card.description }}</p>
  </article>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import { Card } from '../types/card';

defineProps<{
  card: Card;
}>();

const emit = defineEmits(['selectCard']);

function selectCard(card: Card) {
  emit('selectCard', card);
}
</script>

<style scoped>
.card {
  padding: 8% 20%;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: linear-gradient(
    to bottom,
    var(--primary-color),
    var(--secondary-color)
  );
}

.card:hover {
  opacity: 0.7;
}

@media only screen and (max-width: 768px) {
  .card {
    min-width: 30%;
  }
}
</style>
