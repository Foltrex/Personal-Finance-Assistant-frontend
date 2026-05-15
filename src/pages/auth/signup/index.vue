<template>
    <v-container fill-height fluid>
        <v-row justify="center" align="center">
            <v-card class="w-25 ml-50">
                <v-form @submit.prevent="handleSignup">
                    <v-card-title>
                        Sign Up
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="form.name" label="Name"></v-text-field>
                        <v-text-field v-model="form.username" label="Username"></v-text-field>
                        <v-text-field v-model="form.email" label="Email"></v-text-field>
                        <v-text-field type="password" v-model="form.password" label="Password"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn type="submit">
                            Register
                        </v-btn>
                    </v-card-actions>
                    <v-card-text>
                        Already have an account? <router-link to="/signin">Sign In</router-link>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import router from '@/router';
import authService from '@/service/auth.service';
import { reactive, ref } from 'vue';

const loading = ref(false);
const errorMessage = ref('');

const form = reactive({
    name: '',
    username: '',
    email: '',
    password: ''
})

const handleSignup = async () => {
    loading.value = true;
    errorMessage.value = '';

    try {
        await authService.register(form);
        router.push('/login');
    } catch (error: any) {
        errorMessage.value = error.message || 'Invalid username or password';
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped></style>