import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';

function App() {
  const [ data, setData ] = useState(null);

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=24173b501c0f4b20aa1f94625417dce0')
      .then((response) => response.json())
      .then((actualData) => setData(actualData));
  }, []);

  return (
    <div className="App">
      <div></div>
      <div class="container-fluid">
        <h1 class="display-3 p-2 mt-4 mb-4">News</h1>
        <div class="card-list p-2">
        {data &&
          data.articles.map(({ id, url, author, title }) => (
            <a href={url} class="card mb-3" target="_blank" key={id}>
              <div class="card-body">
                <p class="card-text text-dark">{author}</p>
                <h5 class="card-title text-dark">{title}</h5>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
