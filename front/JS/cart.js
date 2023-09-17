let cart = window.localStorage.getItem("cart");
//console.log(cart);
let cartArray = JSON.parse(cart);
console.log(cartArray);

for ( const{id, quantity, color} of cartArray){

    const apiURL = "http://localhost:3000/api/products/" + id;
    //console.log(apiURL);
    fetch(apiURL)
    .then((response) => response.json())
    .then(data => {
       //console.log(data);
       //const map = new Map (data);
       for( const { name, _id, imageUrl, alttxt, description, price } of data ){
        const Items = document.getElementById("cart__items");
        const cartItem = document.createElement("cart__item");
        Items.appendChild(cartItem);

        const img = document.createElement("cart__item__img");
        img.src = imageUrl;
        cartItem.appendChild(img);

        const cart_item_content = document.createElement("cart__item__content");
        cartItem.appendChild(cart_item_content);
        const cart_item_content_description = document.createElement("cart__item__content__description")
        cart_item_content.appendChild(cart_item_content_description);

        const h2 = document.createElement("h2");
        h2.innerText = name;
        cart_item_content_description.appendChild(h2);

        const color = document.createElement("p");
        color.innerText = cartArray.color;
        cart_item_content_description.appendChild(color);

        const price = document.createElement("p")
        price.innerText = price;
        cart_item_content_description.appendChild(price);

        const cart_item_content_settings = document.createElement("cart__item__content__settings");
        cartItem.appendChild(cart_item_content_settings);
        const cart_item_content_settings_quantity = document.createElement("cart__item__content__settings__quantity")
        cart_item_content_settings.appendChild(cart_item_content_settings_quantity);

        const quantity = document.createElement("p")
        quantity.innerText = "Qté : " + cartArray.quantity;
        cart_item_content_settings_quantity.appendChild(quantity);


       } 

    })

}

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