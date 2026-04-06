<template>
  <Expense v-for="expense in expenses" :key="expense.name" :expense="expense" />
</template>

<script setup lang="ts">
import type { Expense as ExpenseEntity } from "@/entities/Expense";
import Expense from "./Expense.vue";

interface Props {
  expenses: ExpenseEntity[];
}

defineProps<Props>();
</script>

<style scoped></style>
