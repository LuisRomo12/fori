<template>
  <div class="catalog-page" style="padding: 20px;">
    <h1>Nuestro Catálogo de Flores</h1>

    <div class="search-section" style="background: #eee; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <div style="display: flex; gap: 10px; margin-bottom: 10px;">
        <input 
          type="text" 
          v-model="query" 
          @input="handleSearch" 
          placeholder="Buscar por nombre..."
          style="flex: 1; padding: 8px;"
        />
        
        <select v-model="selectedCategory" @change="handleSearch" style="padding: 8px;">
          <option value="">Todas las categorías</option>
          <option value="Rosas">Rosas</option>
          <option value="Tulipanes">Tulipanes</option>
          <option value="Lirios">Lirios</option>
        </select>
      </div>

      <div style="display: flex; gap: 20px; align-items: center;">
        <label>
          Precio máx: ${{ maxPrice }}
          <input type="range" min="0" max="2000" v-model="maxPrice" @input="handleSearch">
        </label>

        <label>
          <input type="checkbox" v-model="onlyStock" @change="handleSearch"> 
          Solo disponibles (Stock)
        </label>
      </div>
    </div>

    <div class="flower-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
      <div v-for="flower in results" :key="flower.id" class="flower-card" style="border: 1px solid #ccc; padding: 15px;">
        <h3>{{ flower.name }}</h3>
        <p>Categoría: {{ flower.category }}</p>
        <p>Precio: <strong>${{ flower.price }}</strong></p>
        <p v-if="flower.stock <= 0" style="color: red;">Agotado</p>
      </div>
    </div>
    
    <p v-if="results.length === 0">No se encontraron flores.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const query = ref('');
const selectedCategory = ref('');
const maxPrice = ref(2000);
const onlyStock = ref(false);
const results = ref([]);

const handleSearch = async () => {
  try {
    // Asegúrate de usar 127.0.0.1:8000 que es donde corre tu uvicorn
    const response = await axios.get(`http://127.0.0.1:8000/api/search`, {
      params: {
        q: query.value,
        category: selectedCategory.value,
        max_price: maxPrice.value,
        only_stock: onlyStock.value
      }
    });
    results.value = response.data;
  } catch (error) {
    console.error("Error al obtener flores:", error);
  }
};

onMounted(handleSearch);
</script>