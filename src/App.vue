<template>
  <div id="app">
    <Navbar /> 
    
    <router-view /> 

    <Footer />
  </div>
</template>

<script>
import Navbar from './components/common/Navbar.vue'
import Footer from './components/common/Footer.vue'
import breadcrumbs from './components/common/Breadcrumbs.vue'

export default {
  components: {
    Navbar,
    Footer,
    breadcrumbs


  }
}
</script>