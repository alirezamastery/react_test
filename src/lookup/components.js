import {useEffect, useState} from "react";

function lookup(method, endpoint, callback, data) {
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
    lookup("GET", "/products/", callback)
}


const useFetch = (url , callback) => {
    // const [state, setState] = useState({data: null, loading: true});

    useEffect(() => {
        // setState(state => ({data: state.date, loading: true}));

        fetch(url)
            .then(x => x.json())
            .then(y => {
                // setState({data: y, loading: false})
                console.log('in fetch' , y)
                callback(y)
            })

    }, [url]);

}

export {loadProducts, useFetch}