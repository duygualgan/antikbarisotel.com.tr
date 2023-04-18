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

      <div>
        <label for="secondaryImages">Diğer Resimler</label>
        <input type="file" id="secondaryImages" ref="secondaryFileInput" @change="onSecondaryImageChange" multiple>
        <div v-if="news.secondaryImages.length">
          <div v-for="(image, index) in news.secondaryImages" :key="index">
            <img :src="image.url" style="max-width: 300px; max-height: 300px;">
          </div>
        </div>
      </div>

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
        images: null,
        secondaryImages: []
      }
    }
  },
  methods: {
    async saveNews() {

      const formData = new FormData()
      formData.append('title', this.news.title)
      formData.append('news_date', this.news.news_date)
      formData.append('text', this.news.text)
      formData.append('images', this.news.images);
      

      // Birden fazla resim seçilmişse, her bir resmi formData'ya ekleyin
if (this.news.images && this.news.images.length) {
  for (let i = 0; i < this.news.images.length; i++) {
    formData.append('images[]', this.news.images[i]);
  }
} else if (this.news.images) {
  // Tek resim seçilmişse, formData'ya yalnızca bir resim ekleyin
  formData.append('images', this.news.images);
}

      // console.log(formData)

      try {

        await axios.post('http://localhost:3000/api/news',formData, {
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
    onSecondaryImageChange(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {  
        const file = files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.news.secondaryImages.push(reader.result);
        };
      }
    },
  }
}
</script>

