/* ================================
   GLOBAL VARIABLES
================================ */

let items = JSON.parse(localStorage.getItem("items") || "[]");
let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
let editIndex = null;

/* ================================
   SIDEBAR
================================ */

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

/* PAGE SWITCHING */
function openPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
  toggleSidebar();
  updateDashboard();
  renderInventory();
  renderExpenses();
}

/* ================================
   THEME TOGGLE (Dark always default)
================================ */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* ================================
   INVENTORY RENDER
================================ */

function renderInventory() {
  const grid = document.getElementById("inventoryGrid");
  const search = document.getElementById("searchInput").value.toLowerCase();

  grid.innerHTML = "";

  items
    .filter(i =>
      i.brand.toLowerCase().includes(search) ||
      i.category.toLowerCase().includes(search) ||
      i.size.toLowerCase().includes(search)
    )
    .forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "item-card";

      let imgs = "";
      item.images.forEach(img => {
        imgs += `<img src="${img}" />`;
      });

      card.innerHTML = `
        <div class="item-images">${imgs}</div>
        <h3>${item.brand} — ${item.category}</h3>
        <p>Size: ${item.size}</p>
        <p>Cost: £${item.cost}</p>
        <p>Price: £${item.price}</p>
        ${item.sold ? `<p style="color:lime">Profit: £${item.profit}</p>` : ""}

        <div class="item-actions">
          ${item.sold ? "" : `<button onclick="markSold(${index})">Sold</button>`}
          <button onclick="editItem(${index})">Edit</button>
          <button onclick="deleteItem(${index})" style="background:#ff1a3c">Delete</button>
        </div>
      `;
      grid.appendChild(card);
    });

  save();
}

/* ================================
   ADD / EDIT ITEM
================================ */

function openForm() {
  editIndex = null;
  document.getElementById("itemForm").classList.remove("hidden");
  clearForm();
}

function closeForm() {
  document.getElementById("itemForm").classList.add("hidden");
}

function clearForm() {
  document.querySelectorAll("#itemForm input, #itemForm textarea, #itemForm select")
    .forEach(el => (el.value = ""));
  document.getElementById("imagePreview").innerHTML = "";
}

document.getElementById("images").addEventListener("change", previewImages);

function previewImages(e) {
  const files = Array.from(e.target.files);
  const preview = document.getElementById("imagePreview");
  preview.innerHTML = "";

  files.forEach(f => {
    const url = URL.createObjectURL(f);
    preview.innerHTML += `<img src="${url}" />`;
  });
}

function saveItem() {
  const data = {
    brand: brand.value,
    category: category.value,
    size: size.value,
    colour: colour.value,
    sku: sku.value,
    cost: Number(cost.value),
    price: Number(price.value),
    notes: notes.value,
    sold: false,
    profit: 0,
    images: []
  };

  // images
  const files = Array.from(document.getElementById("images").files);
  data.images = files.map(f => URL.createObjectURL(f));

  if (editIndex === null) {
    items.push(data);
  } else {
    items[editIndex] = data;
  }

  closeForm();
  renderInventory();
  updateDashboard();
  save();
}

function deleteItem(i) {
  items.splice(i, 1);
  renderInventory();
  updateDashboard();
  save();
}

function editItem(i) {
  editIndex = i;
  const item = items[i];

  brand.value = item.brand;
  category.value = item.category;
  size.value = item.size;
  colour.value = item.colour;
  sku.value = item.sku;
  cost.value = item.cost;
  price.value = item.price;
  notes.value = item.notes;

  document.getElementById("itemForm").classList.remove("hidden");
}

function markSold(i) {
  items[i].sold = true;
  items[i].profit = items[i].price - items[i].cost;
  renderInventory();
  updateDashboard();
  save();
}

/* ================================
   DASHBOARD STATS
================================ */
function updateDashboard() {
  const totalValue = items.reduce((a, b) => a + b.price, 0);
  const sold = items.filter(i => i.sold).length;
  const totalProfit = items.reduce((a, b) => a + (b.profit || 0), 0);

  document.getElementById("statTotalItems").textContent = items.length;
  document.getElementById("statTotalValue").textContent = "£" + totalValue;
  document.getElementById("statItemsSold").textContent = sold;
  document.getElementById("statTotalProfit").textContent = "£" + totalProfit;
}

/* ================================
   EXPENSES
================================ */

function addExpense() {
  expenses.push({
    name: expenseName.value,
    amount: Number(expenseAmount.value)
  });

  expenseName.value = "";
  expenseAmount.value = "";
  renderExpenses();
  save();
}

function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  expenses.forEach((ex, i) => {
    list.innerHTML += `<li>${ex.name} — £${ex.amount} <button onclick="deleteExpense(${i})">×</button></li>`;
  });

  document.getElementById("totalExpenses").textContent = expenses
    .reduce((a, b) => a + b.amount, 0);
}

function deleteExpense(i) {
  expenses.splice(i, 1);
  renderExpenses();
  save();
}

/* ================================
   BACKUP / RESTORE
================================ */

function backupData() {
  const data = {
    items,
    expenses
  };

  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "inventory-backup.json";
  a.click();
}

function restoreData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";

  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const data = JSON.parse(reader.result);
      items = data.items || [];
      expenses = data.expenses || [];
      save();
      renderInventory();
      renderExpenses();
      updateDashboard();
    };

    reader.readAsText(file);
  };

  input.click();
}

/* ================================
   SAVE TO LOCAL STORAGE
================================ */
function save() {
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("expenses", JSON.stringify(expenses));
}
