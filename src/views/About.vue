<template>
  <div class="about-container">
    <section class="about-hero">
      <h1>Nuestra Historia</h1>
      <div class="divider"></div>
      <p class="subtitle">Conectando personas a través de la belleza natural de las flores.</p>
    </section>

    <div class="content-wrapper">
      <div class="card">
        <div class="icon-header">🌸</div>
        <h2>¿Quiénes somos?</h2>
        <p>
          UTFLOWER nació de la pasión por llevar frescura y creatividad a cada rincón. 
          Somos una empresa dedicada a proporcionar los arreglos más hermosos para todas tus ocasiones especiales.
        </p>
      </div>

      <div class="card highlight">
        <h2>Nuestra Misión</h2>
        <p>
          Ofrecer productos de la más alta calidad y un servicio excepcional, 
          asegurando que cada pétalo cuente una historia de amor, amistad o gratitud.
        </p>
      </div>

      <div class="card">
        <h2>¿Por qué elegirnos?</h2>
        <ul class="benefit-list">
          <li>✔ Flores frescas de productores locales.</li>
          <li>✔ Diseños personalizados para cada cliente.</li>
          <li>✔ Entrega rápida y confiable.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  background-color: #FDF9F1; /* Fondo crema de tu paleta */
  min-height: 80vh;
}

.about-hero {
  text-align: center;
  padding: 60px 20px;
}

h1 {
  color: #D26259; /* Rosa intenso */
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.divider {
  width: 60px;
  height: 4px;
  background-color: #F4B8C1; /* Rosa pastel */
  margin: 0 auto 20px;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  padding: 0 20px 60px;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(90, 74, 66, 0.05);
  border: 1px solid #F4B8C1;
}

.highlight {
  border: 2px solid #D1823C; /* Color ocre */
}

h2 {
  color: #D1823C;
  margin-bottom: 15px;
}

p {
  color: #5A4A42; /* Café suave */
  line-height: 1.6;
}

.benefit-list {
  list-style: none;
  padding: 0;
  color: #5A4A42;
}

.benefit-list li {
  margin-bottom: 10px;
}
</style>