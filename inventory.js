let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

function renderItems() {
    const list = document.getElementById("inventory-list");
    list.innerHTML = "";

    inventory.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} — Stock: ${item.stock}`;
        list.appendChild(li);
    });

    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function addItem() {
    const name = document.getElementById("item-name").value;
    const stock = document.getElementById("item-stock").value;

    if (!name || !stock) return alert("Enter name + stock!");

    inventory.push({ name, stock });
    renderItems();

    document.getElementById("item-name").value = "";
    document.getElementById("item-stock").value = "";
}

renderItems();
