let cart = window.localStorage.getItem("cart");
//console.log(cart);
let cartArray = JSON.parse(cart);
//console.log(cartArray);


//récupérer les données de l'utilisateur saisie dans les champs 
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");
//creer les regex pour les différents champs
const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
const regexNom = new RegExp("^[a-zA-Z ,.'-]+$")
const regexAdresse = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$")
//intégrer les messages d'erreurs
const prenomError = document.getElementById("firstNameErrorMsg");
const nomError = document.getElementById("lastnameErrorMsg");
const adresseError = document.getElementById("addressErrorMsg");
const villeError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");


// créer un objet contact
const commande = {
    contact : {
        firstName : prenom.value,
        lastName : nom.value,
        address : adresse.value,
        city : ville.value,
        email : email.value,
    },
    
}
console.log(commande);
   
// créer un tableau de produits
const products = [];
// intégrer les id 
cartArray.forEach(element => {
    products.push(element.id);
});
console.log(products);


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
        fctdeleteProduct(deleteProduct, element);
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

        const cartStorage = JSON.stringify(cartArray);
        localStorage.setItem("cart", cartStorage);
    }
}

function fctdeleteProduct(button, element) {
    button.onclick = () => {
        cartArray = cartArray.filter(article => article.id != element.id || article.color != element.color);


        const cartJSON = JSON.stringify(cartArray);
        localStorage.setItem("cart", cartJSON);
        location.reload();

    }
  }


//champs de validité
//pour chaque champs : 
//if regex true alors ok
//else message d'erreur
prenom.onchange = (e) => {
    if (regexNom.test(prenom.value)){
        prenomError.innerHTML = "Valide";
    }
    else{
        prenomError.innerHTML = "Champ invalide";
    }
};

nom.onchange = (e) => {
    if (regexNom.test(nom.value)){
      nomError.innerHTML = "Valide";
    } else {
      nomError.innerHTML = "Champ invalide";
    }
  };

  adresse.onchange= (e) => {
    if (regexAdresse.test(adresse.value)){
      adresseError.innerHTML = "Valide";
    } else {
      adresse.innerHTML = "Champ invalide";
    }
  };

  ville.onchange= (e) => {
    if (regexNom.test(ville.value)){
      villeError.innerHTML = "Valide";
    } else {
      villeError.innerHTML = "Champ invalide";
    }
  };

  email.onchange= (e) => {
    if (regexEmail.test(email.value)){
      emailError.innerHTML = "Valide";
    } else {
      emailError.innerHTML = "Champ invalide";
    }
};


