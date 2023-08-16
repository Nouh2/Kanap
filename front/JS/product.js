// récupération de l'id dans l'url
var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
//console.log(id);
// construction du chemin qui mène aux éléments spécifique à chaque produit
var apiURL = "http://localhost:3000/api/products/" + id;
console.log(apiURL);
// récupération des éléments des produits via l'api
fetch(apiURL)
    .then((response) => {
        response.json()
    })
    .then(data => console.log(data))
