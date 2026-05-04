<template>
    <v-container fill-height fluid>
        <v-row justify="center" align="center">
            <v-card class="w-25 ml-50">
                <v-card-title>
                    Sign Up
                </v-card-title>
                <v-card-text>
                    <v-text-field label="Username"></v-text-field>
                    <v-text-field label="Password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn>
                        Register
                    </v-btn>
                </v-card-actions>
                <v-card-text>
                    Already have an account? <router-link to="/signin">Sign In</router-link>
                </v-card-text>
            </v-card>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>