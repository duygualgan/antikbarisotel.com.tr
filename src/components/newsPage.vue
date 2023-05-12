<template>
  <div class="news">
    <h2 class="colorh2">HABERLER</h2>
    <div class="onenews" v-for="news in filteredNews" :key="news.id">
      <div class="news-header">
        <h2>{{ news.title }}</h2>
        <p class="date">{{ formatDate(news.news_date) }}</p>
      </div>
      <div class="news-body">
        <img class="newsimg" :src="news.images" :alt="news.title">
        <p class="summary">{{ news.summary }}</p>
      </div>
      <router-link :to="{ name: 'newsDetails', params: { id: news.id } }" class="godetails" > Haber Detayları </router-link>
      <router-view />
    </div>
  </div>
</template>

  
<script lang="js">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { Buffer } from 'buffer';


// @ts-ignore
window.Buffer = Buffer;


export default {
  setup() {
    const filteredNews = ref([]);
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    };

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3000/status");

        const news = response.data.map(item => {          
          return {
            id: item.id,
            images: `data:image/png;base64, ${item.imageAsBase64}`,
            news_date: item.news_date,
            summary: item.summary,
            title: item.title
          }
        })
        console.log(news)

        filteredNews.value = news;

        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    });

    return { filteredNews,formatDate };
  }
};
</script>
