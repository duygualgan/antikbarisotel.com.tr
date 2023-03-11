<template>
    <div>
      <h2>{{ news.title }}</h2>
      <p>{{ news.news_date }}</p>
      <p>{{ news.text }}</p>
    </div>
  </template>
  
  <script>
  const apiUrl = "http://localhost:3000/status";
  export default {
    data() {
      return {
        news: {} // haber verisi, API'dan alınacak
      };
    },
    mounted() {
      const id = 7;
      fetch(`${apiUrl}/${id}`)
      .then(response => response.json())
      .then(data => {
    // veri manipülasyonu yapılabilir
    console.log(data);
  })
  .catch(error => console.error(error));

    }
  };
  </script>