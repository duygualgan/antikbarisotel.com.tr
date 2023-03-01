const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) =>{
    res.send({
        message: 'hello world'
    })
})

// app.listen(process.env.PORT || 8081)

const mysql = require('mysql2');


const connection = mysql.createConnection({
  host     : 'localhost', // Veritabanı sunucusunun adresi
  user     : 'root',      // Veritabanı kullanıcısı
  password : 'duygu123',  // Veritabanı kullanıcısının şifresi
  database : 'news'      // Kullanılacak veritabanı adı
});

connection.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
    return;
  }
  console.log('Veritabanına bağlandı. Bağlantı kimliği: ' + connection.threadId);
  //******** CREATE EDİLDİ */
  // var database = "CREATE DATABASE news";
  // connection.query(database,function (err){
  //   if (err) {
  //     console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
  //     return;
  //   }else console.error("Database oluştu")
  // })
//******TABLE OLUŞTURULDU */
  // var table = `CREATE TABLE news_table(
  //   id INT AUTO_INCREMENT PRIMARY KEY,  
  //   title nvarchar(100), 
  //   images BLOB, 
  //   news_date date, 
  //   text nvarchar(300))`;
  // connection.query(table, function(err){
  //   if (err) {
  //     console.error('Veritabanına tablo eklerken hata: ' + err.stack);
  //     return;
  //   } else console.log("tablo oluştu")
  // })
//**********SAHTE VERİ EKLENDİ */
  
  
});

// Express.js uygulama kodları buraya gelecek

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

