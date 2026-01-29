import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // [cite: 173] Importar la configuración del router

const app = createApp(App)

app.use(router) // [cite: 172] Indicar a Vue que use el router configurado
app.mount('#app')