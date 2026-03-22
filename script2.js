// ---------- AUTH ----------

function signup() {
  let user = document.getElementById("su-user").value;
  let pass = document.getElementById("su-pass").value;

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);

  alert("Signup successful");
  window.location.href = "login2.html";
}

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (
    user === localStorage.getItem("user") &&
    pass === localStorage.getItem("pass")
  ) {
    window.location.href = "index2.html";
  } else {
    document.getElementById("error").innerText = "Invalid login";
  }
}

function logout() {
  window.location.href = "login2.html";
}

// ---------- LOAD DATA ON START ----------

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

updateUI();

// ---------- ADD TRANSACTION ----------

function addTransaction() {
  let text = document.getElementById("text").value;
  let amount = Number(document.getElementById("amount").value);

  if (!text || !amount) return;

  let transaction = {
    text: text,
    amount: amount
  };

  transactions.push(transaction);

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateUI();

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
}

// ---------- UPDATE UI ----------

function updateUI() {
  let list = document.getElementById("list");

  if (!list) return; // prevent error on login page

  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    let li = document.createElement("li");
    li.innerText = `${t.text}: ₹${t.amount}`;
    list.appendChild(li);

    if (t.amount > 0) {
      income += t.amount;
    } else {
      expense += Math.abs(t.amount);
    }
  });

  let balance = income - expense;

  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + expense;
  document.getElementById("balance").innerText = "₹" + balance;
}
// --- Telegram animation for login circles ---
const circles = document.querySelectorAll('.circle');

circles.forEach((circle, i) => {
  // Add a small delay for each circle to animate one after another
  circle.style.animationDelay = `${i * 0.5}s`;
});