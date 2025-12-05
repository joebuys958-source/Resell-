let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

const list = document.getElementById("inventory-list");

inventory.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.name} — £${item.price}`;
  list.appendChild(li);
});
