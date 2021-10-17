import React, { useState, useReducer } from "react";

import "./gistList.css";
import Popup from "../popupbox/PopupBox";

export default function GistList({ gistListObjects }) {
    // in order to force render if needed
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    // to control popup system
    const [isOpen, setIsOpen] = useState(false);
    const [popupTextMain, setPopupTextMain] = useState("");
    const [popupTextTitle, setPopupTextTitle] = useState("");

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

    const togglePopup = (object) => {
        if (typeof object != "undefined") {
            const files = gistFiles(object);
            fetch(`${files[0].raw_url}`)
                .then(res => res.text())
                .then(response => {
                    console.log(response);
                    setPopupTextMain(response);
                    forceUpdate();
                });

            setPopupTextTitle(files[0].filename)
        }
        // update with a list of text blocks
        
        setIsOpen(!isOpen);
    }

    return (
      <div>
        {(typeof gistListObjects != "undefined" && gistListObjects.length > 0) ? (
        <div>
          <div className="output-box">
            {/* <div className="author-box">{gistListObjects[0].owner.login}</div> */}
            {isOpen && <Popup
                content={<div>
                    <b>{popupTextTitle}</b>
                    <p/>
                    <code className="code-snippet">{popupTextMain}</code>
                </div>}
                handleClose={() => togglePopup()}
            />}
            <ul className="container-list">
            {gistListObjects && gistListObjects.map(output =>
                    <div>
                    <div className="container-gist" onClick={() => togglePopup(output)}>
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
                    {/* {(output && typeof output.expanded != "undefined") && <div>Works as expected</div>} */}
                    </div>
                    )}
            </ul>
          </div>
        </div>
        ) : ('')}
      </div>
    );
  }