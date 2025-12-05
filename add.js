function addItem() {
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let details = document.getElementById("details").value;

  if (name.trim() === "" || price === "") {
    alert("Name and price are required.");
    return;
  }

  let item = {
    name,
    price,
    details,
    id: Date.now()
  };

  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push(item);
  localStorage.setItem("inventory", JSON.stringify(inventory));

  alert("Item added!");
  window.location.href = "inventory.html";
}
