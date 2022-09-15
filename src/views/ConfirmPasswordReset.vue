<template>
    <!-- Simple login form. Show warning text if inputs are empty or not correctly filled. -->
    <form @submit.prevent="resetPassword()" class="m-8">
        <div class="flex flex-col gap-4">
            <span class="text-3xl font-bold">Reset Password</span>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text text-base-content">Password</span>
                </label>
                <input v-model="pw" class="input input-bordered invalid:input-warning" type="password"
                    placeholder="Password" required />
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text text-base-content">Password Confirmation</span>
                </label>
                <input v-model="pwConfirm" class="input input-bordered invalid:input-warning" type="password"
                    placeholder="Password" required />
            </div>
            <!-- info box to show if field not field properly or data is invalid -->
            <div v-if="invalid" class="alert alert-error">
                <div class="flex-1">
                    <label class="label">
                        <span class="label-text text-base-content">Invalid Password</span>
                    </label>
                </div>
            </div>
            <div class="flex gap-2">
                <button class="btn btn-primary">Reset Password</button>
                <button @click="router.push('/login')" type="button" class="btn btn-ghost">Login</button>
            </div>
        </div>
    </form>
    <div v-show="resetSuccess" class="absolute top-0 left-0 h-full w-full flex justify-center items-center">
        <div class="grid text-center bg-base-200 py-8 rounded-3xl m-4 shadow-2xl p-2">
            <div class="text-3xl font-bold">Reset successful</div>
            <div class="text-xl">You can now log in.</div>
            <div @click="router.push('/login')" class="btn btn-secondary w-40 mx-auto">
                Login
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted } from 'vue'
import { pocketBaseSymbol } from '../symbols/injectionSymbols';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const $pb = inject(pocketBaseSymbol);

const pw = ref('');
const pwConfirm = ref('');
const invalid = ref(false)
const resetSuccess = ref(false)

onMounted(() => {
    if (!route.query.token) {
        // No token provided, redirect to login
        router.push('/login');
    }
});

const resetPassword = async() => {
    console.log("resetPassword");
    // Try to reset password via pocketbase api
    try {
        const token = route.query.token;
        const res = await $pb?.users.confirmPasswordReset(token, pw.value, pwConfirm.value);
        console.log("Reset request successful");
        // Show instruction to check mail
        resetSuccess.value = true;
    }
    catch (error) {
        //Login failed -> show error message
        console.log(error);
        console.log("Reset request failed");
    }
};
</script>