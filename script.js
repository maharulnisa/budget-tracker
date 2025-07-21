document.addEventListener("DOMContentLoaded", function () {
  const budgetInput = document.getElementById('budgetInput');
  const budgetBtn = document.getElementById('setBudgetBtn');
  const expenseNameInput = document.getElementById('expenseNameInput');
  const expenseAmountInput = document.getElementById('expenseAmountInput');
  const addExpenseBtn = document.getElementById('addExpenseBtn');
  const budgetTotal = document.getElementById('budgetTotal');
  const expensesTotal = document.getElementById('expensesTotal');
  const remainingTotal = document.getElementById('remainingTotal');
  const expenseList = document.getElementById('expenseList');

  let budgetAmount = 0;
  let expenses = [];

  // Load data from localStorage if exists
  const savedBudget = localStorage.getItem("budgetAmount");
  const savedExpenses = localStorage.getItem("expenses");

  if (savedBudget) {
    budgetAmount = parseFloat(savedBudget);
    budgetTotal.textContent = budgetAmount.toFixed(2);
  }

  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
    renderExpenses();
    updateTotals();
  }

  // Set budget
  budgetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const value = parseFloat(budgetInput.value);

    if (value > 0) {
      budgetAmount = value;
      localStorage.setItem("budgetAmount", budgetAmount);
      budgetTotal.textContent = budgetAmount.toFixed(2);
      updateTotals();
      budgetInput.value = "";
    } else {
      alert("Please enter a valid budget amount greater than 0.");
    }
  });

  // Add expense
  addExpenseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name && amount > 0) {
      const expense = {
        id: Date.now(),
        name,
        amount
      };

      expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      renderExpenses();
      updateTotals();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    } else {
      alert("Please enter both expense name and valid amount.");
    }
  });

  // Render expense history
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>${expense.name}</span> <span>Rs. ${expense.amount.toFixed(2)}</span>`;
      expenseList.appendChild(li);
    });
  }

  // Update totals
  function updateTotals() {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    expensesTotal.textContent = totalExpenses.toFixed(2);
    remainingTotal.textContent = (budgetAmount - totalExpenses).toFixed(2);
  }
});
