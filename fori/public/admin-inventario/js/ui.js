export default class InventoryUI {
    constructor() {
        this.tableBody = document.getElementById('table-body');
        this.emptyMsg = document.getElementById('empty-msg');
        this.form = document.getElementById('product-form');
        this.btnSave = document.getElementById('btn-save');
        this.btnCancel = document.getElementById('btn-cancel');
    }

    renderTable(products) {
        // Limpiar tabla
        this.tableBody.innerHTML = '';

        if (products.length === 0) {
            this.emptyMsg.classList.remove('hidden');
            return;
        } else {
            this.emptyMsg.classList.add('hidden');
        }

        products.forEach(prod => {
            const row = document.createElement('tr');

            // 1. CELDA IMAGEN 
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            // Usamos placehold.co que es más estable, o la imagen guardada
            img.src = prod.imagen || 'https://placehold.co/50'; 
            img.alt = prod.nombre;
            img.classList.add('product-thumb');
            
            // Manejo de error si la imagen no carga 
            img.onerror = () => { img.src = 'https://placehold.co/50?text=?'; };
            
            imgCell.appendChild(img);

            // 2. CELDA NOMBRE 
            const nameCell = document.createElement('td');
            nameCell.textContent = prod.nombre;
            
            // 3. CELDA CATEGORÍA 
            const catCell = document.createElement('td');
            catCell.textContent = prod.categoria;

            // 4. CELDA PRECIO 
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${parseFloat(prod.precio).toFixed(2)}`;

            // 5. CELDA STOCK 
            const stockCell = document.createElement('td');
            stockCell.textContent = prod.stock;
            if(prod.stock < 5) stockCell.style.color = 'red'; // Alerta visual

            // 6. CELDA ACCIONES 
            const actionsCell = document.createElement('td');
            
            // Botón Editar
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.classList.add('action-btn', 'edit');
            editBtn.onclick = () => this.fillForm(prod);

            // Botón Eliminar
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('action-btn', 'delete');
            deleteBtn.onclick = () => {
                const event = new CustomEvent('delete-product', { detail: prod.id });
                document.dispatchEvent(event);
            };

            actionsCell.appendChild(editBtn);
            actionsCell.appendChild(deleteBtn);

            // --- AGREGAR TODO A LA FILA EN ORDEN ---
            row.appendChild(imgCell);    // 1. Imagen
            row.appendChild(nameCell);   // 2. Nombre
            row.appendChild(catCell);    // 3. Categoría
            row.appendChild(priceCell);  // 4. Precio
            row.appendChild(stockCell);  // 5. Stock
            row.appendChild(actionsCell);// 6. Acciones

            // Agregar fila a la tabla
            this.tableBody.appendChild(row);
        });
    }

    fillForm(product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('nombre').value = product.nombre;
        document.getElementById('categoria').value = product.categoria;
        document.getElementById('precio').value = product.precio;
        document.getElementById('stock').value = product.stock;
        // Nota: El input type="file" no se puede pre-llenar por seguridad del navegador

        this.btnSave.textContent = 'Actualizar Producto';
        this.btnCancel.classList.remove('hidden');
    }

    resetForm() {
        this.form.reset();
        document.getElementById('product-id').value = '';
        this.btnSave.textContent = 'Guardar Flor';
        this.btnCancel.classList.add('hidden');
    }

    showMessage(message, type = 'success') {
        const div = document.createElement('div');
        div.textContent = message;
        div.style.position = 'fixed';
        div.style.top = '20px';
        div.style.right = '20px';
        div.style.padding = '15px';
        div.style.background = type === 'success' ? '#4CAF50' : '#F44336';
        div.style.color = 'white';
        div.style.borderRadius = '5px';
        div.style.zIndex = '1000';
        
        document.body.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}