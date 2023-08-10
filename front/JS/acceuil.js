const callApi = fetch ("http://localhost:3000/api/products/")
callApi.then(response => response.json())
.then(product => {
    for( var i = 0; i < product.length; i++){
        const { name, _id, imageUrl ,alttxt, description } = product[i]
        // console.log(description);
        
        const a = document.createElement("a");
        a.href = `./product.html?id=${_id}`;

        const Item = document.querySelector(".items");
        Item.appendChild(a);

        const article = document.createElement("article");
        a.appendChild(article);

        const image = document.createElement("img");
        image.src = imageUrl;
        article.appendChild(image);

        const h3 = document.createElement("h3");
        h3.innerText = name;
        article.appendChild(h3);

        const p = document.createElement("p");
        p.innerText = description;
        article.appendChild(p);

       
        
    }
})











