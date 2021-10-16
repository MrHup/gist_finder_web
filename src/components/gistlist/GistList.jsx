import React, { useState } from "react";

export default function GistList({ gistListObjects }) {
    const [forkedObj, setForkedObj] = useState({});

    // receives a gist object
    // returns an array of files contained in the given gist
    const gistFiles = (object) => {
        const arrayOfFiles = Object.values(object.files);
        return arrayOfFiles;
    };

    // receives a gist object
    // returns a set of tags that indicate used languages
    const computeTags = (object) => {
        // get all files contained in the given gist
        const files = gistFiles(object);

        // create a set to store unique technologies
        const languages = new Set();
        for (let i = 0; i < files.length; i++)
        {
            languages.add(files[i].language);
        }

        // console.log(`Languages for gist with id ${object.id} are ${Object.values(languages)}`);
        return languages;

    };

    // TO-DO: move this in a specialized location
    const api = {base: "https://api.github.com/"}
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

    return (
      <div>
        {(typeof gistListObjects != "undefined" && gistListObjects.length > 0) ? (
        <div>
          <div className="output-box">
            <div className="author-box">{gistListObjects[0].owner.login}</div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Gist name</th>
                        <th>File names</th>
                        <th>Forks</th>
                    </tr>
                </thead>
                <tbody>
                    {gistListObjects && gistListObjects.map(output =>
                        <tr key={output.id}>
                            <td>{output.description}</td>
                            <td> {computeTags(output)} </td>
                            <td>{output.description}</td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
        </div>
        ) : ('')}
      </div>
    );
  }