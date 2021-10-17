import React, { useState } from "react";

import "./gistList.css";
import Popup from "../popupbox/PopupBox";
import { BallBeat } from 'react-pure-loaders';

export default function GistList({ gistListObjects }) {
    // to control popup system
    const [isOpen, setIsOpen] = useState(false);

    const [popupTextBlockList, setPopupTextBlockList] = useState({});
    const [loading, setLoading] = useState(false);

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

    // builds the file content popup
    const getAllSnippetsForObject = (object) => {
        var textChunks = [];
        setPopupTextBlockList([]);
        // get all files contained in the given gist
        setLoading(true);
        const files = gistFiles(object);
        for (let i = 0; i < files.length; i++)
        {
            
            fetch(`${files[i].raw_url}`)
                .then(res => res.text())
                .then(response => {
                    const info = {
                        maincode: response,
                        title: files[i].filename
                    }
                    textChunks.push(info);
                    // console.log(textChunks);
                    if (i === files.length-1)
                    {
                        setPopupTextBlockList([]);
                        setPopupTextBlockList(textChunks);
                        console.log(`Of size: ${textChunks.length}`);
                        setLoading(false);
                        // forceUpdate();
                    }
                });
        }
    };

    const togglePopup = (object) => {
        if (typeof object != "undefined") {
            getAllSnippetsForObject(object);
        }
        setIsOpen(!isOpen);
    }

    return (
      <div>
        {(typeof gistListObjects != "undefined" && gistListObjects.length > 0) ? (
        <div>
          <div className="output-box">
            {/* <div className="author-box">{gistListObjects[0].owner.login}</div> */}
            
            {isOpen && 
                <Popup
                content={<div>
                    {loading && <div className="loading-bar">
                    <BallBeat
                    color={'#ff9955'}
                    loading={loading}/> 
                    </div>}
                    
                    {!loading && <code className="code-snippet">{
                        popupTextBlockList.map(textBlock => <div><b>{textBlock.title}</b>
                            <p/><div className="block-of-text">{textBlock.maincode}</div></div>)
                    }</code>}
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