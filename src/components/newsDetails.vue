<template>
  <div class="detailss">
    <h1>{{ news.title }}</h1>
    <img :src="news.images" :alt="news.title">
    <p>{{ news.news_date }}</p>
    <p>{{ news.text }}</p>
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
        text: ''
      }
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`http://localhost:3000/news/${id}`)
      .then(response => {
        this.news = response.data;
        // this.news.images= this.news.images.split()        
        console.log(this.news)
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
.detailss{
  margin-top: 250px;
}
</style>


