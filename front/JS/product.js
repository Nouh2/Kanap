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
    

    //cart = tableau avec l'id, la quantité, la couleur

    const cart = [id, quantity, color];

    //ajout new product dans le cart (submit) -- if new product n'est pas dans le tableau on add 
    
    const checkItemInCart = (id, color) => {

        //récupération de la data du cart
        cart;
        //if data isn't in the cart = true add item
        if(id = id.cart, color = color.cart){
            return false;
        }
            return true;
    }
    console.log(checkItemInCart);

    const addItemToCart = () => {

        //récupération de l'id, de la colors et de la quantité
        //eventlistener qui submit lors lorsque l'on clique sur le boutton

    }

    
    //ajout new product dans la cart if new product est deja dans le panier (id + color) on ++ quantité

    const addNewItemToCart = (id, color) => {

        //récupération de la data du cart
        //if cart[id, color] = choix client ++ quantité

    }

    const quantity = 3;
    const color = red;

})

