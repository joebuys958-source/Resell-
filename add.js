let items = load("inventory");

document.getElementById("add-btn").onclick = () => {
    let name = document.getElementById("item-name").value;
    let price = document.getElementById("item-price").value;

    if (!name || !price) return alert("Enter item name and price");

    items.push({ name, price });
    save("inventory", items);

    alert("Item added!");
};
