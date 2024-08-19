document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const term = parseInt(document.getElementById('term').value);

    const annualRate = 6;
    const monthlyRate = annualRate / 100 / 12;

    const numberOfPayments = term;

    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / denominator;

    if (name && email && password && !isNaN(loanAmount) && !isNaN(term)) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h2>Application Submitted</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Loan Amount:</strong> R${loanAmount.toFixed(2)}</p>
            <p><strong>Term:</strong> ${term} months</p>
            <p><strong>Annual Interest Rate:</strong> ${annualRate}%</p>
            <p><strong>Monthly Payment:</strong> R${monthlyPayment.toFixed(2)}</p>
        `;
    } else {
        alert('Please fill in all fields correctly.');
    }
});
