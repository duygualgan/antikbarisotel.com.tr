const express = require('express'); 
const mysql = require('mysql');  
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

var router = express.Router();

const connection = mysql.createConnection({
    host     : 'localhost', // Veritabanı sunucusunun adresi
    user     : 'root',      // Veritabanı kullanıcısı
    password : 'duygu123',  // Veritabanı kullanıcısının şifresi
    database : 'antikbaris'      // Kullanılacak veritabanı adı
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
  });
  
  module.exports = connection;

   //   var data = `
  //   INSERT INTO news (title, images, news_date, text) 
  //   VALUES 
  //   ("foto deneme ", "https://staticpages.mngbcn.com/homes/images/ss23/she/enero/she_landing_exonline_2301.jpg?imwidth=340&imdensity=1&impolicy=set_13", "2023-03-09", "deneme foto deneme foto.")
  //   `;
  //   connection.query(data, function(err){
  //   if (err) {
  //     console.error('Veritabanına data eklerken hata: ' + err.stack);
  //     return;
  //   } else console.log("datalar eklendi")
  // })