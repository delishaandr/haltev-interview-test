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
      <div class="container-fluid p-4">
        <h1 class="display-3 mt-4 mb-4">News</h1>
        <div class="input-group">
          <input class="form-control form-control-lg" type="text" placeholder="Search" id="search" />
          <button type="button" class="btn bg-transparent" style={{marginLeft : '-40px', zIndex : '100'}}>
            <i class="fa fa-times"></i>
          </button>
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div class="card-list mt-4">
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
