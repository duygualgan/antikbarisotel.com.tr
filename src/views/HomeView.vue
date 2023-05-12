<!-- eslint-disable no-unused-vars -->
<script>
import Banner from '../components/banner.vue'
import Rooms from '../components/rooms.vue'
import Service from '../components/services.vue'
import News from '../components/newsSection.vue'


export default {
  name: 'indexPage',
  components: {
    Banner,
    News,
    Rooms,
    Service
  }
}
</script>


<template>
  <Banner></Banner>
  <News></News>
  <Rooms></Rooms>
  <Service></Service>
</template>