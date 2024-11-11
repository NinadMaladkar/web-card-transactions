<script setup lang="ts">
import CardComponent from './CardComponent.vue';
import TransactionDetails from './TransactionDetails.vue';
</script>

<template>
  <section>
    <h1 class="title">Web Card Transactions</h1>
    <CardComponent />
    <TransactionDetails />
  </section>
</template>

<style scoped>
.title {
  color: #a19f9f;
  font-size: 3em;
}
</style>
