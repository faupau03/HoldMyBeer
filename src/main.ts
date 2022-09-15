import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// Import router from './router'
import router from './router';
// Import the PocketBase JS library
import client from './pocketbase';
// Import custom pocketBase type
import { pocketBaseSymbol } from "./symbols/injectionSymbols"




const app = createApp(App)

app.provide(pocketBaseSymbol, client)
app.use(router)
app.mount('#app')
