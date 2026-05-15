<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type { Expense as ExpenseEntity } from "@/entities/Expense";
import Expense from "@/components/Expense.vue";
import AddExpenseForm from "@/components/AddExpenseForm.vue";
import apiService from "@/service/api.service";
import { apiFetch } from "@/utils/fetcher";
import authService from "@/service/auth.service";
import { useRouter } from "vue-router";
import expensesService from "@/service/expenses.service";
import type { Slice } from "@/types/api.types";

const expenses = ref<ExpenseEntity[]>([]);

const expenseFormOpen = ref(false);
const lastDate = ref<Date>();
const lastId = ref<string>();
const hasNext = ref<boolean>(false);

const router = useRouter();

const expenseLimit = 10;

const user = authService.getCurrentUser();

onMounted(() => {
  if (user?.id) {
    expensesService.fetchAllByUserId(user.id, expenseLimit, lastDate.value, lastId.value)
      .then(slice => {
        updateContentWithSlice(slice);
      })
  }
});

const handleClick = async () => {
  if (user?.id) {
    const slice = await expensesService.fetchAllByUserId(
      user.id,
      expenseLimit,
      lastDate.value,
      lastId.value
    )

    updateContentWithSlice(slice);
  }
}

const updateContentWithSlice = (slice: Slice<ExpenseEntity>): void => {
  hasNext.value = slice.hasNext;
  expenses.value.push(...slice.content);
  const nextCursorMap = slice.nextCursor;
  if (nextCursorMap.has('id')) {
    lastDate.value = nextCursorMap.get('id');
  }
  if (nextCursorMap.has('transactionDate')) {
    lastId.value = nextCursorMap.get('transactionDate');
  }
}

const logout = async () => {
  await authService.logout();
  router.push('/login')
}
</script>

<template>
  <v-btn @click="logout">Logout</v-btn>
  <div class="d-flex flex-column align-center ma-4">
    <v-btn block rounded="xl" class="mt-16 text-title-large font-weight-medium" size="large"
      @click="() => expenseFormOpen = !expenseFormOpen">Add Expense
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
    <v-btn block rounded="xl" size="large" @click="handleClick">Load More</v-btn>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: space-between;
}
</style>
