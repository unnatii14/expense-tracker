const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const list = document.getElementById('expenseList');
const totalSpan = document.getElementById('totalAmount');

// local Storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
updateList();

// add expense
function addExpense() {
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!title || isNaN(amount) || amount <= 0) {
    alert("Please enter valid title and amount.");
    return;
  }

  const expense = {
    id: Date.now(),
    title,
    amount
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateList();

  titleInput.value = '';
  amountInput.value = '';
}

// delete expense
function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateList();
}
// ui
function updateList() {
  list.innerHTML = '';
  let total = 0;

  expenses.forEach(exp => {
    total += exp.amount;

    const li = document.createElement('li');
    li.innerHTML = `
      ${exp.title} - $${exp.amount.toFixed(2)}
      <button onclick="deleteExpense(${exp.id})">Delete</button>
    `;
    list.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}
