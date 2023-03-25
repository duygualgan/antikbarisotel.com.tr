<template>
  <div class="haberedit">
    <ul>
      <li v-for="news in haberler" :key="news.id">
        <div class="news-container">
          <div class="news-text">
            <h2>{{ news.title }}</h2>
            <p>{{ news.text }}</p>
          </div>
          <div class="news-buttons">
            <router-link :to="{ name: 'edit', params: { id: news.id } }"> Edit </router-link>
            <button @click="silHaber(news)">Sil</button>
          </div>
        </div>
      </li>
    </ul>
    <confirm-dialog :visible="dialogVisible" @confirmed="silOnaylandi" @cancelled="silIptalEdildi">
     
    </confirm-dialog>
  </div>
</template>

  
<script lang="js">
import { onMounted, ref } from 'vue';
import axios from 'axios';



export default {
  setup() {
    const haberler = ref([]);

    const silHaber = async (news) => {
      if (confirm('Silmek istediğinize emin misiniz?')) {
        try {
          const response = await axios.delete(`http://localhost:3000/silHaber/${news.id}`);
          console.log(response.data);
          haberler.value = haberler.value.filter(haber => haber.id !== news.id);
        } catch (error) {
          console.error(error);
        }
      }
    };

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3000/status");
        const news = response.data.map(item => {
          return {
            id: item.id,
            text: item.text,
            title: item.title
          };
        });
        console.log(news);
        haberler.value = news;
        console.log(response.data);
      }
      catch (error) {
        console.error(error);
      }
    });
    return { haberler, silHaber };
  },
 
};
</script>
