<template>
  <div class="add-news">
    <h1>Habere Galerisi Güncelle</h1>
    <h1>{{ news.title }}</h1>

    <h2>Eski Haber Galerisi</h2>
    <h3>Silmek İstediğiniz Resmin Üzerine Tıklayınız</h3>
    <div class="image-grid">
      <div v-for="(image, index) in news_gallery" :key="index" class="grid-item">
        <img :src="image.gallery_image" style="max-width: 300px; max-height: 300px;"
          @click="confirmDelete(image.id, image.index)">
      </div>


    </div>

    <h3>Yeni Haber Resimleri Ekle</h3>
    <input type="file" ref="fileInput" @change="onImageChange" multiple>
    <div v-for="(image, index) in url" :key="index">
      <img :src="image.image" style="max-width: 300px; max-height: 300px;">
    </div>
    <button @click="updateGallery" class="güncellebtn">Resimleri Güncelle</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      url: [],
      fileInput: null,
      news_gallery: [],
      newsId: '',
      news_id: null,
      news: {
        title: '',
        images: '',
        news_date: '',
        summary: '',
        details: ''
      }
    }
  },
  methods: {
    onImageChange() {
      this.url = [];
      this.fileInput = this.$refs.fileInput;
      for (let i = 0; i < this.fileInput.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(this.fileInput.files[i]);
        reader.onload = () => {
          this.url.push({ image: reader.result });
        }
      }
    },

    updateGallery() {
      const files = this.$refs.fileInput.files;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      formData.append('news_id', this.news_id);
      axios.put('http://localhost:3000/api/gallery/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          this.$router.push('/haberler');
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    confirmDelete(id, imageIndex) {
      if (window.confirm("Bu resmi silmek istediğinize emin misiniz?")) {
        this.deleteImage(id, imageIndex);
      }
    },
    deleteImage(id, imageIndex) {
      console.log(imageIndex);

      axios.delete(`http://localhost:3000/api/gallery/${this.news_id}/${imageIndex}`)
        .then(response => {
          console.log(response.data);
          this.getUpdatedGallery();
          //this.news_gallery.splice(imageIndex, 1);
        })
        .catch(error => {
          console.error(error);
        });
    },
    getUpdatedGallery() {
      axios.get(`http://localhost:3000/news/${this.news_id}`)
        .then(response => {
          this.news_gallery = response.data.gallery_image.map((image, index) => ({
            id: image.id,
            index: index + 1,
            gallery_image: `data:image/png;base64, ${image}`
          }));
          console.log(this.news);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  created() {
    const id = this.$route.params.id;
    this.news_id = parseInt(id);

    axios.get(`http://localhost:3000/news/${id}`)
      .then(response => {
        this.news = response.data;
        this.news_gallery = response.data.gallery_image.map((image, index) => ({
          id: image.id,
          index: index + 1,
          gallery_image: `data:image/png;base64, ${image}`
        }));
        console.log(this.news);
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {
    this.getUpdatedGallery();
  }
}
</script>
