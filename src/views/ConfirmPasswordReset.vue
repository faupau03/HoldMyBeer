<template>
    <!-- Simple login form. Show warning text if inputs are empty or not correctly filled. -->
    <form @submit.prevent="resetPassword()" class="m-8">
        <div class="flex flex-col gap-4">
            <span class="text-3xl font-bold">Reset Password</span>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text text-base-content">Password</span>
                </label>
                <div class="relative w-min">
                    <input v-model="pw" @input="checkPasswordEquality" ref="pwInput"
                        class="input input-bordered invalid:input-warning" :type="showPassword ? 'text' : 'password'"
                        placeholder="Password" required minlength="8" maxlength="100" autocomplete="new-password" />
                    <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                        <button @click="togglePassword" class="p-3 rounded-r-lg hover:bg-base-200 bg-accent/70 hover:bg-accent" type="button">
                            <EyeIcon v-show="!showPassword" class="h-6" />
                            <EyeSlashIcon v-show="showPassword" class="h-6" />
                        </button>
                    </span>
                </div>
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text text-base-content">Password Confirmation</span>
                </label>
                <div class="relative w-min">
                    <input v-model="pwConfirm" @input="checkPasswordEquality" ref="pwConfirmInput"
                        class="input input-bordered invalid:input-warning" :type="showPassword ? 'text' : 'password'"
                        placeholder="Password" required minlength="8" maxlength="100" autocomplete="new-password" />
                    <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                        <button @click="togglePassword" class="p-3 rounded-r-lg hover:bg-base-200 bg-accent/70 hover:bg-accent" type="button">
                            <EyeIcon v-show="!showPassword" class="h-6" />
                            <EyeSlashIcon v-show="showPassword" class="h-6" />
                        </button>
                    </span>
                </div>
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
        <div class="grid text-center bg-accent py-8 rounded-3xl m-4 shadow-2xl p-2">
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

// Import icons from heroicons
import { EyeIcon } from '@heroicons/vue/24/outline'
import { EyeSlashIcon } from '@heroicons/vue/24/outline'


const router = useRouter();
const route = useRoute();

const $pb = inject(pocketBaseSymbol);

const pw = ref('');
const pwConfirm = ref('');
const invalid = ref(false)
const resetSuccess = ref(false)

const showPassword = ref(false)

// Elements
const pwInput = ref()
const pwConfirmInput = ref()


const togglePassword = () => {
    showPassword.value = !showPassword.value
}

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

const checkPasswordEquality = () => {
    if (pw.value !== pwConfirm.value) {
        pwInput.value.setCustomValidity('Passwords must match');
        pwConfirmInput.value.setCustomValidity('Passwords must match');
    }
    else {
        pwInput.value.setCustomValidity('');
        pwConfirmInput.value.setCustomValidity('');
    }
}
</script>