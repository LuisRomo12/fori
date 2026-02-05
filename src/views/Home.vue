<template>
  <div class="home-view">
    <div class="hero">
      <h1>Bienvenido a UTFlower</h1>
      <p>Explora nuestras flores frescas y diseños exclusivos.</p>
      <router-link to="/catalogo" class="btn-primary">Ver Catálogo</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home-view {
  padding: 40px 5%;
  text-align: center;
}
.btn-primary {
  background-color: #D1823C; /* Tu color ocre */
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 20px;
}
</style>