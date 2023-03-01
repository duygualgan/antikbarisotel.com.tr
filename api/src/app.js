const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')


//const { getTodos, addTodo, deleteTodo, updateTodo } = require('./sql/queries');

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

// const express = require('express');
const mysql = require('mysql2');
//const { create } = require('core-js/core/object');


const connection = mysql.createConnection({
  host     : 'localhost', // Veritabanı sunucusunun adresi
  user     : 'root',      // Veritabanı kullanıcısı
  password : 'duygu123',  // Veritabanı kullanıcısının şifresi
  database : 'duygu'      // Kullanılacak veritabanı adı
});

connection.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
    return;
  }

  console.log('Veritabanına bağlandı. Bağlantı kimliği: ' + connection.threadId);
});

// Express.js uygulama kodları buraya gelecek

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});

