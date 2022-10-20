<template>

    <div class="md:flex grid justify-between w-full">
        <img src="/bar.png" alt="" class="h-96 rounded-3xl shadow-2xl md:block hidden">
        <img src="/bar.png" alt="" class="h-56 rounded-3xl shadow-2xl md:hidden mx-auto mt-20">
        <!-- Simple login form. Show warning text if inputs are empty or not correctly filled. -->
        <form @submit.prevent="login()" class="m-8">
            <div class="flex flex-col gap-4">
                <span class="text-3xl font-bold">Login</span>
                <div class="flex flex-col">
                    <label class="label">
                        <span class="label-text text-base-content">E-Mail</span>
                    </label>
                    <input v-model="mail" class="input input-bordered invalid:input-warning" type="email"
                        placeholder="E-Mail" required />
                </div>
                <div class="flex flex-col">
                    <label class="label">
                        <span class="label-text text-base-content">Password</span>
                    </label>
                    <div class="relative">
                        <input v-model="pw" class="input input-bordered invalid:input-warning" :type="showPassword ? 'text' : 'password'"
                            placeholder="Password" required autocomplete="current-password" />
                        <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                            <button type="button" @click="togglePassword" class="p-3 rounded-r-lg hover:bg-base-200 bg-accent/70 hover:bg-accent">
                                <EyeIcon v-show="!showPassword" class="h-6"/>
                                <EyeSlashIcon v-show="showPassword" class="h-6"/>
                            </button>
                        </span>
                    </div>


                    <!-- link to reset password -->
                    <router-link to="/password-reset" class="link">Forgot password?</router-link>
                </div>
                <div class="flex gap-2">
                    <button class="btn btn-primary">
                        Login
                        <svg v-show="loading" class="animate-spin  ml-1 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </button>
                    <button @click="router.push('/register')" type="button" class="btn btn-ghost">Register</button>
                </div>
                <!-- info box to show if field not field properly or data is invalid -->
                <div v-if="invalid" class="alert alert-error">
                    <div class="flex-1">
                        <label class="label">
                            <span class="label-text text-base-content">Invalid E-Mail or Password</span>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    </div>


</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { pocketBaseSymbol } from '../symbols/injectionSymbols';
import { useRouter } from 'vue-router';

// Import icons from heroicons
import { EyeIcon } from '@heroicons/vue/24/outline'
import { EyeSlashIcon } from '@heroicons/vue/24/outline'

const router = useRouter();

const $pb = inject(pocketBaseSymbol);

const mail = ref('')
const pw = ref('')
const invalid = ref(false)
const session = ref()
const loading = ref(false)
const showPassword = ref(false)


const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const login = async () => {
    console.log("login");
    // Try to login via pocketbase api
    try {
        loading.value = true;
        const res = await $pb?.users.authViaEmail(mail.value, pw.value);
        session.value = res;
        loading.value = false;
        console.log("Login successful");

        // Check if login was successful
        if ($pb?.authStore.isValid) {
            console.log("logged in");
            invalid.value = false;
            router.push('/');
        }
        else {
            console.log("not logged in");
            invalid.value = true;
        }

    }
    catch (error) {
        //Login failed -> show error message
        console.log(error);
        console.log(error.response);
        console.log("Login failed");
        invalid.value = true;
    }
    loading.value = false;
};
</script>