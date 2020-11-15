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


export default loadTweets