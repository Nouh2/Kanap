var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
//console.log(id);

var apiURL = "http://localhost:3000/api/products/" + id;
console.log(apiURL);

fetch(apiURL)
    .then((response) => {
        response.json()
    })
    .then(data => console.log(data))
