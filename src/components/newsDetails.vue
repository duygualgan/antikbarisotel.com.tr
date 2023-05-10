<template>
  <div class="detailss">
    <h1>{{ news.title }}</h1>
    <p class="date_details">{{ news.news_date }}</p>
    <h3>özet haber</h3>
    <p class="detail_text">{{ news.summary }}</p>
    <h3>detay haber</h3>
    <p class="detail_text">{{ news.details }}</p>
    <img class="detailsimg" :src="news.images" :alt="news.title">

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
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
        this.news = response.data;
        this.news.images = response.data.images.map(image => `data:image/png;base64, ${image}`).join(',');       
        console.log(this.news)
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>


