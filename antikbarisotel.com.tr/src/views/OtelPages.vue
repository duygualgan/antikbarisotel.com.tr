<!-- eslint-disable no-unused-vars -->
<script>
import Roportaj from '../components/otel-youtube.vue'
import OtelService from '../components/otel-service.vue'
import OtelBanner from '../components/otel-banner.vue'


export default {
  name: 'OtelPage',
  components: {
    Roportaj,
    OtelService,
    OtelBanner
  }
}
</script>


<template>
  <Roportaj></Roportaj>
  <OtelService></OtelService>
  <OtelBanner></OtelBanner>
</template>