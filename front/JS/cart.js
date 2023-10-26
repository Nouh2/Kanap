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
const nomError = document.getElementById("lastNameErrorMsg");
const adresseError = document.getElementById("addressErrorMsg");
const villeError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");






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

  
const fieldvalid = (el) => el.innerHTML = "Valide";
const fieldinvalid = (el) => el.innerHTML ="Champ invalide";
const displayResult = (el, state) => {
  const messageEl = document.getElementById(`${el.id}ErrorMsg`)
  state ? fieldvalid(messageEl) : fieldinvalid(messageEl)
}

const rules = [
  {
    field: prenom,
    rule: regexNom,
  },
  {
    field: nom,
    rule: regexNom,
  },
  {
    field: ville,
    rule: regexNom,
  },
  {
    field: adresse,
    rule: regexAdresse,
  },
  {
    field: email,
    rule: regexEmail,
  }
]

for(const {field, rule} of rules){
  field.addEventListener('change', (e) => displayResult (e.target, rule.test(e.target.value)))
};

// créer un objet contact
const contact = {
        firstName :  prenom.value,
        lastName : nom.value,
        address : adresse.value,
        city : ville.value,
        email : email.value,
    };    
// créer un tableau de produits
const products = [];
// intégrer les id 
for(let element of cartArray) {
  products.push(element.id);
}
  
const order = JSON.stringify({contact, products})
sendOrder(order)
async function sendOrder(order) {
  let response = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: order,
  });
  if (response.ok) {
    // réponse du serveur
    const result = await response.json();

    // Je supprime le panier du localstorage
    function moveLocalStorage(key) {
      localStorage.removeItem(key);
    }

    moveLocalStorage("cartArray");

    // envoie des informations dans la page confirmation
    window.location.href = `./confirmation.html?orderId=${result.orderId}`;
  }
}


function calculateTotalCart () {

  let totalPrice = 0;
  let totalQuantity = 0;

  // récupérer les prix et quantités dans le panier
  for (element of cartArray) {
    fetch('http://localhost:3000/api/products/' + element.id)
    .then(response => response.json())
    .then(products => {
    // Additionner/Multiplier les résultats
    totalPrice += parseInt(products.price) * parseInt(element.quantity);
    totalQuantity += parseInt(element.quantity);

  

  // Insérer dans le DOM
  document.getElementById("totalPrice").innerHTML = totalPrice;
  document.getElementById("totalQuantity").innerHTML = totalQuantity;

})}}

calculateTotalCart();





//champs de validité
//pour chaque champs : 
//if regex true alors ok
//else message d'erreur
//function champvalide(e){
    //e.innerHTML = "Valide";
//}
//function displayResult(e, state){
    //if(state){
    //    champvalide;
    //}
//}
//prenom.onchange = (e) => {
  //  if (regexNom.test(e.value)){
    //    champvalide(prenomError);
    //}
    //else{
      //  prenomError.innerHTML = "Champ invalide";
    //}
//};

//nom.onchange = (e) => {
  //  if (regexNom.test(nom.value)){
    //  nomError.innerHTML = "Valide";
   // } else {
   //   nomError.innerHTML = "Champ invalide";
    //}
  //};

  //adresse.onchange= (e) => {
    //if (regexAdresse.test(adresse.value)){
      //adresseError.innerHTML = "Valide";
    //} else {
      //adresseError.innerHTML = "Champ invalide";
    //}
  //};

  //ville.onchange= (e) => {
    //if (regexNom.test(ville.value)){
      //villeError.innerHTML = "Valide";
    //} else {
      //villeError.innerHTML = "Champ invalide";
    //}
 // };

  //email.onchange= (e) => {
    //if (regexEmail.test(email.value)){
      //emailError.innerHTML = "Valide";
    //} else {
      //emailError.innerHTML = "Champ invalide";
    //}
//};


