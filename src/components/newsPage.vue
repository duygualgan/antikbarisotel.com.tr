<template>
  <div class="news">
    <h2 class="colorh2">HABERLER</h2>
    <div class="onenews" v-for="news in filteredNews" :key="news.id">
      <router-link to="/news/${news.id}"> {{ news.title }}</router-link>
      <h2>{{ news.title }}</h2>
      <img class="newsimg" :src="news.images" :alt="news.title">
      <p class="date">{{ news.news_date }}</p>
      <p>{{ news.text }}</p>
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

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3000/status");

        const news = response.data.map(item => {
    let _buffer = new Buffer.from(item.images.data, 'base64')

    return {
        id: item.id,
        images: "data:image/png;base64, "+ _buffer.toString('base64'),
        news_date: item.news_date,
        text: item.text,
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

    return { filteredNews };
  }
};
</script>
