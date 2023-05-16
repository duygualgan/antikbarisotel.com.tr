<template>
  <div class="wrapper">
    <div class="sidebar">
      <div class="admin2">
        <h2>Admin Panel</h2>
        <p>{{ kullanıcı }}</p>
        <button @click="logout">Çıkış Yap</button>
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/haberler">
              <i class="fas fa-newspaper"></i>
              <span>Haberler</span>
            </router-link>
          </li>
          <li>
            <router-link to="/rezervasyonlar">
              <i class="fas fa-calendar-alt"></i>
              <span>Rezervasyonlar</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div class="content">
      <p class="pas">site paneli</p>
      <div class="containersa">        
        <div class="box" @click="goToNewsManagement">
          <router-link to="/haberler">
            <i class="fa fa-newspaper"></i>
            <h3>Haber Yönetimi</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </router-link>
        </div>
        <div class="box" @click="goToReservationManagement">
          <router-link to="/haberler">
            <i class="fa fa-calendar"></i>
            <h3>Rezervasyon Yönetimi</h3>
            <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: "App",
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    logout() {
      axios.post('http://localhost:3000/api/logout')
        .then(() => {
          // Oturum sonlandırıldıktan sonra yerel saklama alanını temizle
          localStorage.removeItem('authToken');
          // Vuex store'da isLoggedIn durumunu güncelle
          this.$store.commit('setLoggedIn', false);

          // Kullanıcının oturum bilgilerini sıfırla
          this.kullanıcı = null;

          // Giriş sayfasına yönlendir
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Oturum sonlandırma hatası:', error);
        });
    }


  }
};
</script>
