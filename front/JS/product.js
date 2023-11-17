// récupération de l'id dans l'url
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");
//console.log(id);
// construction du chemin qui mène aux éléments spécifique à chaque produit
const apiURL = "http://localhost:3000/api/products/" + id;
let product;
//console.log(apiURL);
// récupération des éléments des produits via l'api
fetch(apiURL)
    .then((response) => response.json())
    .then(data => {
    product = data;
    const item = document.querySelector(".item");
    item.querySelector(".item__img").insertAdjacentHTML("afterbegin", `<img src="${data.imageUrl}" alt="Photographie d'un canapé ${data.name}">`);
    item.querySelector("#title").insertAdjacentHTML("afterbegin", data.name);
    item.querySelector("#price").insertAdjacentHTML("afterbegin", data.price);
    item.querySelector("#description").insertAdjacentHTML("afterbegin", data.description);
    item.querySelector("#colors").insertAdjacentHTML("beforeend", data.colors.map(colors => `<option value ="${colors}">${colors}</option>`).join(''));
    

    

})
//Sauvegarder le panier le localstorage
function saveCart(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function getCart(){
        let cart = localStorage.getItem("cart");
        if(cart == null){
            return [];
        }else{
            return JSON.parse(cart);
        }
    }
    
//ajout de produit dans le panier
    function addItemToCart (){
        let cart = getCart();
        let selectedColor = document.querySelector("#colors").value;
        let selectedQuantity = parseInt(document.querySelector("#quantity").value, 10);
        
        let checkItemInCart = cart.find(cartItem => cartItem.id === product._id && cartItem.color === selectedColor);
        if (selectedColor === "" || selectedQuantity === 0){
        const selectContent = document.querySelector("item__content__settings");
        selectContent.innerHTML = 'Veuillez choisir une quantité ou une couleur';
        }else{
        if(checkItemInCart != undefined){
            checkItemInCart.quantity = parseInt(checkItemInCart.quantity, 10) + parseInt(selectedQuantity, 10);
            
            //changeQuantity(checkItemInCart, selectedQuantity);
        }else{
            cart.push({
                id: product._id,
                quantity: selectedQuantity,
                color: selectedColor,
            });
        }
        saveCart(cart);
    }}

    function changeQuantity(product, quantity) {
            product.quantity += quantity;
    }

    const btnSubmit = document.getElementById('addToCart');
    btnSubmit.addEventListener('click', addItemToCart)

    
        
