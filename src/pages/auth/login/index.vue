<template>
    <v-container fill-height fluid>
        <v-row justify="center" align="center">
            <v-card class="w-25 ml-50">
                <v-form @submit.prevent="handleLogin">
                    <v-card-title>
                        Sign In
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="form.username" label="Username"></v-text-field>
                        <v-text-field v-model="form.password" label="Password"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn type="submit">
                            Login
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        Don't have an account? <router-link to="/signup">Sign Up</router-link>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/service/auth.service';
import type { LoginRequest } from '@/types/auth.types';

const router = useRouter();
const loading = ref(false);
const errorMessage = ref('');

const form = reactive<LoginRequest>({
  username: '',
  password: ''
});

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';
  
  try {
    await authService.login(form);
    router.push('/');
  } catch (error: any) {
    errorMessage.value = error.message || 'Invalid username or password';
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>

</style>