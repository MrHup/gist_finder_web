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

  const search = evt => {
    if (evt.key === "Enter")
    {
      fetch(`${api.base}users/${query}/gists`)
        .then(res => res.json())
        .then(result => {
          setOutput(result);
          setQuery('');
          console.log(result);
          var forkList = [];
          for (let i = 0; i < result.length; i++)
          {
            fetch(`${result[i].forks_url}`)
              .then(resFork => resFork.json())
              .then(resultFork => {
                console.log(resultFork);
                forkList.push(resultFork);
                setForkedObj(forkList);

                result[i].forks_objects = resultFork;
                setOutput(result);
              });
          }
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

        <GistList gistListObjects={output} forkedObjects={forkedObj} />

      </main>
    </div>
  );
}

export default App;
