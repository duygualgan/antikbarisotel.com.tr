// queries.js dosyası

// const getTodos = 'SELECT * FROM todos';
// const addTodo = 'INSERT INTO todos (title, completed) VALUES (?, ?)';
// const deleteTodo = 'DELETE FROM todos WHERE id = ?';
// const updateTodo = 'UPDATE todos SET title = ?, completed = ? WHERE id = ?';

// module.exports = { getTodos, addTodo, deleteTodo, updateTodo };

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql2');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())



const connection = mysql.createConnection({
  host     : 'localhost', // Veritabanı sunucusunun adresi
  user     : 'root',      // Veritabanı kullanıcısı
  password : 'duygu123',  // Veritabanı kullanıcısının şifresi
  database : 'antikbaris'      // Kullanılacak veritabanı adı
});

// db.js dosyası
const addNews = (antikbaris) => {
    const query = 'INSERT INTO news SET ?';
    connection.query(query, antikbaris, (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} haber eklendi`);
    });
  }
  
  module.exports = { connection, addNews };
  