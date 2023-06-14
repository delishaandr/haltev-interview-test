const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

app.get('/', (req, res) => { 
 res.send("<h1>Home page</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});