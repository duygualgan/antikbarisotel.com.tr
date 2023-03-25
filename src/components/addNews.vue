<template>
  <div class="add-news">
    <h2>Haber Ekle</h2>

    <form @submit.prevent="saveNews">
      <label for="title">Haber Başlığı</label>
      <input type="text" id="title" v-model="news.title" required>

      <label for="date">Haber Tarihi</label>
      <input type="date" id="date" v-model="news.news_date" required>

      <label for="text">Haber Metini</label>
      <textarea id="text" v-model="news.text" required></textarea>

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
      news: {
        title: '',
        news_date: '',
        text: '',
        images: null
      }
    }
  },
  methods: {
    async saveNews() {

      const formData = new FormData()
      formData.append('title', this.news.title)
      formData.append('news_date', this.news.news_date)
      formData.append('text', this.news.text)
      formData.append('images', this.news.images)

      console.log(formData)

      try {

        await axios.post('http://localhost:3000/api/news', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        alert('Haber kaydedildi.')
      } catch (error) {
        console.log(error)
        alert('Haber kaydedilemedi.')
      }
    },
    onImageChange(event) {
      const file = event.target.files[0];
      this.news.images = file;

      // Görüntüyü önizleme alanında göstermek için
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.$refs.imagePreview.src = reader.result;
      };
    },
  }
}
</script>
