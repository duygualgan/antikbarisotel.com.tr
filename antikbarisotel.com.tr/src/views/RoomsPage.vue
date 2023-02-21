<script>
import Rooms from '../components/rooms.vue'
import RoomService from '../components/room-service.vue'


export default {
  name: 'RoomsPage',
  components: {
    Rooms,
    RoomService
  }
}
</script>


<template>
  <Rooms></Rooms>
  <RoomService></RoomService>
</template>