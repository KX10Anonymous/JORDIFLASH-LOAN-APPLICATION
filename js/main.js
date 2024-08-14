function populateDOB() {
    const idNumber = document.getElementById('idNumber').value;
    const dobField = document.getElementById('dob');
    if (idNumber.length >= 6) {
        const year = idNumber.substring(0, 2);
        const month = idNumber.substring(2, 4);
        const day = idNumber.substring(4, 6);
        const currentYear = new Date().getFullYear();
        const fullYear = (parseInt(year) > currentYear % 100) ? `19${year}` : `20${year}`;
        dobField.value = `${fullYear}-${month}-${day}`;
    }
}
