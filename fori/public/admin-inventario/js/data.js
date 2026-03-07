// data.js: Manejo de Datos y LocalStorage

const STORAGE_KEY = 'utflower_inventory';

export default class InventoryModel {
    constructor() {
        this.products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    // Guardar en LocalStorage
    _commit() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.products));
    }

    addProduct(product) {
        // Generar ID único basado en timestamp
        const newProduct = {
            id: Date.now(),
            nombre: product.nombre,
            categoria: product.categoria,
            precio: parseFloat(product.precio),
            stock: parseInt(product.stock)
        };
        this.products.push(newProduct);
        this._commit();
        return newProduct;
    }

    editProduct(id, updatedData) {
        this.products = this.products.map(prod => 
            prod.id === parseInt(id) 
            ? { ...prod, ...updatedData, id: parseInt(id) } // Esto conserva la imagen vieja si updatedData no trae una nueva
            : prod
        );
        this._commit();
    }

    deleteProduct(id) {
        this.products = this.products.filter(prod => prod.id !== parseInt(id));
        this._commit();
    }

    getProducts() {
        return this.products;
    }

    // Filtros y Búsqueda combinados
    filterProducts(searchTerm, category) {
        return this.products.filter(prod => {
            const matchesSearch = prod.nombre.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || prod.categoria === category;
            return matchesSearch && matchesCategory;
        });
    }
}