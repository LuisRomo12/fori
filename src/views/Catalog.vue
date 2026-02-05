<template>
  <div class="container">
    <h1>Nuestro Catálogo de Flores</h1>
  </div>


    <div class="search-section">
      <input 
        type="text" 
        v-model="query" 
        @input="handleSearch" 
        placeholder="Buscar flores..."
      />

      <select v-model="selectedCategory" @change="handleSearch">
        <option value="">Todas las categorías</option>
        <option value="Rosas">Rosas</option>
        <option value="Tulipanes">Tulipanes</option>
        <option value="Lirios">Lirios</option>
      </select>
    </div>

    <div class="flower-grid">
      <div v-for="flower in results" :key="flower.id" class="flower-card">
        <h3>{{ flower.name }}</h3>
        <p>Categoría: {{ flower.category }}</p>
        <span>${{ flower.price }}</span>
      </div>
    </div>
 
</template>



<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const query = ref('');
const selectedCategory = ref('');
const results = ref([]);

const handleSearch = async () => {
  // Llamada a tu API de FastAPI
  // Se añaden parámetros para búsqueda simple y avanzada
  const response = await axios.get(`http://localhost:8000/api/search`, {
    params: {
      q: query.value,
      category: selectedCategory.value
    }
  });
  results.value = response.data.results;
};


</script>

