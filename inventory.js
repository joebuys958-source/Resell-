let items = load("inventory");

let list = document.getElementById("inventory-list");
list.innerHTML = "";

items.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    list.appendChild(li);
});
