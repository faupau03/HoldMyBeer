<template>
    <div class="hero min-h-screen bg-base-200 w-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left " v-show="loginType === null">
                <h1 class="text-5xl font-bold">Register now!</h1>
                <p class="mt-5 text-xl">
                    Register now to get access to all the features of the app.
                </p>
            </div>
            <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                <div class="card-body" v-show="loginType === null">
                    <h1 class="text-4xl font-bold text-center mb-4">Providers</h1>
                    <!-- List all authentication providers -->
                    <button class="btn btn-primary gap-2" @click="loginType = 'email'">
                        <EnvelopeIcon class="h-8" />
                        E-Mail
                    </button>
                    <button v-for="item in authList" @click="setProvider(item)" :href="item.authUrl + redirectUrl" class="btn btn-outline gap-2">
                        <svg v-if="item.name == 'github'" height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32"
                            data-view-component="true" class="octicon octicon-mark-github v-align-middle">
                            <path fill-rule="evenodd"
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                            </path>
                        </svg>
                        {{item.name}}
                    </button>
                </div>

                <!-- Simple login form -->
                <div class="card-body" v-show="loginType == 'email'">
                    <h1 class="text-4xl font-bold text-center mb-4">
                        Register
                    </h1>
                    <form @submit.prevent="register()" class="">
                        <div class="flex flex-col gap-4">
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
                                    <input v-model="pw" @input="checkPasswordEquality" ref="pwInput"
                                        class="input input-bordered invalid:input-warning"
                                        :type="showPassword ? 'text' : 'password'" placeholder="Password" required
                                        minlength="8" maxlength="100" autocomplete="new-password" />
                                    <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                                        <button @click="togglePassword"
                                            class="p-3 rounded-r-lg hover:bg-base-200 bg-accent/70 hover:bg-accent"
                                            type="button">
                                            <EyeIcon v-show="!showPassword" class="h-6" />
                                            <EyeSlashIcon v-show="showPassword" class="h-6" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <label class="label">
                                    <span class="label-text text-base-content">Repeat Password</span>
                                </label>
                                <div class="relative">
                                    <input v-model="pwConfirm" @input="checkPasswordEquality" ref="pwConfirmInput"
                                        class="input input-bordered invalid:input-warning"
                                        :type="showPassword ? 'text' : 'password'" placeholder="Password" required
                                        minlength="8" maxlength="100" autocomplete="new-password" />
                                    <span class="absolute inset-y-0 right-0 flex items-center pl-2">
                                        <button @click="togglePassword"
                                            class="p-3 rounded-r-lg hover:bg-base-200 bg-accent/70 hover:bg-accent"
                                            type="button">
                                            <EyeIcon v-show="!showPassword" class="h-6" />
                                            <EyeSlashIcon v-show="showPassword" class="h-6" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button class="btn btn-primary" :class="loading ? 'loading' : ''">
                                    Register
                                </button>
                                <button @click="router.push('/login')" type="button"
                                    class="btn btn-ghost">Login</button>
                            </div>
                            <!-- info box to show if field not field properly or data is invalid -->
                            <div v-if="invalid" class="alert alert-error shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Error! Invalid E-Mail or Password.</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>


    <!-- Simple login form. Show warning text if inputs are empty or not correctly filled. -->
    <input type="checkbox" ref="registerSuccess" id="my-modal-6" class="modal-toggle" />
    <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Registration successful!</h3>
            <p class="py-4">You can now login on your newly created account.</p>
            <div class="modal-action">
                <label @click="router.push('/login')" for="my-modal-6" class="btn btn-secondary">Login</label>
            </div>
        </div>
    </div>



</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { pocketBaseSymbol } from '../symbols/injectionSymbols';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

const $pb = inject(pocketBaseSymbol);

const mail = ref('')
const pw = ref('')
const pwConfirm = ref('')
const invalid = ref(false)
const loading = ref(false)
const showPassword = ref(false)
const authList = ref([])
const loginType = ref(null)
const redirectUrl = ref("http://192.168.178.41:5173/#/redirect")

// Elements
const pwInput = ref(null)
const pwConfirmInput = ref(null)
const registerSuccess = ref()

// Import icons from heroicons
import { EyeIcon } from '@heroicons/vue/24/outline'
import { EyeSlashIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'



onMounted(async () => {
    // Get all auths
    getList()
})

const setProvider = async (provider) => {
    // Set login type
    loginType.value = provider

    // Save provider to local storage
    localStorage.setItem('provider', JSON.stringify(provider))

    // Get auth url
    const url = provider.authUrl + redirectUrl.value

    // Redirect to auth url
    window.location.href = url
}

const getList = async () => {
    const res = await $pb?.users.listAuthMethods();
    console.log(res);
    res.authProviders.forEach((auth) => {
        if (auth.name == 'github') {
            auth.logo = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';
        }
        authList.value.push(auth)
        console.log(auth.name)
    })
}


const register = async () => {
    console.log("login");
    loading.value = true;
    // Try to login via pocketbase api
    try {
        const res = await $pb?.users.create({
            email: mail.value,
            password: pw.value,
            passwordConfirm: pwConfirm.value,
        });
        console.log("Register successful");
        registerSuccess.value.checked = true;
    }
    catch (error) {
        //Login failed -> show error message
        console.log(error);
        console.log("Login failed");
        invalid.value = true;
    }
    loading.value = false;
};

const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const checkPasswordEquality = () => {
    console.log(pw.value);
    console.log(pwConfirm.value);
    if (pw.value !== pwConfirm.value) {
        console.log(pw.value);
        console.log(pwConfirm.value);
        pwInput.value.setCustomValidity('Passwords must match');
        pwConfirmInput.value.setCustomValidity('Passwords must match');
    }
    else {
        pwInput.value.setCustomValidity('');
        pwConfirmInput.value.setCustomValidity('');
    }
}
</script>