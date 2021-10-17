import React, { useState } from 'react';
import Header from "./components/header/Header";
import GistList from "./components/gistlist/GistList";
import { BallBeat } from 'react-pure-loaders';

import './App.css';

const api = {
  base: "https://api.github.com/"
}

function App() {
  const [query, setQuery] = useState('');
  const [output, setOutput] = useState({});
  const [loading, setLoading] = useState(false);

  const search_func = () => {
    setOutput({});
      setLoading(true);
      if (query === "")
      {
        setOutput({});
        setLoading(false);
      }
      fetch(`${api.base}users/${query}/gists`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          console.log(result);
          for (let i = 0; i < result.length; i++)
          {
            fetch(`${result[i].forks_url}`)
              .then(resFork => resFork.json())
              .then(resultFork => {
                console.log(resultFork);
                result[i].forks_objects = resultFork;
                if (i === result.length-1) {
                  setOutput(result);
                  setLoading(false);
                }
              });
          }
      });
  }

  const search = evt => {
    if (evt.key === "Enter") search_func();
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
           <button onClick={search_func} className="button">Find</button> 
          <div className="gist-list">
            {loading && <div className="loading-bar">
                <BallBeat
                  color={'#ff9955'}
                  loading={loading}/> 
              </div>}
            <GistList gistListObjects={output}/>
          </div>
        </div>
        <div className="page-footer">
          2021 @ Flavius Holerga
        </div>
      </main>
    </div>
  );
}

export default App;
