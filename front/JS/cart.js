let cart = window.localStorage.getItem("cart");
let cartArray = JSON.parse(cart);
console.log(cartArray);



//ALL FUNCTION


let fetchApi = async (id) => {
  let response = await fetch("http://localhost:3000/api/products/" + id)
  let data = await response.json()
  return data;
}

let changeProductQantity = (input, product) => {
  input.onchange = (event) => {
    const newquantity = event.target.value;
    product.quantity = newquantity;
    event.target.previousElementSibling.textContent = "Qté :" + product.quantity;

    const cartStorage = JSON.stringify(cartArray);
    localStorage.setItem("cart", cartStorage);
    calculateTotalCart();
}
}

let functionDeleteProduct = (button, product) => {
  button.onclick = () => {
    cartArray = cartArray.filter(article => article.id != product.id && article.color != product.color);


    const cartJSON = JSON.stringify(cartArray);
    localStorage.setItem("cart", cartJSON);
    location.reload();
    calculateTotalCart();
}
}

let calculateTotalCart = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  for (const product of cartArray){
    fetchApi(product.id)
    .then(data => {
      totalPrice += parseInt(data.price, 10) * parseInt(product.quantity, 10);
      totalQuantity += parseInt(product.quantity, 10);

      document.getElementById("totalPrice").innerHTML = totalPrice;
      document.getElementById("totalQuantity").innerHTML = totalQuantity;
    })
  }
}

let fieldvalid = (el) => el.innerHTML = "Valide";

let fieldinvalid = (el) => el.innerHTML ="Champ invalide";

let displayResult = (el, state) => {
  let messageEl = document.getElementById(`${el.id}ErrorMsg`)
  state ? fieldvalid(messageEl) : fieldinvalid(messageEl)
}


//HTML ELEMENT


 
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const email = document.getElementById("email");

const regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
const regexNom = new RegExp("^[a-zA-Z ,.'-]+$")
const regexAdresse = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$")

const prenomError = document.getElementById("firstNameErrorMsg");
const nomError = document.getElementById("lastNameErrorMsg");
const adresseError = document.getElementById("addressErrorMsg");
const villeError = document.getElementById("cityErrorMsg");
const emailError = document.getElementById("emailErrorMsg");

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

if (cartArray === null ){
  const cartVideHTML = document.getElementById('cart__items');
  cartVideHTML.innerHTML = "Votre panier est vide";
} else {
  for (const product of cartArray){
    fetchApi(product.id)
    .then(data => {
        const article = document.createElement("article");
        document.querySelector("#cart__items").appendChild(article);
        article.className = "cart__item";
        article.setAttribute("data-id", product.id);
        article.setAttribute("data-color", product.color);
        
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
        color.innerHTML = product.color;

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
        quantity.innerHTML = "Qté :" + product.quantity;

        let inputQuantity = document.createElement("input");
        inputQuantity.classList.add("itemQuantity");
        inputQuantity.type = "number";
        inputQuantity.name = "itemQuantity";
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("onkeypress","return event.charCode >= 48");
        inputQuantity.setAttribute("value", product.quantity);
        contentSettingsQuantityDiv.appendChild(inputQuantity);

        let deleteButton = document.createElement("div");
        deleteButton.classList.add("cart__item__content__settings__delete");
        contentSettingsQuantityDiv.appendChild(deleteButton);

        let deleteProduct = document.createElement("p");
        deleteProduct.classList.add("deleteItem");
        deleteProduct.textContent = "Supprimer";
        deleteButton.appendChild(deleteProduct);

        changeProductQantity(inputQuantity, product);
        functionDeleteProduct(deleteProduct, product);
        calculateTotalCart();
    })
  }
}

for(const {field, rule} of rules){
  field.addEventListener('change', (e) => displayResult (e.target, rule.test(e.target.value)))
};

let orderComplete = (event) => {

  event.preventDefault()
  
    const prenom = document.getElementById("firstName");
    const nom = document.getElementById("lastName");
    const adresse = document.getElementById("address");
    const ville = document.getElementById("city");
    const email = document.getElementById("email");


  


  const arrayProducts = [];

  for (let i =0; i <cartArray.length; i++){
      arrayProducts.push(cartArray[i].id);
  }
  //console.log(products);

const order = {
    contact : {
          firstName :  prenom.value,
          lastName : nom.value,
          address : adresse.value,
          city : ville.value,
          email : email.value,
    },
    products : arrayProducts,
  }
  //console.log(order);
  const contactString = JSON.stringify(order.contact);
  //const contactArray = Object.entries(order.contact);
  debugger;
if (contactString === ""){
  debugger;
  const cartForms = document.querySelector("cart__order__form__question");
  cartForms.innerHTML = "Veuillez remplir le formualaire";
}else{
  const method = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
        'Accept': 'application/json', 
        "Content-Type": "application/json"
  },
};

  fetch("http://localhost:3000/api/products/order", method)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    localStorage.removeItem('cart');
    localStorage.setItem("orderId", data.orderId);
    document.location.href = "confirmation.html";
  })


  }}

  
  const btnSubmit = document.getElementById("order");
  btnSubmit.addEventListener('click', orderComplete );