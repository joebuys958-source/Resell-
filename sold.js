let sold = load("sold");

let list = document.getElementById("sold-list");
list.innerHTML = "";

sold.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - Sold for $${item.price}`;
    list.appendChild(li);
});
