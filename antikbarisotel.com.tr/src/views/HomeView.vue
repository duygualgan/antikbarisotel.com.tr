<!-- eslint-disable no-unused-vars -->
<script>
import Banner from '../components/banner.vue'
import Rooms from '../components/rooms.vue'
import Service from '../components/services.vue'


export default {
  name: 'indexPage',
  components: {
    Banner,
    Rooms,
    Service
  }
}
</script>


<template>
  <Banner></Banner>
  <Rooms></Rooms>
  <Service></Service>
</template>