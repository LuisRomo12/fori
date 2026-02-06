<template>
  <div class="catalog-page" style="padding: 20px;">
    <h1>Nuestro Catálogo de Flores</h1>

    <div class="search-section" style="background: #eee; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      
      <form @submit.prevent="handleSearchWithValidation">
        <div style="display: flex; gap: 10px; margin-bottom: 10px;">
          <input 
            type="text" 
            v-model="query" 
            required 
            pattern="^[a-zA-Z\s]+$"
            placeholder="Buscar por nombre..."
            style="flex: 1; padding: 8px;"
          />
          
          <select v-model="selectedCategory" @change="handleSearch" style="padding: 8px;">
            <option value="">Todas las categorías</option>
            <option value="Rosas">Rosas</option>
            <option value="Tulipanes">Tulipanes</option>
            <option value="Lirios">Lirios</option>
          </select>

          <button type="submit" style="padding: 8px 16px; cursor: pointer;">Buscar</button>
        </div>

        <p v-if="searchError" style="color: red; font-size: 0.8em; margin-bottom: 10px;">
          {{ searchError }}
        </p>

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
      </form>
    </div>

    <div class="flower-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
      <div v-for="flower in results" :key="flower.id" class="flower-card" style="border: 1px solid #ccc; padding: 15px;">
        <h3>{{ flower.name }}</h3>
        <p>Categoría: {{ flower.category }}</p>
        <p>Precio: <strong>${{ flower.price }}</strong></p>
        <p v-if="flower.stock <= 0" style="color: red;">Agotado</p>
      </div>
    </div>
    
    <p v-if="results.length === 0" style="margin-top: 20px;">No se encontraron flores.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Variables reactivas
const query = ref('');
const selectedCategory = ref('');
const maxPrice = ref(2000);
const onlyStock = ref(false);
const results = ref([]);
const searchError = ref(''); // Para mensajes de error personalizados

// Lógica de búsqueda principal
const handleSearch = async () => {
  try {
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

// Función de validación (Script) exigida por la Actividad 5
const handleSearchWithValidation = () => {
  // Validación de campo obligatorio (Email/Búsqueda)
  if (!query.value.trim()) {
    searchError.value = "El campo de búsqueda no puede estar vacío.";
    return;
  }
  
  // Limpia errores y ejecuta la búsqueda si es válido
  searchError.value = "";
  handleSearch();
};

onMounted(handleSearch);
</script>