<template>
  <nav class="breadcrumbs" aria-label="Ruta de navegación">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/">Inicio</router-link>
      </li>

      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="index" 
        class="breadcrumb-item"
        :class="{ 'active': index === breadcrumbs.length - 1 }"
      >
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
          {{ crumb.name }}
        </router-link>
        <span v-else aria-current="page">{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    breadcrumbs() {
      // Lógica para obtener las migas de pan desde el meta de la ruta o el path
      const routeArray = this.$route.path.split('/').filter(p => p !== '');
      let pathAccumulator = '';
      
      return routeArray.map(path => {
        pathAccumulator += `/${path}`;
        return {
          name: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' '),
          path: pathAccumulator
        };
      });
    }
  }
}
</script>

<style scoped>
.breadcrumbs {
  padding: 15px 5%;
  background-color: #FDF9F1; /* Color crema de tu paleta */
  border-bottom: 1px solid #F4B8C1; /* Rosa pastel */
}

.breadcrumb-list {
  display: flex;
  list-style: none;
  gap: 10px;
  font-size: 0.85rem;
  color: #5A4A42; /* Café suave de tu paleta */
}

.breadcrumb-item + .breadcrumb-item::before {
  content: " / ";
  color: #B7B16B; /* Verde oliva de tu paleta */
}

.breadcrumb-item a {
  text-decoration: none;
  color: #D1823C; /* Ocre de tu paleta */
  font-weight: 500;
}

.breadcrumb-item a:hover {
  color: #D26259; /* Rosa intenso */
  text-decoration: underline;
}

.breadcrumb-item.active {
  font-weight: bold;
  color: #5A4A42;
}
</style>