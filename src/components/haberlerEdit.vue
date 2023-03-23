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
            <button @click="editHaber(news)">edit</button>
            <button @click="silHaber(news)">Sil</button>
          </div>
        </div>
      </li>
    </ul>
    <confirm-dialog :visible="dialogVisible" @confirmed="silOnaylandi" @cancelled="silIptalEdildi">
      Silmek istediğinize emin misiniz?
    </confirm-dialog>
  </div>
</template>

  
<script lang="js">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';



export default {
  setup() {
    const router = useRouter();
    const haberler = ref([]);

    const editHaber = (news) => {
      router.push(`/haberler/${news.id}/edit`);
    };


    const silHaber = async (news) => {
      if (confirm('Silmek istediğinize emin misiniz?')) {
        try {
          const response = await axios.delete(`http://localhost:3000/silHaber/${news.id}`);
          console.log(response.data);
          // Silinen haberleri haberler listesinden kaldırma
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
    return { haberler, silHaber, editHaber};
  },
 
};
</script>

<!-- methods: {
  // eslint-disable-next-line no-unused-vars
  editHaber(news) {
    // Haber düzenleme işlemleri
  },
  silHaber(haber) {
    this.haberToSil = haber;
    this.dialogVisible = true;
  },
  silOnaylandi() {
    const index = this.haberler.indexOf(this.haberToSil);
    this.haberler.splice(index, 1);
    this.dialogVisible = false;
  },
  silIptalEdildi() {
    this.dialogVisible = false;
  },
} -->