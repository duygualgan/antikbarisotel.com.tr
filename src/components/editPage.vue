<template>
    <div class="add-news">
        <h2>Haber güncelle</h2>

        <form @submit.prevent="updateNews">
            <label for="title">Haber Başlığı</label>
            <input type="text" id="title" v-model="news.title" required>

            <label for="date">Haber Tarihi</label>
            <input type="date" id="date" v-model="news.news_date" name="news_date" required>

            <label for="text">Haber Metini</label>
            <textarea id="text" v-model="news.summary" required></textarea>

            <label for="images">Haber Resmi</label>
            <img id="oldImage" class="detailsimg" :src="news.old_images" :alt="news.title">
            <input type="file" id="images" name="images" @change="onImageChange">


            <button type="submit">güncelle</button>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            newsId: '',
            news: {
                title: '',
                news_date: '',
                summary: '',
                images: ''
            },
        };
    },
    methods: {
        getNews() {
            const id = this.$route.params.id;

            axios.get(`http://localhost:3000/news/${id}`)
                .then(response => {
                    console.log(response.data)
                    this.news.title = response.data.title
                    this.news.summary = response.data.summary
                    this.news.news_date = new Date(response.data.news_date).toISOString().substr(0, 10);
                    this.news.old_images = response.data.images.map(images => `data:image/png;base64, ${images}`).join(',');
                    this.news.old_imagePath = response.data.imagePath
                    console.log(this.news)
                })
                .catch(error => console.error(error));
        },
        updateNews() {
            const formData = new FormData();
            formData.append('title', this.news.title);
            formData.append('news_date', this.news.news_date);
            formData.append('text', this.news.summary);
            formData.append('images', this.news.images);
            formData.append('old_imagePath', this.news.old_imagePath);
            console.log(formData)
            axios.put(`http://localhost:3000/update-news/${this.newsId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data);
                    this.$router.push('/haberler');
                })
                .catch(error => console.error(error));
        },

        onImageChange(event) {
            const file = event.target.files[0];
            this.news.images = file;
            console.log(this.news.images)
        },



    },
    created() {
        this.newsId = this.$route.params.id;
        this.getNews();
    },
};
</script>

