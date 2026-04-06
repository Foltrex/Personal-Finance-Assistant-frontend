<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Expense as ExpenseEntity } from "@/entities/Expense";
import Expense from "@/components/Expense.vue";
import AddExpenseForm from "@/components/AddExpenseForm.vue";
import { apiFetch } from "@/utils/fetcher";

const expenses = ref<ExpenseEntity[]>([]);

const expenseFormOpen = ref(false);

onMounted(() => {
  apiFetch<ExpenseEntity[]>('/expenses')
    .then(expensesObjs => expenses.value = expensesObjs)
});
</script>

<template>
  <div class="d-flex flex-column align-center ma-4">
    <v-btn block rounded="xl" class="mt-16 text-title-large font-weight-medium" size="large" @click="() => expenseFormOpen = !expenseFormOpen">Add Expense
    </v-btn>
    <AddExpenseForm v-model:open="expenseFormOpen" />
    <div class="w-100 pt-3 pb-3 d-flex justify-space-between list-action-buttons">
      <v-icon>
        mdi-account  
      </v-icon>
      <v-btn icon="mdi-magnify" variant="flat"></v-btn>
      <v-btn icon="mdi-filter-outline" variant="flat"></v-btn>
    </div>
    <div class="w-100">
      <Expense v-for="expense in expenses" :key="expense.name" :expense="expense" />
    </div>
    <v-btn block rounded="xl" size="large">Show other 223 expenses</v-btn>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
}
</style>
