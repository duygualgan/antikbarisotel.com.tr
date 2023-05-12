<template>
  <div class="login">
    <div class="add-news ">
      <h2>Admin Paneline Erişim İçin Giriş Yapınız</h2>

      <img src="../assets/user.png" style="max-width: 100px; max-height: 100px; margin: auto;">

      <form @submit.prevent="login">
        <label for="title">Kullanıcı</label>
        <input type="text" id="kullanici" v-model="users.kullanici" required>

        <label for="title">Şifre</label>
        <input type="text" id="kullanici" v-model="users.sifre" required>

        <button type="submit" style="margin: auto;">Giriş Yap</button>
      </form>
      <dialog-confirm
        v-model="showError"
        title="Hata"
        message="Girdiğiniz bilgiler hatalı. Lütfen yeniden deneyin."
        @cancel="showError = false"
        @confirm="showError = false"
        :confirm-button-text="'Tamam'"
      />
    </div>
  </div>
</template>  
  
<script>
import { DialogConfirm } from 'vue-dialog';
import axios from 'axios';

export default {
  components: {
    DialogConfirm
  },
  data() {
    return {
      users: {
        id: '',
        kullanici: '',
        sifre: ''
      },
      showError: false 
    }
  },
  methods: {
    async login() {

      axios.post('http://localhost:3000/api/login', this.users)
        .then(response => {
          this.$router.push('/admin');
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
          this.showError = true;
        });
    }
  }

}
</script>
<style>
.dialog-confirm-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>