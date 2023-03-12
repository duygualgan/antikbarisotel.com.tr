const express = require("express");
const mysql = require("mysql");
const util = require("util");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const port = 3000;

var router = express.Router();

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const db = require("./database");

const upload = multer();

const connection = mysql.createConnection({
  host: "localhost", // Veritabanı sunucusunun adresi
  user: "root", // Veritabanı kullanıcısı
  password: "duygu123", // Veritabanı kullanıcısının şifresi
  database: "antikbaris", // Kullanılacak veritabanı adı
});

connection.connect(function (err) {
  if (err) {
    console.error("Veritabanına bağlanırken hata oluştu: " + err.stack);
    return;
  }
  console.log(
    "Veritabanına bağlandı. Bağlantı kimliği: " + connection.threadId
  );
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/status", (req, res) => {
  connection.query("SELECT * FROM news", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


//images direkt database e kaydedildiği version
// app.post("/api/news", upload.single("images"), async (req, res) => {
//   const { title, news_date, text } = req.body;
//   const images = req.file.buffer;

//   try {
//     const query = util.promisify(connection.query).bind(connection);
//     const result = await query(
//       "INSERT INTO news (title, images, news_date, text) VALUES (?, ?, ?, ?)",
//       [title, images, news_date, text]
//     );
//     console.log("Haber başarıyla eklendi!");
//     console.log(result);
//     res.status(201).send({ message: "Haber başarıyla eklendi!" });
//   } catch (err) {
//     console.log("Haber eklenirken bir hata oluştu:", err);
//     res.status(500).send({ err: "Haber eklenirken bir hata oluştu" });
//   }
// });


// klasöre kaydedildiği version
app.post('/api/news', upload.single('images'), async (req, res) => {
  const { title, news_date, text } = req.body;
  const buffer = req.file.buffer;
  const originalName = req.file.originalname;
  const extension = originalName.split('.').pop(); 
  const imageName = uuidv4() + '.' + extension; 

  try {
    const query = util.promisify(connection.query).bind(connection);


    fs.writeFile(`./images/${imageName}`, buffer, async (err) => {
      if (err) {
        console.error(err);
        throw new Error('Error while saving the image.');
      }

      const imageUrl = `images/${imageName}`;


      const result = await query(
        'INSERT INTO news (title, images, news_date, text) VALUES (?, ?, ?, ?)',
        [title, imageUrl, news_date, text]
      );

      console.log('Haber başarıyla eklendi!');
      console.log(result);
      res.status(201).send({ message: 'Haber başarıyla eklendi!' });
    });
  } catch (err) {
    console.log('Haber eklenirken bir hata oluştu:', err);
    res.status(500).send({ err: 'Haber eklenirken bir hata oluştu' });
  }
});


app.get("/news/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const newsPage = require("./database", { root: __dirname });
  const found = newsPage.find((news) => news.id === id);
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
