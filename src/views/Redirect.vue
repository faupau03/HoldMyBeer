<template>
    <!-- OAuth receiver page -->
    
</template>
<script setup>

import {ref, onMounted, inject } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import { pocketBaseSymbol } from '../symbols/injectionSymbols';

const route = useRoute()
const router = useRouter()
const redirectUrl = ref("http://192.168.178.41:5173/#/redirect")
const $pb = inject(pocketBaseSymbol);

onMounted(async() => {
    console.log(route.query)
    const params = ((new URL(window.location)).searchParams);

    const provider = JSON.parse(localStorage.getItem('provider'))

    try {
        const res = await $pb?.users.authViaOAuth2(
            provider.name,
            params.get('code'),
            provider.codeVerifier,
            redirectUrl.value
        )
        console.log(res)
    }
    catch (error) {
        console.log(error)
    }



})

</script>