<script lang="js">
import Service from '../components/services.vue'
import ServiceExstra from '../components/service-exstra.vue'


export default {
  name: 'ServicesPage',
  components: {
    Service,
    ServiceExstra
  }
}
</script>


<template>
  <Service></Service>
  <ServiceExstra></ServiceExstra>
</template>