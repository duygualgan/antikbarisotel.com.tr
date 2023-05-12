<template>
    <section class = "customers" id = "customers">
        <div class = "sec-width">
            <div class = "title">
                <h2>EN SON HABERLER</h2>
            </div>
            <div class = "customers-container" >
               
                <div class = "customer" v-for="news in filteredNews" :key="news.id" > 
                    <img  :src="news.images" :alt="news.title">            
                    <h3>{{ news.title }}</h3>
                    <p>{{ news.summary }}</p>          
                    <span>{{ formatDate(news.news_date) }}</span>
                </div>
            </div>
        </div>
    </section>
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
        const response = await axios.get("http://localhost:3000/status/son3");

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

    return { filteredNews, formatDate };
  }
};
</script>
