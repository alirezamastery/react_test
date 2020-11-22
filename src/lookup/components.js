import {useEffect, useState} from "react";

function LookUp(method, endpoint, callback, data) {
    let jsonData;
    if (data) {
        jsonData = JSON.stringify(data)
    }
    const xhr = new XMLHttpRequest()
    const url = `http://127.0.0.1:8000/api${endpoint}`
    xhr.responseType = "json"
    xhr.open(method, url)
    xhr.onload = function () {
        callback(xhr.response, xhr.status)
    }
    xhr.onerror = function (e) {
        console.log(e)
        callback({"message": "The request was an error"}, 400)
    }
    xhr.send(jsonData)
}

function loadProducts(callback) {
    LookUp("GET", "/products/", callback)
}


const useFetch = (method, endpoint, callback, data) => {
    const url = `http://127.0.0.1:8000/api${endpoint}`
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('in useFetch: ' , data)
                callback(data)
            })

    }, [url]);

}

export {LookUp, useFetch}