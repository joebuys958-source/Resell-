const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
const sold = JSON.parse(localStorage.getItem("soldItems")) || [];

document.getElementById("total-items").innerText = inventory.length;
document.getElementById("total-sold").innerText = sold.length;

let profit = 0;
sold.forEach(i => profit += Number(i.salePrice) - Number(i.purchasePrice));
document.getElementById("total-profit").innerText = "£" + profit;
