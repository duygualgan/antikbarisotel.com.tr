<script>
import Kroki from '../components/kroki.vue'
import CommService from '../components/communication-service.vue'


export default {
  name: 'ContactPage',
  components: {
    Kroki,
    CommService
  }
}
</script>


<template>
  <Kroki></Kroki>
  <CommService></CommService>
</template>