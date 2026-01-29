<template>
  <nav class="breadcrumb-container" aria-label="Ruta de navegación">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link home-link">
          <span class="icon">🏠</span>
          <span class="text">Inicio</span>
        </router-link>
      </li>

      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="index" 
        class="breadcrumb-item"
      >
        <span class="separator">›</span>
        <router-link 
          v-if="index < breadcrumbs.length - 1" 
          :to="crumb.path" 
          class="breadcrumb-link"
        >
          {{ crumb.name }}
        </router-link>
        <span v-else class="current-page" aria-current="page">
          {{ crumb.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    breadcrumbs() {
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
.breadcrumb-container {
  padding: 12px 5%;
  background-color: #FDF9F1; /* Crema de tu paleta */
  border-bottom: 1px solid #F4B8C1; /* Rosa pastel */
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #5A4A42; /* Café suave */
}

.breadcrumb-link {
  text-decoration: none;
  color: #D1823C; /* Ocre */
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 4px;
}

.breadcrumb-link:hover {
  background-color: #F4B8C1;
  color: #ffffff;
}

.separator {
  margin: 0 8px;
  color: #B7B16B; /* Verde oliva */
  font-size: 1.2rem;
  font-weight: bold;
}

.current-page {
  font-weight: 600;
  color: #D26259; /* Rosa intenso */
  padding: 4px 8px;
}

.home-link .icon {
  font-size: 1rem;
}

@media (max-width: 600px) {
  .breadcrumb-link .text {
    display: none; /* En móvil solo mostramos el icono de inicio */
  }
}
</style>