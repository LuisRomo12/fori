// app.js: Controlador principal

import InventoryModel from './data.js';
import InventoryUI from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new InventoryModel();
    const ui = new InventoryUI();

    // Carga inicial
    refreshTable();

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

    // 1. Manejo del Formulario (Crear / Editar)
// Manejo del Formulario (Modificado para imágenes)
document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('product-id').value;
    const nombre = document.getElementById('nombre').value;
    const categoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;
    const imageInput = document.getElementById('imagen');

    let imagenData = null;

    // 1. Verificamos si el usuario subió una nueva foto
    if (imageInput.files.length > 0) {
        try {
            imagenData = await convertBase64(imageInput.files[0]);
        } catch (error) {
            console.error("Error al leer la imagen", error);
            alert("Error al procesar la imagen");
            return;
        }
    }

    // 2. Preparamos los datos básicos
    const productData = { nombre, categoria, precio, stock };

    // 3. Solo agregamos la imagen si se subió una nueva
    if (imagenData) {
        productData.imagen = imagenData;
    } 
    // Si estamos creando (sin ID) y no hay imagen, ponemos una por defecto
    else if (!id) {
        productData.imagen = 'https://via.placeholder.com/50'; // Placeholder gris
    }

    if (id) {
        // Modo Edición: El modelo mezclará los datos nuevos con la imagen vieja si no enviamos una nueva
        model.editProduct(id, productData);
        ui.showMessage('Flor actualizada correctamente');
    } else {
        // Modo Creación
        model.addProduct(productData);
        ui.showMessage('Flor agregada al inventario');
    }

    ui.resetForm();
    refreshTable(); // Esta función debe estar definida como en tu código anterior
});

    // 2. Cancelar Edición
    document.getElementById('btn-cancel').addEventListener('click', () => {
        ui.resetForm();
    });

    // 3. Filtros y Búsqueda (Evento 'input' para búsqueda en tiempo real)
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-category');

    [searchInput, filterSelect].forEach(el => {
        el.addEventListener('input', () => {
            const term = searchInput.value;
            const cat = filterSelect.value;
            const filtered = model.filterProducts(term, cat);
            ui.renderTable(filtered);
        });
    });

    // 4. Manejo de Eliminación (Escuchando el CustomEvent de ui.js)
    document.addEventListener('delete-product', (e) => {
        const id = e.detail;
        if(confirm('¿Estás seguro de que quieres eliminar esta flor del inventario?')) {
            model.deleteProduct(id);
            ui.showMessage('Producto eliminado', 'error');
            refreshTable();
        }
    });

    // Función auxiliar para repintar la tabla
    function refreshTable() {
        const products = model.getProducts();
        ui.renderTable(products);
    }
});