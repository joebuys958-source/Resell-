const sold = JSON.parse(localStorage.getItem("soldItems")) || [];
const soldContainer = document.getElementById("sold-container");

sold.forEach(item => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${item.name}</h2>
    <p>Sold for: £${item.salePrice}</p>
    <p>Profit: £${item.salePrice - item.purchasePrice}</p>
  `;

  soldContainer.appendChild(card);
});
