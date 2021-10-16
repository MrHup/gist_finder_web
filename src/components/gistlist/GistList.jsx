import React from "react";

export default function GistList({ gistListObjects, forkedObjects }) {

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

    const getLatestForkAuthors = (object) => {
        var authors = [];
        for (let i = 0; i < 3 && i < object.forks_objects.length; i++)
        {
            authors.push(object.forks_objects[i].owner.login);
        }
        return authors;
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
                            <td>{getLatestForkAuthors(output)}</td>
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