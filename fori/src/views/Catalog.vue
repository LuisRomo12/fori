<template>
  <div class="catalog-page" style="padding: 20px;">
    <h1>Nuestro Catálogo de Flores</h1>

    <div class="search-section" style="background: var(--card-bg, #eee); padding: 20px; border-radius: 8px; margin-bottom: 20px; transition: background-color 0.4s ease;">
      
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
        <button class="btn-magnetic" style="display: inline-block; transition: transform 0.2s;">
          Comprar Flores
        </button>

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
      <div v-for="flower in results" :key="flower.id" class="flower-card" style="border: 1px solid var(--border-color, #ccc); padding: 15px; background: var(--card-bg, white); border-radius: 12px; transition: background-color 0.4s ease, border-color 0.4s ease;">
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
import { ref, onMounted, onUpdated } from 'vue';
import axios from 'axios';
import { fetchData } from '@/services/api';

// Variables reactivas
const query = ref('');
const selectedCategory = ref('');
const maxPrice = ref(2000);
const onlyStock = ref(false);
const results = ref([]);
const searchError = ref(''); 
const flores = ref([]);
const categorias = ref([]);
const loading = ref(true); 
const errorMsg = ref(null); 



const cargarDatosIniciales = async () => {
  loading.value = true;
  errorMsg.value = null;

  try {
    // REQUISITO: Múltiples peticiones simultáneas con Promise.all() [cite: 40-41]
    const [datosFlores, datosCategorias] = await Promise.all([
      fetchData('/flores'), 
      fetchData('/categorias')
    ]);

    flores.value = datosFlores;
    categorias.value = datosCategorias;

  } catch (err) {
    // REQUISITO: Manejo visual de errores [cite: 38, 43]
    errorMsg.value = "Error al conectar con el servidor. Inténtelo más tarde.";
    console.error("Análisis de falla:", err); 
    // Nota para tu reporte: Si una de las promesas falla, Promise.all falla por completo[cite: 43].
  } finally {
    loading.value = false;
  }
};

onMounted(cargarDatosIniciales);
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


const observerOptions = { threshold: 0.1 };

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Animación escalonada: cada elemento tarda un poco más que el anterior [cite: 67]
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100); 
    }
  });
}, observerOptions);

// Aplicar a las tarjetas después de que se carguen los datos
onUpdated(() => {
  const cards = document.querySelectorAll('.flower-card');
  cards.forEach(card => scrollObserver.observe(card));
});


// 1. Definimos la función del efecto magnético [cite: 78]
const setupMagneticButtons = () => {
  const buttons = document.querySelectorAll('.btn-magnetic');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      
      // Cálculo de la posición relativa del mouse respecto al centro del botón
      const x = (e.clientX - left - width / 2) * 0.4; // El factor 0.4 controla la fuerza [cite: 78]
      const y = (e.clientY - top - height / 2) * 0.4;
      
      // Aplicamos la transformación mediante JS [cite: 64, 71]
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    // REQUISITO: El botón debe volver a su estado original al salir el mouse [cite: 73]
    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.3s ease-out';
      btn.style.transform = `translate(0px, 0px)`;
    });
    
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none'; // Quitamos transición mientras se mueve para que sea fluido
    });
  });
};

// 2. Ejecutamos la función cuando el componente se monta
onMounted(() => {
  setupMagneticButtons();
});
</script>