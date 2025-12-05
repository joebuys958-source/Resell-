const inv = JSON.parse(localStorage.getItem("inventory")) || [];
const container = document.getElementById("inventory-container");

inv.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${item.name}</h2>
    <p>Brand: ${item.brand || "—"}</p>
    <p>Purchase: £${item.price}</p>
  `;

  container.appendChild(card);
});
