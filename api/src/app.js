const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('../sql/db.js')
const mysql = require('mysql2');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


app.use(express.json());

// haber ekleme isteklerini dinle
app.post('/addNews', (req, res) => {
  const news = req.body;
  db.addNews(news);
  res.send('Haber eklendi');
});

// sunucu dinlemeye başla
const port = process.env.PORT || 8082 ;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});





// app.listen(process.env.PORT || 8081)




const connection = mysql.createConnection({
  host     : 'localhost', // Veritabanı sunucusunun adresi
  user     : 'root',      // Veritabanı kullanıcısı
  password : 'duygu123',  // Veritabanı kullanıcısının şifresi
  database : 'antikbaris'      // Kullanılacak veritabanı adı
});

connection.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
    return;
  }
  console.log('Veritabanına bağlandı. Bağlantı kimliği: ' + connection.threadId);
  //******** CREATE EDİLDİ */
  // var database = "CREATE DATABASE antikbaris";
  // connection.query(database,function (err){
  //   if (err) {
  //     console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
  //     return;
  //   }else console.error("Database oluştu")
  // })
//******TABLE OLUŞTURULDU */
//   var table = `CREATE TABLE news(
//     id INT AUTO_INCREMENT PRIMARY KEY,  
//     title nvarchar(100), 
//     images BLOB, 
//     news_date date, 
//     text nvarchar(300))`;
//   connection.query(table, function(err){
//     if (err) {
//       console.error('Veritabanına tablo eklerken hata: ' + err.stack);
//       return;
//     } else console.log("tablo oluştu")
//   })
// //**********SAHTE VERİ EKLENDİ */
// var data = `
// INSERT INTO news (title, images, news_date, text) 
// VALUES 
// ("Hava Durumu", "news1.jpg", "2022-12-01", "Yarın yağmur bekleniyor."),
// ("Spor Haberleri", "news1.jpg", "2022-12-02", "Fenerbahçe 3-0 kazandı."),
// ("Teknoloji Haberleri", "news1.jpg", "2022-12-03", "Apple yeni bir iPhone modeli duyurdu."),
// ("Magazin Haberleri", "news1.jpg", "2022-12-04", "Ünlü oyuncu evlendi.");
// `;
//   connection.query(data, function(err){
//     if (err) {
//       console.error('Veritabanına data eklerken hata: ' + err.stack);
//       return;
//     } else console.log("datalar eklendi")
//   })
});

// Express.js uygulama kodları buraya gelecek

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});




app.get('/status', (req, res) =>{
  connection.query('SELECT * FROM news', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
})



//*************denemeler */
// connection.query('SELECT * FROM news', (err, results) => {
//   if (err) throw err;
//   console.log(results);
// });

// connection.query('SELECT * FROM news', (err, results) => {
//   if (err) throw err;
//   results.forEach((row) => {
//     console.log(row.id, row.title, row.images, row.news_date, row.text);
//   });
// });

connection.query('SELECT * FROM news', (err, results) => {
  if (err) throw err;
  console.table(results);
});