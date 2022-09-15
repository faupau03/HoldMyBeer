<template>
    <!-- Simple login form. Show warning text if inputs are empty or not correctly filled. -->
    <form @submit.prevent="register()" class="m-8">
        <div class="flex flex-col gap-4">
            <span class="text-3xl font-bold">Register</span>
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
            </div>
            <div class="flex flex-col">
                <label class="label">
                    <span class="label-text text-base-content">Password Confirmation</span>
                </label>
                <input v-model="pwConfirm" class="input input-bordered invalid:input-warning" type="password"
                    placeholder="Password" required />
            </div>
            <div class="flex gap-2">
                <button class="btn btn-primary">Register</button>
                <button @click="router.push('/login')" type="button" class="btn btn-ghost">Login</button>
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

    <div v-show="registerSuccess" class="absolute top-0 left-0 h-full w-full flex justify-center items-center">
        <div class="grid text-center bg-base-200 py-8 rounded-3xl m-4 shadow-2xl">
            <div class="text-3xl font-bold">Registration successful</div>
            <div class="text-xl">You can now login</div>
            <div @click="router.push('/login')" class="btn btn-secondary w-40 mx-auto">
                Login
            </div>
        </div>
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
const pwConfirm = ref('')
const invalid = ref(false)
const registerSuccess = ref(false)

const register = async () => {
    console.log("login");
    // Try to login via pocketbase api
    try {
        const res = await $pb?.users.create({
            email: mail.value,
            password: pw.value,
            passwordConfirm: pwConfirm.value,
        });
        console.log("Register successful");
        registerSuccess.value = true;
    }
    catch (error) {
        //Login failed -> show error message
        console.log(error);
        console.log("Login failed");
        invalid.value = true;
    }
};
</script>