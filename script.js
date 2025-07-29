let expenses = [];

function addExpense() {
  let title = document.getElementById('title').value;
  let amount = document.getElementById('amount').value;

  if (title === '' || amount === '') {
    alert('Please enter both title and amount.');
    return;
  }

  amount = Number(amount); 

    const expense = {
    id: Date.now(), 
    title: title,
    amount: amount
  };

  expenses.push(expense);

  displayExpense(expense);
  updateTotal();

  document.getElementById('title').value = '';
  document.getElementById('amount').value = '';
}

function displayExpense(expense) {
  const list = document.getElementById('expenseList');
  const item = document.createElement('li');
  item.setAttribute('data-id', expense.id); // store ID in element
  item.innerHTML = `
    ${expense.title} - $${expense.amount}
    <button class="delete-btn" onclick="deleteExpense(${expense.id})">🗑</button>`;
  list.appendChild(item);
}

function deleteExpense(id) {
  // Remove from array
  expenses = expenses.filter(exp => exp.id !== id);

  // Remove from UI
  const list = document.getElementById('expenseList');
  const item = list.querySelector(`[data-id="${id}"]`);
  if (item) {
    list.removeChild(item);
  }

  updateTotal();
}

function updateTotal(){
    let total = 0;
    expenses.forEach(exp => total += exp.amount);
    document.getElementById("totalAmount").textContent = total.toFixed(2);
}
