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
        let selectedQuantity = document.querySelector("#quantity").value;
        let selectedQuantityNumber = Number(selectedQuantity);
        
        let checkItemInCart = cart.find(cartItem => cartItem.id == product._id && cartItem.color == selectedColor);
        if(checkItemInCart != undefined){
            let quantityItemInCart = checkItemInCart.quantity;
            let quantityItemInCartNumber = +quantityItemInCart;
            checkItemInCart.quantity = parseInt(quantityItemInCartNumber, 10) + parseInt(selectedQuantityNumber, 10);
            quantityItemInCartNumber += selectedQuantityNumber;
            
            //changeQuantity(checkItemInCart, selectedQuantity);
        }else{
            cart.push({
                id: product._id,
                quantity: selectedQuantity,
                color: selectedColor,
            });
        }
        saveCart(cart);
    }

    function changeQuantity(product, quantity) {
            product.quantity += quantity;
    }

    const btnSubmit = document.getElementById('addToCart');
    btnSubmit.addEventListener('click', addItemToCart)
    console.log(btnSubmit);
    
        
//cart = tableau avec l'id, la quantité, la couleur

    //const cart = [
        //{
           // id: 1,
            //color: red,
            //quantity: 1,
       // }
    //]
    //data en dur pour test
   // const quantity = 3;
    //const color = red;
    
     
    //vérification du cart pour doublon
    //const checkItemInCart = (id, color) => {

        //récupération de la data du cart
        //cart;
        //if data isn't in the cart = true add item
        //if(id = id.cart, color = color.cart){
        //    return false;
      //  }
         //   return true;
    //}
    //console.log(checkItemInCart);

    // listener de la soumission
    //const addItemToCart = () => {

        //récupération de l'id, de la colors et de la quantité
        //eventlistener qui submit lors lorsque l'on clique sur le boutton
        //if(checkItemInCart() = true) {
          //  incrementitem();
        //}

    //}

    

    
    