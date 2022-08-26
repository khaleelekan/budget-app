//Classes
class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }
    //subtract from the budget
    subtractBudget(amount){
        return this.budgetLeft -= amount;
    }
}
//everything related to HTMl
class HTML {
    insertBudget(amount) {
        budgetTotal.innerHTML = `${amount}`,
            budgetLeft.innerHTML = `${amount}`;
    }
    //displays a message when the fields are correct or invalid
    printMessage(message, className) {
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));


        //insert into html
        document.querySelector('.primary').insertBefore(messageWrapper, addExpense)

        //disappear message
        setTimeout(function () {
            document.querySelector('.primary .alert').remove();
            addExpense.reset();
        }, 3000);
    }
    //add expense from the form to the list
    addExpenseToList(name, amount) {
        const expensesList = document.querySelector('#expenses ul');
        //creating li
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        //creating the template
        li.innerHTML = `
         ${name} <span class="badge badge-primary badge-pill">$ ${amount}</span>
         `;

        expensesList.appendChild(li);
    }
    trackBudget(amount){
        const budgetLeftDollars= budget.subtractBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`; 
//case when budgetleft is 25% or less than
        if((budget.budget / 4 > budgetLeftDollars)){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        }
        else if ((budget.budget/2 > budgetLeftDollars)){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-danger');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }

    }
}


//variable
const addExpense = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');


let budget, userBudget;


//instanciate html
const html = new HTML();



//Eventlisteners
eventListeners();
function eventListeners() {
    //App init
    document.addEventListener('DOMContentLoaded', function () {
        // Ask the visitor the weekly budget
        userBudget = prompt(`what's your weekly budget $:`);
        if (userBudget === null || userBudget === '' || userBudget === '0') {
            window.location.reload();
        }
        else {
            //Budget is valid then instaciate budget class
            budget = new Budget(userBudget);


            html.insertBudget(budget.budget);



        }

    })

    //when a new expense is added
    addExpense.addEventListener('submit', function (e) {
        e.preventDefault();
        ///Read the values frm the budget form
        const expenseName = document.querySelector("#expense").value;
        const expenseAmount = document.querySelector("#amount").value;

        if (expenseName === '' || expenseAmount === '') {
            html.printMessage('there was an error,all fields are mandatory', 'alert-danger');
        }
        else {
            //Add the expenses into the list
            html.addExpenseToList(expenseName, expenseAmount);
            html.trackBudget(expenseAmount);
            html.printMessage('successfully Added', 'alert-success');
            setTimeout(function (){
              addExpense.reset();
            },1000)

        }
    })
};
