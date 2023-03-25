<label for="images">Haber Resmi</label>
<template>
    <div class="add-news">
        <h2>Haber güncelle</h2>

        <form @submit.prevent="updateNews">
            <label for="title">Haber Başlığı</label>
            <input type="text" id="title" v-model="news.title" required>

            <label for="date">Haber Tarihi</label>
            <input type="date" id="date" v-model="news.news_date" required>

            <label for="text">Haber Metini</label>
            <textarea id="text" v-model="news.text" required></textarea>


            <img class="detailsimg" :src="news.images" :alt="news.title">


            <label for="images">Haber Resmi</label>
            <input type="file" id="images" @change="onImageChange">

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
                text: '',
                image: '',
            },
        };
    },
    methods: {
        getNews() {
            // Edit sayfası açıldığında ilgili haberin verilerini getirir.
            const id = this.$route.params.id;

            axios.get(`http://localhost:3000/news/${id}`)
                .then(response => {
                    this.news = response.data;
                    this.news.images = response.data.images.map(image => `data:image/png;base64, ${image}`).join(',');
                    console.log(this.news)
                })
                .catch(error => console.error(error));
        },
        updateNews() {
            // Haber verilerini günceller.
            fetch(`/api/news/${this.newsId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.news),
            })
                .then(response => {
                    if (response.ok) {
                        // Güncelleme işlemi başarılı olduğunda haber listesi sayfasına yönlendirir.
                        this.$router.push('/haberler');
                    } else {
                        throw new Error('Something went wrong');
                    }
                })
                .catch(error => console.error(error));
        },
        onImageChange(event) {
            // Seçilen resmi base64 formatına dönüştürür.
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                this.news.image = reader.result;
            };
            reader.readAsDataURL(file);
        },
    },
    created() {
        // Edit sayfası açıldığında ilgili haberin id'sini alır.
        this.newsId = this.$route.params.id;
        // İlgili haberin verilerini getirir.
        this.getNews();
    },
};
</script>
  