import React, { useState } from 'react';
import Header from "./components/header/Header";
import GistList from "./components/gistlist/GistList";

import './App.css';

const api = {
  base: "https://api.github.com/"
}

function App() {
  const [query, setQuery] = useState('');
  const [output, setOutput] = useState({});
  const [forkedObj, setForkedObj] = useState({});

  // receives a gist object
  // returns a list of fork objects
  const forkObjects = (object) => {
    fetch(`${object.forks_url}`)
        .then(res => res.json())
        .then(result => {
            setForkedObj(result);
            console.log(result);
        });
  };

  const search = evt => {
    if (evt.key === "Enter")
    {
      fetch(`${api.base}users/${query}/gists`)
        .then(res => res.json())
        .then(result => {
          setOutput(result);
          setQuery('');
          console.log(result);
         });
      
        
    }
  }

  return (
    <div className="App">
      <main>
        <Header/>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        <GistList gistListObjects={output} />

      </main>
    </div>
  );
}

export default App;
