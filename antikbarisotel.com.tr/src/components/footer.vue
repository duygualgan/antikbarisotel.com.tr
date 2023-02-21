<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section class="footer-distributed">
            <div class="footer-left">
                <h3>Antik <span> Barış Otel </span></h3>
                <p class="footer-links">
                    <router-link to="/" class="nav-top-link" >Anasayfa</router-link>
                    <!-- <a href="#">Anasayfa</a> -->
                |
                <router-link to="/otel" class="nav-top-link" >Otel</router-link>
                <!-- <a href="#">Otel</a> -->
                |
                <router-link to="/odalarımız" class="nav-top-link" >Odalar</router-link>
                <!-- <a href="#">Odalar</a> -->
                |
                <router-link to="/hizmetlerimiz" class="nav-top-link" >Hizmetler</router-link>
                <!-- <a href="#">Hizmetler</a> -->
                |
                
                <!-- <a href="rezervasyon.html">Rezervasyon</a>-->
                | 
                <router-link to="/iletişim" class="nav-top-link" >İletişim</router-link>
                <!-- <a href="#">İletişim</a> -->
                </p>
                <p class="footer-company-about">
                    
                    <strong>Antik Barış Otel</strong>, Barış Şirketler Grubu üyesidir.
                </p>
                <!-- <p class="footer-company-name">Copyright 2023 ©  <strong>Duygu Algan</strong>
                    all right reserved</p> -->
            </div>
            <div class="footer-center">
                <div>
                    <i class="fa fa-map-marker"></i>
                    <p><span>Tepecik Mah. İstiklal Cad. Yavuz Sok. No:24</span>
                        İzmit - Kocaeli / Türkiye</p>
                </div>
                <div>
                    <i class="fa fa-phone"></i>
                    <p>+90 262 321 77 71</p>
                </div>
                <div>
                    <i class="fa fa-phone"></i>
                    <p>+90 533 727 72 77</p>
                </div>
                <div>
                    <i class="fa-solid fa-fax"></i>
                    <p>+90 262 321 77 92</p>
                </div>
                <div>
                    <i class="fa fa-envelope"></i>
                    <p><a href="#">info@antikbarisotel.com</a></p>
                </div>
            </div>
        </section>
</template>