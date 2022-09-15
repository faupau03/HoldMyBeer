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
                <input v-model="pw" class="input input-bordered invalid:input-warning" type="password"
                    placeholder="Password" required />
                <!-- link to reset password -->
                <router-link to="/password-reset" class="link">Forgot password?</router-link>
            </div>
            <div class="flex gap-2">
                <button class="btn btn-primary">Login</button>
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

const router = useRouter();

const $pb = inject(pocketBaseSymbol);

const mail = ref('')
const pw = ref('')
const invalid = ref(false)
const session = ref()

const login = async() => {
    console.log("login");
    // Try to login via pocketbase api
    try {
        const res = await $pb?.users.authViaEmail(mail.value, pw.value);
        session.value = res;
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
        console.log("Login failed");
        invalid.value = true;
    }
};
</script>