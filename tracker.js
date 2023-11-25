class Income {
    constructor() {
        this.incomeAmounts = [];
    }

    addIncome(amount) {
        this.incomeAmounts.push(parseFloat(amount) || 0);
    }

    calculateTotalIncome() {
        return this.incomeAmounts.reduce((total, amount) => total + amount, 0);
    }
}

class Expenses {
    constructor() {
        this.expenseNames = [];
        this.expenseAmounts = [];
    }

    addExpense(name, amount) {
        this.expenseNames.push(name);
        this.expenseAmounts.push(parseFloat(amount) || 0);
    }

    calculateTotalExpenses() {
        return this.expenseAmounts.reduce((total, amount) => total + amount, 0);
    }

    drawPieChart() {
        var totalExpenses = this.calculateTotalExpenses();
        var percentages = this.expenseAmounts.map(amount => (amount / totalExpenses) * 100);

        // Draw the pie chart
        var canvas = document.getElementById("pieChart");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = Math.min(canvas.width, canvas.height) / 2;

        var lastAngle = 0;
        for (var i = 0; i < percentages.length; i++) {
            var color = this.getRandomColor();
            ctx.fillStyle = color;

            var angle = (percentages[i] / 100) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, lastAngle, lastAngle + angle);
            ctx.closePath();
            ctx.fill();

            lastAngle += angle;

            // Pie chart labels
            var labelX = centerX + Math.cos(lastAngle - angle / 2) * (radius / 1.5);
            var labelY = centerY + Math.sin(lastAngle - angle / 2) * (radius / 1.5);
            ctx.textAlign = "center";
            ctx.fillStyle = "black";
            ctx.fillText(this.expenseNames[i], labelX, labelY);
        }
    }

    formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}



class ExpenseTracker {
    constructor() {
        this.income = new Income();
        this.expenses = new Expenses();
    }

    calculateTotals() {
        // Check for empty fields
        var inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
        for (var i = 0; i < inputs.length; i++) {
            if (!inputs[i].value.trim()) {
                alert('Please enter all details.');
                return;
            }
        }

        // Fetch values from input fields
        this.expenses.expenseNames = [
            document.getElementById("expense1").value,
            document.getElementById("expense2").value,
            document.getElementById("expense3").value,
            document.getElementById("expense4").value
        ];

        this.expenses.expenseAmounts = [
            parseFloat(document.getElementById("amount1").value || 0),
            parseFloat(document.getElementById("amount2").value || 0),
            parseFloat(document.getElementById("amount3").value || 0),
            parseFloat(document.getElementById("amount4").value || 0)
        ];

        this.income.incomeAmounts = [
            parseFloat(document.getElementById("incomeAmount1").value || 0),
            parseFloat(document.getElementById("incomeAmount2").value || 0)
        ];

        // Calculate totals
        var totalIncome = this.income.calculateTotalIncome();
        var totalExpenses = this.expenses.calculateTotalExpenses();
        var remainingMoney = totalIncome - totalExpenses;

        // Results table
        document.getElementById("totalIncome").textContent = this.expenses.formatNumber(totalIncome.toFixed(2));
        document.getElementById("totalExpenses").textContent = this.expenses.formatNumber(totalExpenses.toFixed(2));
        document.getElementById("remainingMoney").textContent = this.expenses.formatNumber(remainingMoney.toFixed(2));
        document.getElementById("remainingMoneyHeader").textContent = "Potential Savings";

        document.getElementById("totals").style.display = "block";

        this.expenses.drawPieChart();
    }


    initialize() {
        var self = this;

        // Submit Btn
        document.getElementById("submitBtn").addEventListener("click", function () {
            self.calculateTotals();

            document.getElementById("pieChartContainer").style.display = "block";
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var tracker = new ExpenseTracker();
    tracker.initialize();
});
