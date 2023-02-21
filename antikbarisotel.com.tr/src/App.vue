<!-- eslint-disable no-unused-vars -->
<script >
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  
}
</script>

<template>
  <Header />
  <router-view />
  <Footer />
</template>

<style>
 RouteView {
   width: 100%;
 }
</style>



<style >
@import "./assets/style.css";
</style>


