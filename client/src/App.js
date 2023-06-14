import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';

function App() {
  const [ data, setData ] = useState(null);
  const [ query, setQuery] = useState("");
  const [ filter, setFilter] = useState(null)

  const getApiData = async () => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=24173b501c0f4b20aa1f94625417dce0')
      .then((response) => response.json());

      setData(response.articles);
      setFilter(response.articles);
  }

  useEffect(() => {
    getApiData();
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();

    var newData = [...data]
    newData = newData.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase())
    })
    setFilter(newData);
}

  const handleClear = (e) => {
    setQuery('');
    setFilter(data);
  }

  return (
    <div className="App">
      <div></div>
      <div className="container-fluid p-4">
        <h1 className="display-3 mt-4 mb-4">News</h1>
        <form onSubmit={handleSearch}>
          <div className="input-group">
            <input className="form-control form-control-lg" type="text" placeholder="Search" value={query} onChange={handleQuery} id="search" />
            <button type="button" className="btn bg-transparent" style={{marginLeft : '-40px', zIndex : '100'}} onClick={handleClear}>
              <i className="fa fa-times"></i>
            </button>
            <div className="input-group-append">
              <button className="btn btn-secondary" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <div className="card-list mt-4">
        {filter &&
          filter.map(({ url, author, title }) => (
            <a href={url} className="card mb-3" target="_blank" key={url}>
              <div className="card-body">
                <p className="card-text text-dark">{author}</p>
                <h5 className="card-title text-dark">{title}</h5>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App;
