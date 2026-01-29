import { createRouter, createWebHistory } from 'vue-router'
// Importas tus componentes de error
import Error404 from '@/views/errors/Error404.vue'
import Error500 from '@/views/errors/Error500.vue'

const routes = [
  // ... tus otras rutas (Home, Catalogo, etc.)
  
  {
    path: '/500',
    name: 'Error500',
    component: Error500
  },
  // Esta ruta SIEMPRE debe ir al final
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: Error404
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router