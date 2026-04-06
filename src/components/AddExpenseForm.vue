<template>
    <v-dialog v-model="open" persistent>
        <v-card>
            <v-card-title class="text-title-large">Add expense</v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="isValid" lazy-validation>
                    <v-text-field v-model="name" label="Name" required></v-text-field>
                    <v-text-field v-model="type" label="Type" required></v-text-field>
                    <v-date-input v-model="date" prepend-icon="" label="Date" required></v-date-input>

                    <v-text-field :model-value="time" label="Time" placeholder="HH:MM" readonly>
                        <v-dialog v-model="showDialog" activator="parent" width="auto">
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-dialog>
                    </v-text-field>

                    <v-text-field v-model="money" label="Money" required></v-text-field>
                    <v-select label="Currency" :items="['USD', 'EUR', 'RUB']"></v-select>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="!isValid" color="success" @click="submit">
                    Submit
                </v-btn>
                <v-btn @click="open = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import type { Expense } from '@/entities/Expense';
import { apiFetch } from '@/utils/fetcher';
import { ref } from 'vue'

const open = defineModel<boolean>('open');
defineEmits<{
    (e: 'closeDialog', open: boolean): void,
}>();

const time = ref(null)
const showDialog = ref(false)

const name = ref('')
const type = ref('')
const date = ref(new Date());
const money = ref(0.0);
const currency = ref('')
const isValid = ref(true)


const submit = async () => {
    const selectedDate = date.value;
    const [hours, minutes] = String(time.value).split(':')
    const transactionDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), +hours, +minutes)
    
    apiFetch('/expenses', {
        method: 'POST',
        body: JSON.stringify({
            name: name.value,
            type: type.value,
            transactionDate: transactionDate,
            money: money.value,
            currency: currency.value
        } as Expense),
    })
    .finally(() => open.value = false)
}
</script>
