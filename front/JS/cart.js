let cart = window.localStorage.getItem("cart");
//console.log(cart);
let cartArray = JSON.parse(cart);
//console.log(cartArray);

    if (cartArray === null ){
        const cartVideHTML = document.getElementById('cart__items');
        cartVideHTML.innerHTML = "Votre panier est vide";
    } else{
    for (const element of cartArray){
        //console.log(element);
        fetch('http://localhost:3000/api/products/' + element.id)
        .then(response => response.json())
        .then(products => {
            //console.log(products);
        const article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.className = "cart__item";
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

        let inputQuantity = document.createElement("input");
        inputQuantity.classList.add("itemQuantity");
        inputQuantity.type = "number";
        inputQuantity.name = "itemQuantity";
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("onkeypress","return event.charCode >= 48");
        inputQuantity.setAttribute("value", element.quantity);
        contentSettingsQuantityDiv.appendChild(inputQuantity);

        let deleteButton = document.createElement("div");
        deleteButton.classList.add("cart__item__content__settings__delete");
        contentSettingsQuantityDiv.appendChild(deleteButton);

  // Creation du paragraphe de suppression.
        let deleteProduct = document.createElement("p");
        deleteProduct.classList.add("deleteItem");
        deleteProduct.textContent = "Supprimer";
        deleteButton.appendChild(deleteProduct);



        changeProductQantity(inputQuantity, element);
        deleteProduct(deleteProduct, element);
    })}}

    
//change quantity grace à l'input qui permet de selectionner le produit que l'on veut modifier
//chercher le produit 
// modifier la quantité
//actualiser le panier
//realod le panier
function changeProductQantity(input, product) {
    input.onchange = (event) => {
        const newquantity = event.target.value;
        product.quantity = newquantity;
        event.target.previousElementSibling.textContent = "Qté :" + product.quantity;

        const cart = JSON.stringify(cart);
        localStorage.setItem("cart", cart);
    }
}

function deleteProduct(button, element) {
    button.onclick = () => {
        cart = cart.filter(article => article.id != element.id || article.couleur != element.couleur);


        const cart = JSON.stringify(cart);
        localStorage.setItem("cart", cart);

    }
  }

//changer la quantité par rapport à l'id et a la color
//{
    //récupération de la data id et color dans l'élément parent cart__item
    //const cart_item = event.target.closest("cart__item")
    //const id = cart_item.dataset.id
    //console.log(id);
    //const color = cart_item.dataset.color
    // trouver le id et la color 
    ////cart.find((element) => element.id === id && element.color === color ).quantity = event.target.value
//}
//console.log(changeProductQantity);

   


