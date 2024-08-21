document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('firstname').value + ' ' + document.getElementById('surname').value;
    const idNumber = document.getElementById('idNumber').value;
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const term = parseInt(document.getElementById('term').value);

    const submitApplication = async () => {
        const applicationData = {
            idNumber: idNumber,
            loanAmount: loanAmount,
            term: term
        };

        try {
            const response = await fetch('http://localhost:3000/application', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(applicationData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Ensure that 'result' is properly formatted to handle null or undefined values
            const resultDiv = document.getElementById('result');
            if (data && data.status === "Application Submitted") {
                resultDiv.innerHTML = `
                    <h2>${data.status}</h2>
                    <p><strong>ID Number:</strong> ${idNumber}</p>
                    <p><strong>Loan Amount:</strong> ${data.loanAmount}</p>
                    <p><strong>Term:</strong> ${data.term}</p>
                    <p><strong>Annual Interest Rate:</strong> ${data.annualInterestRate}</p>
                    <p><strong>Monthly Payment:</strong> ${data.monthlyPayment}</p>
                    <p><strong>Age:</strong> ${data.age} years</p>
                    <p><strong>Date of Birth:</strong> ${data.birthDate}</p>
                `;
            } else {
                resultDiv.innerHTML = `<p>${data.error || 'Unknown error occurred'}</p>`;
            }
        } catch (error) {
            console.error('Error:', error);
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    };

    submitApplication();
});
