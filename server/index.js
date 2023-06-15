const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});