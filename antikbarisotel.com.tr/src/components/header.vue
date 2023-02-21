<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <section id="header">
    <div class="header container">
      <div class="nav-bar">
        <div class="brand">
          <a href="#">
            <img src="../assets/foto/logo.gif" alt="">
          </a>
        </div>
        <div class="nav-list">
          <div class="hamburger">
            <div class="bar"></div>
          </div>
          <ul>
            <li>
              <router-link to="/" class="nav-top-link" >Ana Sayfa</router-link>
                <!-- <a href="#" data-after="Anasayfa">Anasayfa</a> -->
            </li>
            <li>
              <router-link to="/otel" class="nav-top-link" >Otel</router-link>
                <!-- <a href="#" data-after="Otel">Otel</a> -->
            </li>
            <li>
              <router-link to="/odalarımız" class="nav-top-link" >Odalar</router-link>
                <!-- <a href="#" data-after="Odalar">Odalar</a> -->
            </li>
            <li>
              <router-link to="/hizmetlerimiz" class="nav-top-link" >Hİzmetler</router-link>
                <!-- <a href="#" data-after="Hizmetler">Hİzmetler</a> -->
            </li>
            <!-- <li>
                <a href="rezervasyon.html">Rezervasyon</a>
            </li> -->
            <li>
              <router-link to="/iletişim" class="nav-top-link" >İLETİŞİM</router-link>
                <!-- <a href="#" data-after="İletişim">İLETİŞİM</a> -->
            </li>
        </ul>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script >

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
