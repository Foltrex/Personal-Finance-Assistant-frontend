/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/index.vue";
import AddExpenseForm from "@/components/AddExpenseForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/add-expense",
      component: AddExpenseForm
    },
    { path: '/test', component: { template: '<h1>Test</h1>' } }
  ],
});

export default router;
