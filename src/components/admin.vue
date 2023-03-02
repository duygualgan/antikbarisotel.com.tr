<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="add-news">
      <h2>Haber Ekle</h2>
      <form class="admin-form" @submit.prevent="addNews">
        <div>
          <label>Başlık</label>
          <input type="text" v-model="title" />
        </div>
        <div>
          <label>Resim</label>
          <input type="text" v-model="images" />
        </div>
        <div>
          <label>Tarih</label>
          <input type="date" v-model="date" />
        </div>
        <div>
          <label>Metin</label>
          <textarea v-model="text"></textarea>
        </div>
        <button type="submit">Ekle</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        images: '',
        date: '',
        text: ''
      };
    },
    methods: {
      addNews() {
        const news = {
          title: this.title,
          images: this.images,
          date: this.date,
          text: this.text
        };
        axios.post('/addNews', news)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  };
  </script>
  