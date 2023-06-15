const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// fetch data from API
const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));

async function getApiData() {
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=24173b501c0f4b20aa1f94625417dce0');
  const resData = response.json();
  return resData
} 

// set up database
const db = require("../app/models");
db.sequelize.sync();

app.get('/', (req, res) => { 
 res.send("<h1>Home page</h1>");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post('/api/sort', (req, res) => {
  let data = req.body;
  data.sort((a, b) => {
    if (a.title > b.title) {
      return -1
    } else {
      return 1
    }
  })

  res.send(data);
})

app.get('/api/load-data', (req, res) => {
  let apiData

  getApiData().then((data) => {
    apiData = data.articles;
    db.articles.destroy({
      where: {},
      truncate: true
    })
    for (let i = 0; i < apiData.length; i++) {
      db.articles.create({
        sourceid: apiData[i].source.id,
        sourcename: apiData[i].source.name,
        author: apiData[i].author,
        title: apiData[i].title,
        description: apiData[i].description,
        url: apiData[i].url,
        urlToImage: apiData[i].urlToImage,
        publishedAt: apiData[i].publishedAt,
        content: apiData[i].content
      });      
    }
  })
  res.json({message: 'data has been loaded'});
})

app.get('/api/read-data', (req, res) => {
  let articleList = []

  db.articles.findAll().then((u) => {
    articleList = u
    res.send(articleList)
  });
})

app.post('/api/insert-data', (req, res) => {
  let data = req.body;
  db.articles.create({
    sourceid: data.sourceid,
    sourcename: data.sourcename,
    author: data.author,
    title: data.title,
    description: data.description,
    url: data.url,
    urlToImage: data.urlToImage,
    publishedAt: data.publishedAt,
    content: data.content
  });
  res.send('Data has been inserted')
  
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});