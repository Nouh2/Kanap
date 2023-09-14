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
       for( const { name, _id, imageUrl, alttxt, description } of data ){
        const Item = document.getElementById('cart__items');
        
       } 

    })

}