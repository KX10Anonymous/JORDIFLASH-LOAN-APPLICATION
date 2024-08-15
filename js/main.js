document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const baseRate = 8.5;
    const name = document.getElementById('firstname').value + " " + document.getElementById('surname').value;
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const term = parseInt(document.getElementById('term').value);
    const age = parseInt(document.getElementById('age').value);

    let annualRate;

    if (age < 30) {
        annualRate = baseRate + 2.0;
    } else if (age >= 30 && age < 50) {
        annualRate = baseRate + 1.5;
    } else {
        annualRate = baseRate + 1.0;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = term;
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / denominator;

    if (name) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h2>Application Submitted</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Loan Amount:</strong> R${loanAmount.toFixed(2)}</p>
            <p><strong>Term:</strong> ${term} months</p>
            <p><strong>Annual Interest Rate:</strong> ${annualRate}%</p>
            <p><strong>Monthly Payment:</strong> R${monthlyPayment.toFixed(2)}</p>
        `;
    } else {
        alert('Please fill in all fields correctly.');
    }
});
