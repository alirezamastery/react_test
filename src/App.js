import './App.css';
import React, {useEffect, useState} from 'react';
import {Toggle} from "./components/toggle";

function loadTweets(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET' // "POST"
    const url = "http://127.0.0.1:8000/api/products/"
    xhr.responseType = "json"
    xhr.open(method, url)
    xhr.onload = function () {
        callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
        console.log(e)
        callback({"message": "The request was an error"}, 400)
    }
    xhr.send()
}

function App() {
    const [tweets, setTweets] = useState([])

    useEffect(() => {
        const myCallback = (response, status) => {
            console.log(response, status)
            console.log(setTweets)
            if (status === 200) {
                setTweets(response)
            } else {
                alert("There was an error")
            }
        }
        loadTweets(myCallback)
    }, [])

    return (
        <div className="App">
            <p>
                {tweets.map((tweet, index) => {
                    return <li>{tweet.content}</li>
                })}
            </p>
            <Toggle />
        </div>
    );
}

export default App;
