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
          for (let i = 0; i < result.length; i++)
          {
            fetch(`${result[i].forks_url}`)
              .then(resFork => resFork.json())
              .then(resultFork => {
                console.log(resultFork);
                result[i].forks_objects = resultFork;
                setOutput(result);
              });
          }
          setOutput(result);
         });
    }
  }

  return (
    <div>
      <main>
        <Header className="page-header"/>
        <div className="page-main">
          <input className="textbox-main"
            type="text"
            placeholder="Search..."
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <div className="gist-list">
            <GistList gistListObjects={output}/>
          </div>
        </div>
        <div className="page-footer">
    
        </div>
      </main>
    </div>
  );
}

export default App;
