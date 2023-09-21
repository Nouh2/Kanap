let cart = window.localStorage.getItem("cart");
//console.log(cart);
let cartArray = JSON.parse(cart);
console.log(cartArray);

cartArray.forEach((product) => {
    fetch("http://localhost:3000/api/products/" + product.id)
    .then((response) => response.json())
    .then((data) => {
        
        const article = document.createElement("article");
        document.querySelector("#cart_items").appendChild(article);
        product.className = "cart_item";
        article.setAttribute("data-id", cartArray.id);
        
        const imgDiv = document.createElement("div");
        article.appendChild(imgDiv);
        imgDiv.className = "cart__item__img";

        const img =document.createElement("img");
        imgDiv.appendChild(img);
        img.src = data.imageUrl

        const contentDiv = document.createElement("div");
        article.appendChild(contentDiv);
        contentDiv.className = "cart__item__content";

        const contentDescriptionDiv = document.createElement("div");
        contentDiv.appendChild(contentDescriptionDiv);
        contentDescriptionDiv.className = "cart__item__content__description";

        const h2 = document.createElement("h2");
        contentDescriptionDiv.appendChild(h2);
        h2.innerHTML = data.name;

        const color = document.createElement("p");
        contentDescriptionDiv.appendChild(color);
        color.innerHTML = cartArray.color;

        const price = document.createElement("p");
        contentDescriptionDiv.appendChild(price);
        price.innerHTML = data.price + "€";

        const contentSettingsDiv = document.createElement("div");
        contentDiv.appendChild(contentSettingsDiv);
        contentSettingsDiv.className = "cart__item__content__settings";

        const contentSettingsQuantityDiv = document.createElement("div");
        contentSettingsDiv.appendChild(contentSettingsQuantityDiv);
        contentSettingsQuantityDiv.className = "cart__item__content__settings__quantity";

        let quantity = document.createElement("p");
        contentSettingsQuantityDiv.appendChild(quantity);
        quantity.innerHTML = "Qté :" + cartArray.quantity;


       } 

    )})



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