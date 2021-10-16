import React from "react";

import "./gistList.css";

export default function GistList({ gistListObjects }) {

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
        let languagesArr = Array.from(languages);
        return languagesArr;
    };

    // receives a gist object
    // returns the latest 3 users that forked the given gist
    const getLatestForkAuthors = (object) => {
        var authors = [];
        for (let i = 0; i < 3 && 
            typeof object.forks_objects != "undefined" && i < object.forks_objects.length; i++)
        {
            authors.push(object.forks_objects[i].owner);
        }
        return authors;
    };

    function sayHello(object) {
        alert(object.description);
      }

    return (
      <div>
        {(typeof gistListObjects != "undefined" && gistListObjects.length > 0) ? (
        <div>
          <div className="output-box">
            {/* <div className="author-box">{gistListObjects[0].owner.login}</div> */}

            <ul className="container-list">
            {gistListObjects && gistListObjects.map(output =>
                    <div className="container-gist" onClick={() => sayHello(output)}>
                            <li>{output.description}</li>
                            <li> 
                                <ul className="language-tag-list">
                                {
                                    computeTags(output).map((tag) => 
                                        <li className="language-tag">{tag}</li>
                                )} 
                                </ul>
                            </li>
                            <li className="forked-bubbles-list-li">
                                <ul className="forked-bubbles-list">
                                    {/* <li> Forked by: </li> */}
                                    {
                                        getLatestForkAuthors(output).map((author) =>
                                            <li className="forked-bubble">
                                                <a href={author.html_url}><img src={author.avatar_url} className="rounded-image" alt={author.html_url}/> </a>
                                            </li>
                                    )}
                                </ul>
                            </li>
                            {/* <li>{getLatestForkAuthors(output)}</li> */}
                    </div>
                        
                    )}
            </ul>
          </div>
        </div>
        ) : ('')}
      </div>
    );
  }