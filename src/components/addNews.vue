<template>
  <div class="add-news">
    <h2>Haber Ekle</h2>

    <form @submit.prevent="saveNews">
      <label for="title">Haber Başlığı</label>
      <input type="text" id="title" v-model="news.title" required>

      <label for="date">Haber Tarihi</label>
      <input type="date" id="date" v-model="news.news_date" required>

      <label for="text">Haber Metini Özeti</label>
      <textarea id="summary" v-model="news.summary" required maxlength="250"></textarea>

      <label for="text">Haber Metini Detayı</label>
      <textarea id="details" v-model="news.details" required></textarea>

      <label for="images">Haber Resmi</label>
      <input type="file" id="images" ref="fileInput" @change="onImageChange">
      <img ref="imagePreview" style="max-width: 300px; max-height: 300px;">
      <button type="submit">Kaydet</button>
    </form>
  </div>
</template>  

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newsId: '',
      news: {
        id: '',
        title: '',
        news_date: '',
        summary: '',
        images: null,
        details: ''
      }
    }
  },
  created() {
    const today = new Date().toISOString().split('T')[0];
    this.news.news_date = today;
  },
  methods: {
    async saveNews() {

      await axios.post('http://localhost:3000/api/news', this.news, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          // this.$router.push('/galeri/' + response.data.newsId)
          this.$router.push('/haberler');
          console.log(response.data);
        })
        .catch(error => {
          console.log(error)
        })
    },
    onImageChange(event) {
      const file = event.target.files[0];
      this.news.images = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.$refs.imagePreview.src = reader.result;
      };
    },
  }
}
</script>

