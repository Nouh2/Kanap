const newLocal = new URL(window.location.href);
const orderId = newLocal.searchParams.get(`orderId`);
const confirm = (document.querySelector("#orderId").textContent = orderId);