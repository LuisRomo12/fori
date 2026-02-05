<script setup>
import { ref } from 'vue'
import axios from 'axios'

const query = ref('')
const results = ref([])

const performSearch = async () => {
  try {
    // Llamada a la API que definimos en el backend
    const response = await axios.get(`http://127.0.0.1:8000/api/search?q=${query.value}`)
    results.value = response.data.results
    console.log("Respuesta JSON:", response.data) // Esto sirve para tu captura de evidencia
  } catch (error) {
    console.error("Error al buscar:", error)
  }
}
</script>

<template>
  <div class="search-container">
    <input v-model="query" @input="performSearch" placeholder="Busca tu flor ideal...">
    <div v-for="flower in results" :key="flower.id">
      <p>{{ flower.name }} - ${{ flower.price }}</p>
    </div>
  </div>
</template>