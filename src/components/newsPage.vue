<template>
    <div class="news">
      <h2 class="colorh2">HABERLER</h2>
      <div class="onenews" v-for="news in filteredClothes" :key="news.id">
            <!-- <router-link to="/news/${news.id}">  {{news.title}}</router-link> -->
            <h2>{{news.title}}</h2>
            <img class="clthimg" :src="news.images" :alt="news.title">
            <p class="date">{{ news.news_date }}</p>
            <p>{{ news.text }}</p>
            <router-view/>
       </div>
    </div>
  </template>
  
  <script lang="js">
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  

  export default {
  setup() {
    const filteredClothes = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3000/status");
        filteredClothes.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });

    return { filteredClothes };
  }
};
</script>
