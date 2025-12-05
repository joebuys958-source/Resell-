document.addEventListener("DOMContentLoaded", () => {
    const list = JSON.parse(localStorage.getItem("inventory")) || [];
    const table = document.getElementById("inventory-body");

    table.innerHTML = "";

    list.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.brand}</td>
            <td>${item.size}</td>
            <td>£${item.purchasePrice}</td>
            <td>${item.soldPrice ? "£" + item.soldPrice : "Not Sold"}</td>
            <td>${item.soldPrice ? "Sold" : "In Stock"}</td>
        `;

        table.appendChild(row);
    });
});
