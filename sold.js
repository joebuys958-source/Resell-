let sold = JSON.parse(localStorage.getItem("sold")) || [];

const list = document.getElementById("sold-list");

sold.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.name} — Sold for £${item.price}`;
  list.appendChild(li);
});
