<template>
  <div class="detailss">
    <h1>{{ news.title }}</h1>
    <p class="date_details">{{ news.news_date }}</p>
    <h3>özet haber</h3>
    <p class="detail_text">{{ news.summary }}</p>
    <h3>detay haber</h3>
    <p class="detail_text">{{ news.details }}</p>
    <img class="detailsimg" :src="news.images" :alt="news.title">

    <!-- Galeri Resimleri -->
    <!-- <div class="gallery">
      <img v-for="(image, index) in news_gallery" :src="image.gallery_image" :alt="'Image ' + (index + 1)" :key="index" />
    </div> -->
    <div v-for="(image, index) in news_gallery" :key="index">
      <img :src="image.gallery_image" style="max-width: 300px; max-height: 300px;">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      news_gallery: [], // news_gallery'i boş bir dizi olarak başlatın
      news: {
        title: '',
        images: '',
        news_date: '',
        summary: '',
        details: ''
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
          gallery_image: `data:image/png;base64, ${image.gallery_image}`
        }));


        console.log(this.news);
        console.log(this.news_gallery);
        console.log("this");
        console.log("this22");
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
