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

app.use(bodyParser.urlencoded({ extended: false }));

const db = require("./database");
const { query } = require("express");

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

app.get("/status", async (req, res)  => {
  try{
    const query = util.promisify(connection.query).bind(connection);

  let result = await query(
    "SELECT * FROM news ORDER BY id DESC "
    );
    console.log(result)
    result.forEach(item => {
      item.imageAsBase64 = fs.readFileSync(item.images, {encoding: 'base64'}); 
    })
    res.send(result)
  }catch(err){
    console.log("statusde hata oldu")
    console.log(err)
  }
  
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


// app.get('/news/:id', (req, res) => {
//   const id = req.params.id;
//   const query = ('SELECT * FROM news WHERE id = ?');
//   connection.query(query, [id], (err, results, fields) => {
//     if (err) {
//       console.error('MySQL error: ' + err.stack);
//       res.status(500).json({ error: 'An error occurred while retrieving news details' });
//       return;
//     }

//     if (results.length > 0) {
//       res.json(results[0]);
//     } else {
//       res.status(404).json({ error: 'News not found' });
//     }
//   });
// });



app.get('/news/:id', (req, res) => {
  const id = req.params.id;

  const query = ('SELECT * FROM news WHERE id = ?');
  connection.query(query, [id], (err, results, fields) => {
    if (err) {
      console.error('MySQL error: ' + err.stack);
      res.status(500).json({ error: 'An error occurred while retrieving news details' });
      return;
    }
    
    if (results.length > 0) {

      const images = results[0].images.split(',');
      const imagePromises = images.map(imagePath => {
        return new Promise((resolve, reject) => {
          fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      });
      
      Promise.all(imagePromises)
        .then(imageData => {
          results[0].images = imageData;
          res.json(results[0]);
        })
        .catch(err => {
          console.error('Error while reading images: ' + err);
          res.status(500).json({ error: 'An error occurred while retrieving news details' });
        });
      
    } else {
      res.status(404).json({ error: 'News not found' });
    }
  });
});

app.delete('/silHaber/:id', (req, res) => {
  const id = req.params.id;

  const query = ('DELETE FROM news WHERE id = ?');
  connection.query(query, [id], (err, results, fields) => {
    if (err) {
      console.error('MySQL error: ' + err.stack);
      res.status(500).json({ error: 'An error occurred while deleting the news' });
      return;
    }
    res.json({ message: 'Haber başarıyla silindi.' });
  });
});




app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
