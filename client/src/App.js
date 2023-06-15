import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

function App() {
  // data
  const [ actData, setActData ] = useState(null);

  // sort
  const [ isSortActive, setIsSortActive ] = useState(false);
  const [ toggleSort, setToggleSort ] = useState(false)
  const [ sorted, setSorted ] = useState("");

  // author filter
  const [ isFilterActive, setIsFilterActive ] = useState(false);
  const [ authors, setAuthors ] = useState([]);
  const [ authorFilter, setAuthorFilter ] = useState("");

  // query
  const [ isActive, setIsActive ] = useState(false);
  const [ query, setQuery] = useState("");
  const [ filter, setFilter ] = useState(null);

  const getApiData = async () => {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=24173b501c0f4b20aa1f94625417dce0')
      .then((response) => response.json());

      setActData(response.articles);
      setFilter(response.articles);

      let listAuthors = []
      for (let i = 0; i < response.articles.length; i++) {
        if (listAuthors.indexOf(response.articles[i].author) == -1) {
          listAuthors.push(response.articles[i].author)
        }
      }
      listAuthors = listAuthors.sort();

      setAuthors(listAuthors);
  }

  useEffect(() => {
    getApiData();
  }, []);

  // query
  const handleQuery = (e) => {
    setQuery(e.target.value);
    if (e.target.value == '') {
      setIsActive(false)
    }
    else {
      setIsActive(true)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();

    var newData = [...actData]
    if (isSortActive) {
      newData = [...sorted]
    }
    if (isFilterActive) {
      newData = [...authorFilter]
    }

    newData = newData.filter(item => {
        return item.title.toLowerCase().includes(query.toLowerCase())
    })
    setFilter(newData);
}

  const handleClear = (e) => {
    setQuery('');
    setFilter(actData);
    setIsActive(false);
  }

  // filters
  const handleAuthorFilter = (e) => {
    const curFilter = e.target.text;
    setIsFilterActive(true);
    
    var newData = [...actData]
    if (isActive) {
      newData = [...filter]
    }
    if (isSortActive) {
      newData = [...sorted]
    }
    newData = newData.filter(item => {
      return item.author.toLowerCase() === curFilter.toLowerCase()
    })
    setAuthorFilter(newData);
    setFilter(newData);
  }

  const handleSort = (e) => {
    setIsSortActive(true);
    setToggleSort(!toggleSort); // true: asc, false: desc

    var newData = [...actData]
    if (isActive) {
      newData = [...filter]
    }
    if (isFilterActive) {
      newData = [...authorFilter]
    }

    // sorting
    // ascending
    if (!toggleSort) {
      newData = newData.sort((a,b) => a.title > b.title ? 1 : -1)
      setSorted(newData);
      setFilter(newData);
    }
    // descending
    else if (toggleSort) {
      axios
        .post('/api/sort', newData)
        .then((response) => response.data)
        .then((data) => setFilter(data))
      setSorted(filter)
    }
  }

  const handleClearFilter = (e) => {
    setIsFilterActive(false);
    setIsSortActive(false);
    setFilter([...actData]);
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
              <i className="fa fa-times" style={{opacity : isActive ? '0.25' : '0'}}></i>
            </button>
            <div className="input-group-append">
              <button className="btn btn-secondary" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
        <div className="d-flex flex-row mt-4">
          <div className="p-3 mt-1"><h5><strong>Filters</strong></h5></div>
          <div className="p-3">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Author
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {authors.map((item, index) => (
                    <Dropdown.Item href="#" key={index} onClick={handleAuthorFilter}>
                      {item}
                    </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="p-3">
            <ButtonGroup aria-label="Sort">
              <Button variant="secondary">Sort</Button>
              <Button variant="secondary" id="sort-label" onClick={handleSort}><i className={ !isSortActive ? "fa fa-sort" : toggleSort ? "fa fa-sort-up" : "fa fa-sort-down"}></i></Button>
            </ButtonGroup>
          </div>
          <div className="p-3">
            <button type="button" className="btn btn-secondary" style={{opacity : isFilterActive || isSortActive ? '1' : '0'}} onClick={handleClearFilter}>Clear Filters</button>
          </div>
        </div>
        
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
