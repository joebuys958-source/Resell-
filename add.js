const form = document.querySelector(".form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const item = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    brand: document.getElementById("brand").value,
  };

  const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push(item);
  localStorage.setItem("inventory", JSON.stringify(inventory));

  alert("Item added!");
  window.location.href = "inventory.html";
});
