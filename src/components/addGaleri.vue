<template>
    <div class="add-news">
        <h1>Galeri</h1>
        <h1>{{ news.title }}</h1>
        <p class="detail_text">{{ news.summary }}</p>
        <img class="detailsimg" :src="news.images" :alt="news.title">
            
        <!-- <input type="file" ref="fileInput" @change="onImageChange" multiple> -->
        <ul>
        <input type="checkbox" v-model="selectedGalleries" :value="gallery.id">{{ gallery.name }}
   
    </ul>
        
        <div v-for="(image, index) in url" :key="index">
            <img :src="image.image" style="max-width: 300px; max-height: 300px;">
        </div>
        <button @click="saveImages">Resimleri Kaydet</button>
    </div>
</template>
  
<script lang="js">
import axios from 'axios';

export default {
    data() {
        return {
            haber_id: null,
            url: [],
            fileInput: null,
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
        saveImages() {
    // FormData oluşturma
    let formData = new FormData();
    for (let i = 0; i < this.fileInput.files.length; i++) {
        formData.append('url[]', this.fileInput.files[i]);
    }
    formData.append('news_id', this.news.id);

    // Axios ile POST isteği yapma
    axios.post('/api/gallery', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}

    },
    created() {
        //   this.newsId = this.$route.params.id;
        //   axios.get(`/api/news/${this.newsId}/gallery`)
        //     .then((response) => {
        //       this.images = response.data;
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });


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
}
</script>
  