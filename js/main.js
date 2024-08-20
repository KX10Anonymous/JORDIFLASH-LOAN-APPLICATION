document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('firstname').value + ' '+ document.getElementById('surname').value;
    const idNumber = document.getElementById('idNumber').value;
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const term = parseInt(document.getElementById('term').value);
    alert('About to run function');

    const submitApplication = async () => {
        alert('running function');
        const applicationData = {
            idNumber: idNumber,
            loanAmount: loanAmount,
            term: term
        };
    
        try {
            alert('Connecting');
            const response = await fetch('http://localhost:3000/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicationData)
            });
    
            alert('Responding');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            alert('Outputting');
            console.log('Response:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    


    submitApplication();
    
    if (name) {
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


