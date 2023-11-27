class BudgetOrganizer {
    constructor() {
        this.incomeInputs = [];
        this.expenseInputs = [];
        this.resultP = null;
    }

    setup() {
        createCanvas(470, 470);

        background(220);

        createElement('h1', 'Student Budget Organizer').position(20, 10);

        createElement('h3', "Enter this month's Income").position(20, 65);

        // Income
        for (let i = 1; i <= 2; i++) {
            let label = createElement('label', `Enter Income ${i} Amount:`).position(20, 80 + i * 30);
            let input = createInput('', 'number').position(200, 80 + i * 30);
            this.incomeInputs.push({ label, input });
        }

        createElement('h3', "Enter this month's expenses").position(20, 170);

        // Expenses
        for (let i = 1; i <= 4; i++) {
            let label = createElement('label', `Enter Expense ${i} Amount:`).position(20, 200 + i * 30);
            let input = createInput('', 'number').position(200, 200 + i * 30);
            this.expenseInputs.push({ label, input });
        }

        // Submit Button
        let submitButton = createButton('Submit');
        submitButton.mousePressed(() => this.calculateSavings());
        submitButton.position(20, 370);

        // Create a paragraph element to display the result
        this.resultP = createP('Potential Savings = ').position(20, 400);
    }

    calculateSavings() {
        let totalIncome = 0;
        let totalExpenses = 0;

        // Total Income
        for (let income of this.incomeInputs) {
            totalIncome += parseFloat(income.input.value()) || 0;
        }

        // Total Expenses
        for (let expense of this.expenseInputs) {
            totalExpenses += parseFloat(expense.input.value()) || 0;
        }

        // Potential Savings
        let potentialSavings = totalIncome - totalExpenses;

        this.resultP.html('Potential Savings = ' + potentialSavings);
    }
}

let budgetOrganizer;

function setup() {
    budgetOrganizer = new BudgetOrganizer();
    budgetOrganizer.setup();
}


