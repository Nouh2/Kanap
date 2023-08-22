// récupération de l'id dans l'url
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
//console.log(id);
// construction du chemin qui mène aux éléments spécifique à chaque produit
const apiURL = "http://localhost:3000/api/products/" + id;
//console.log(apiURL);
// récupération des éléments des produits via l'api
fetch(apiURL)
    .then((response) => response.json())
    .then(data => {
    
    const item = document.querySelector(".item");
    item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${data.imageUrl}" alt="Photographie d'un canapé ${data.name}">`);
    item.querySelector("#title").insertAdjacentHTML("afterbegin", data.name);
    item.querySelector("#price").insertAdjacentHTML("afterbegin", data.price);
    item.querySelector("#description").insertAdjacentHTML("afterbegin", data.description);
    item.querySelector("#colors").insertAdjacentHTML("beforeend", data.colors.map(colors => `<option value ="${colors}">${colors}</option>`).join(''));
    //stockage du choix du client
    localStorage.setItem("product", id);
    localStorage.setItem("color", colors);
    localStorage.setItem("quantity", itemQuantity);
})

