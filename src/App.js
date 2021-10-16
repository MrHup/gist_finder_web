import React, { useState } from 'react';
import logo from './assets/title_logo.svg';

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
        <img src={logo} alt="logo" />

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

        {(typeof output != "undefined" && output.length > 0) ? (
        <div>
          <div className="output-box">
            <div className="author-box">{output[0].owner.login}</div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Gist name</th>
                        <th>File names</th>
                        <th>Forks</th>
                    </tr>
                </thead>
                <tbody>
                    {output && output.map(output =>
                        <tr key={output.id}>
                            <td>{output.description}</td>
                            <td> {(Array.from(output.files)).length} </td>
                            <td>{output.owner.login}</td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
        </div>
        ) : ('')}

      </main>
    </div>
  );
}

export default App;
