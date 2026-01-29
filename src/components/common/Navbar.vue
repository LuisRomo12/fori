<template>
  <header class="main-header">
    <div class="top-bar">
      <p>¡Envío gratis en pedidos mayores a $500! 🌸</p>
    </div>

    <nav class="navbar" aria-label="Navegación principal">
      <div class="logo">
        <a href="/">
          <span class="accent">UT</span>Flower
        </a>
      </div>

      <button 
        class="menu-toggle" 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        :aria-expanded="isMobileMenuOpen"
        aria-controls="nav-menu"
      >
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

      <ul id="nav-menu" :class="['nav-links', { 'is-active': isMobileMenuOpen }]">
        <li><a href="/" class="active">Inicio</a></li>
        
        <li class="has-submenu" @mouseenter="openSubmenu('catalog')" @mouseleave="closeSubmenu">
          <a href="/catalogo" aria-haspopup="true">Catálogo ▾</a>
          <ul class="submenu" v-show="activeSubmenu === 'catalog'">
            <li><a href="/catalogo/rosas">Rosas</a></li>
            <li><a href="/catalogo/tulipanes">Tulipanes</a></li>
            <li><a href="/catalogo/lirios">Lirios</a></li>
          </ul>
        </li>

        <li><a href="/constructor" class="highlight">Hazlo tú mismo</a></li>
        <li><a href="/nosotros">Nosotros</a></li>
        <li><a href="/contacto">Contacto</a></li>

        <div class="nav-icons">
          <a href="/buscar" aria-label="Buscar"><i class="icon-search">🔍</i></a>
          <li class="has-submenu" @mouseenter="openSubmenu('user')" @mouseleave="closeSubmenu">
            <a href="/perfil" aria-label="Cuenta">👤</a>
            <ul class="submenu" v-show="activeSubmenu === 'user'">
              <li><a href="/login">Iniciar Sesión</a></li>
              <li><a href="/registro">Registrarse</a></li>
            </ul>
          </li>
          <a href="/carrito" class="cart-icon" aria-label="Carrito">
            🛒 <span class="badge">0</span>
          </a>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isMobileMenuOpen: false,
      activeSubmenu: null
    };
  },
  methods: {
    openSubmenu(menu) {
      this.activeSubmenu = menu;
    },
    closeSubmenu() {
      this.activeSubmenu = null;
    }
  }
};
</script>

<style scoped>
/* Nueva Paleta: Rosa Pastel #F4B8C1, Crema #FDF9F1, Rosa Intenso #D66D81 */
:root {
  --primary-pink: #F4B8C1;      /* Rosa de los toldos y flores */
  --accent-pink: #D66D81;       /* Rosa oscuro para contrastes y hovers */
  --bg-creme: #FDF9F1;         /* Tono crema de la fachada para el fondo */
  --text-soft: #5A4A42;        /* Café suave para el texto (más orgánico que el negro) */
  --white: #ffffff;
}

.main-header {
  box-shadow: 0 4px 15px rgba(90, 74, 66, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--white);
  border-bottom: 1px solid var(--primary-pink);
}

.top-bar {
  background-color: var(--primary-pink);
  color: var(--white);
  text-align: center;
  padding: 8px 0;
  font-size: 0.85rem;
  letter-spacing: 1px;
  font-weight: 500;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 5%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  font-size: 1.6rem;
  font-family: 'Playfair Display', serif; /* Sugerencia de fuente elegante */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.logo a { color: var(--text-soft); text-decoration: none; }
.logo .accent { color: var(--accent-pink); }

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-soft);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.nav-links a:hover, .active {
  color: var(--accent-pink);
}

/* Submenús */
.has-submenu { position: relative; }

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--bg-creme);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  padding: 15px 0;
  min-width: 180px;
  list-style: none;
  border-radius: 4px;
  border-top: 4px solid var(--primary-pink);
}

.submenu li a {
  padding: 12px 25px;
  display: block;
  font-size: 0.85rem;
}

.submenu li a:hover {
  background-color: var(--primary-pink);
  color: var(--white);
}

/* Botón Especial "Hazlo tú mismo" */
.highlight {
  background-color: var(--bg-creme);
  border: 2px solid var(--accent-pink) !important;
  color: var(--accent-pink) !important;
  padding: 8px 20px;
  border-radius: 25px;
  text-transform: uppercase;
  font-size: 0.8rem !important;
  letter-spacing: 1px;
}

.highlight:hover {
  background-color: var(--accent-pink);
  color: var(--white) !important;
}

/* Iconos */
.nav-icons {
  display: flex;
  gap: 20px;
  align-items: center;
  color: var(--text-soft);
}

.badge {
  background-color: var(--accent-pink);
  color: white;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 0.7rem;
}

/* Móvil */
@media (max-width: 768px) {
  .nav-links {
    background-color: var(--bg-creme);
    border-top: 1px solid var(--primary-pink);
  }
}
</style>