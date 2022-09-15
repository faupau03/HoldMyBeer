<script setup lang="ts">
</script>

<template>
  <div class="grid justify-center items-center h-screen">

    <div class="mockup-phone border-secondary">
      <div class="camera"></div>
      <div class="display">
        <div class="artboard artboard-demo phone-1 relative">
          <!-- wrapper -->
          <div class="w-full">



            <!-- Navbar -->
            <div :class="{'bg-accent': userMenuOpen, 'bg-black rounded-b-3xl': !userMenuOpen}"
              class="absolute top-0 mt-0 mx-6 w-[calc(100%-46px)] flex rounded-t-3xl h-12 p-0">
              <div class="mr-auto m-1">
                <a class="cursor-pointer">
                  <img src="/logo.png" alt="" class="h-10">
                </a>
              </div>
              <div class="ml-auto m-1">
                <a @click="userMenuOpen =! userMenuOpen" class="cursor-pointer">
                  <UserCircleIcon class="h-10 rounded-full bg-accent" />
                </a>
              </div>
              <div v-show="userMenuOpen" class="absolute bg-accent rounded-b-3xl w-full top-12 grid gap-2 p-2">
                <div class="btn btn-ghost rounded-3xl">
                  Profile
                </div>
                <div class="btn rounded-3xl" @click="logout">
                  <ArrowRightOnRectangleIcon class="h-6" /> Logout
                </div>
              </div>
            </div>



            <router-view></router-view>




            <!-- Bottom navigation -->
            <div v-show="route.path.includes('app')" class="btm-nav absolute">
              <button class="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              <button class="text-primary active">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button class="text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import { ref, inject, onMounted } from 'vue'
import { pocketBaseSymbol } from './symbols/injectionSymbols';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const $pb = inject(pocketBaseSymbol);
  
const mail = ref('')
const pw = ref('')
const invalid = ref(false)
const loggedIn = ref(false)

const userMenuOpen = ref(false)


/**
 * Initializations
 */ 

onMounted(() => {
  checkLogin()
})

/*
 * Methods
 */

const checkLogin = async () => {
  if ($pb?.authStore.isValid) {
    loggedIn.value = true
    console.log('logged in');
  }
  else {
    loggedIn.value = false
    console.log('not logged in');
    router.push('/login');
  }
}

const logout = async() => {
  console.log("logout");
  // Try to logout via pocketbase api
  try {
    const res = $pb?.authStore.clear();
    loggedIn.value = false
    checkLogin();
  }
  catch (error) {
    console.log(error);
    console.log("Logout failed");
  }
};
</script>