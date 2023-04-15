<template>
    <div class="add-news">
        <h2>Haber güncelle</h2>

        <form @submit.prevent="updateNews">
            <label for="title">Haber Başlığı</label>
            <input type="text" id="title" v-model="news.title" required>

            <label for="date">Haber Tarihi</label>
            <input type="date" id="date" v-model="news.news_date" name="news_date" required>

            <label for="text">Haber Metini</label>
            <textarea id="text" v-model="news.text" required></textarea>

            <label for="images">Haber Resmi</label>
            <!-- <img id="oldImage" class="detailsimg" :src="news.images" :alt="news.title"> -->
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
                text: '',
                images: ''
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
                    this.news.news_date = new Date(response.data.news_date).toISOString().substr(0, 10);
                    this.news.images = response.data.images.map(images => `data:image/png;base64, ${images}`).join(',');
                    console.log(this.news)
                })
                .catch(error => console.error(error));
        },

        async updateNews() {

            const formData = new FormData()
            formData.append('title', this.news.title)
            formData.append('news_date', this.news.news_date)
            formData.append('text', this.news.text)
            formData.append('images', this.news.images);
            try {

                await axios.put(`http://localhost:3000/update-news/${this.newsId}`, FormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                alert('Haber update edildi.')
            } catch (error) {
                console.log(error)
                alert('Haber kaydedilemedi.')
            }
        },


        // updateNews() {
        //     // Haber verilerini günceller.
        //     await axios.put(`http://localhost:3000/update-news/${this.newsId}`, news{
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(this.news),
        //     })
        //         .then(response => {
        //             if (response.ok) {
        //                 // Güncelleme işlemi başarılı olduğunda haber listesi sayfasına yönlendirir.
        //                 this.$router.push('/haberler');
        //             } else {
        //                 throw new Error('Something went wrong');
        //             }
        //         })
        //         .catch(error => console.error(error));
        // },
        onImageChange(event) {
            const file = event.target.files[0];
            this.news.images = file;

            // const formData = new FormData();

            // // this.news nesnesinin tüm özelliklerini FormData nesnesine ekleyin
            // formData.append('title', this.news.title);
            // formData.append('news_date', this.news.news_date);
            // formData.append('text', this.news.text);
            // formData.append('images', file);

            // this.news nesnesinin images özelliğini de güncelleyin
            // this.news.images = URL.createObjectURL(file);

            // console.log(formData);


            // // FileReader 
            // const reader = new FileReader();
            // reader.onload = (event) => {
            //     console.log(event.target.result);
            // };
            // reader.readAsDataURL(file);
        }

    },
    created() {
        this.newsId = this.$route.params.id;
        this.getNews();
    },
};
</script>

