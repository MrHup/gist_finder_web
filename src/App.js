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
