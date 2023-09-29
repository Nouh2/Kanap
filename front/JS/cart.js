let cart = window.localStorage.getItem("cart");
//console.log(cart);
let cartArray = JSON.parse(cart);
console.log(cartArray);

    if (cartArray === null ){
        const cartVideHTML = document.getElementById('cart__items');
        cartVideHTML.innerHTML = "Votre panier est vide";
    } else{
    for (const element of cartArray){
        console.log(element);
        fetch('http://localhost:3000/api/products/')
        .then(response => response.json())
        .then(products => {
            //console.log(products);
        const article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.className = "cart_item";
        article.setAttribute("data-id", element.id);
        article.setAttribute("data-color", element.color);
        
        const imgDiv = document.createElement("div");
        article.appendChild(imgDiv);
        imgDiv.className = "cart__item__img";

        const img =document.createElement("img");
        imgDiv.appendChild(img);
        img.src = products.imageUrl

        const contentDiv = document.createElement("div");
        article.appendChild(contentDiv);
        contentDiv.className = "cart__item__content";

        const contentDescriptionDiv = document.createElement("div");
        contentDiv.appendChild(contentDescriptionDiv);
        contentDescriptionDiv.className = "cart__item__content__description";

        const h2 = document.createElement("h2");
        contentDescriptionDiv.appendChild(h2);
        h2.innerHTML = products.name;

        const color = document.createElement("p");
        contentDescriptionDiv.appendChild(color);
        color.innerHTML = element.color;

        const price = document.createElement("p");
        contentDescriptionDiv.appendChild(price);
        price.innerHTML = products.price + "€";

        const contentSettingsDiv = document.createElement("div");
        contentDiv.appendChild(contentSettingsDiv);
        contentSettingsDiv.className = "cart__item__content__settings";

        const contentSettingsQuantityDiv = document.createElement("div");
        contentSettingsDiv.appendChild(contentSettingsQuantityDiv);
        contentSettingsQuantityDiv.className = "cart__item__content__settings__quantity";

        let quantity = document.createElement("p");
        contentSettingsQuantityDiv.appendChild(quantity);
        quantity.innerHTML = "Qté :" + element.quantity;
    })}}



 

   


//for (const{id, quantity, color} of cartArray){

    //const apiURL = "http://localhost:3000/api/products/" + id;
    //const {name,  _id, imageUrl, alttxt, description } =  fetch(apiURL)
    //console.log(name);
    //const Items = document.getElementById("cart__items");
        //const cartItem = document.createElement("cart__item");
        //Items.appendChild(cartItem);

        //const img = document.createElement("cart__item__img");
        //img.src = imageUrl;
        //cartItem.appendChild(img);

//}