<template>
  <div class="detailss">
    <h1>{{ news.title }}</h1>
    <p class="date_details">{{ formatDate(news.news_date) }}</p>

    <img class="detailsimg" :src="news.images" :alt="news.title">
    
    <h3>Haber Detayı</h3>
    <p class="detail_text">{{ news.details }}</p>

    <h3>Haber Galerisi</h3>
    <div class="image-grid">
      <div v-for="(image, index) in news_gallery" :key="index" class="grid-item">
        <img :src="image.gallery_image" style="max-width: 300px; max-height: 300px;">
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';

export default {
  data() {
    return {
      news_gallery: [], 
      news: {
        title: '',
        images: '',
        news_date: '',
        summary: '',
        details: '',
      }      
    };
  },

  created() {
    const id = this.$route.params.id;
    axios.get(`http://localhost:3000/news/${id}`)
      .then(response => {
        console.log("duygu");
        console.log(response.data);

        this.news = response.data;
        this.news.images = response.data.images.map(image => `data:image/png;base64, ${image}`).join(',');

        this.news_gallery = response.data.gallery_image.map(image => ({
          gallery_image: `data:image/png;base64, ${image}`
        }));

        console.log(this.news);
        console.log(this.news_gallery);
        console.log("this");
        console.log("this22");
      })
      .catch(error => {
        console.log(error);
      });
  },
  setup() {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    };

    

    return {formatDate };
  }
};
</script>
