/**
 * router/index.ts
 *
 * Manual routes for ./src/pages/*.vue
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import Index from "@/pages/index.vue";
import AddExpenseForm from "@/components/AddExpenseForm.vue";
import Signin from "@/pages/auth/signin/index.vue";
import Signup from "@/pages/auth/signup/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      component: Index,
    },
    {
      path: "/add-expense",
      component: AddExpenseForm
    },
    {
      path: "/signin",
      component: Signin
    },
    {
      path: "/signup",
      component: Signup
    }
  ],
});

export default router;
