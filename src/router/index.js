import { createRouter, createWebHistory } from 'vue-router'
import Error404 from '@/views/errors/Error404.vue'
import Error500 from '@/views/errors/Error500.vue'
import Home from '@/views/Home.vue'
import Catalog from '@/views/Catalog.vue'
import About from '@/views/About.vue'
import SearchView from '@/views/SearchView.vue'
import Register from '@/views/Register.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  
  { path: '/catalogo', name: 'Catalogo', component: Catalog },
  { path: '/500', name: 'Error500', component: Error500 },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: Error404
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: About
  },
  {
    path: '/busqueda',
    name: 'Busqueda',
    component: SearchView,
  },
  {
  path: '/registro',
  name: 'Register',
  component: Register,
}


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router