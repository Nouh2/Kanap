var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);

const item_img = document.querySelector(".item_img");

const image = document.createElement("img");
image.src = id.imageURL;
item_img.appendChild(image);


