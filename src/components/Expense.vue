<template>
  <div class="pt-3 pb-3">
    <h2 class="expense-title text-title-large">
      <span>{{ expense.name }}</span>
      <span>{{ expense.money }} {{ expense.currency }}</span>
    </h2>
    <div class="mt-1 text-body-medium blue-grey-darken-4">
      Type: {{ expense.type }}<br>
      Date: {{ dateString }}
    </div>
  </div>
  <hr class="mt-0 mb-0"/>
</template>

<script setup lang="ts">
import type { Expense } from "@/entities/Expense";

interface Props {
  expense: Expense;
}

const props = defineProps<Props>();

const date = props.expense.transactionDate;
const dateString = new Date(date).toLocaleDateString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
</script>

<style scoped>
.expense-title {
  display: flex;
  justify-content: space-between;
  margin: 0;
}
</style>
