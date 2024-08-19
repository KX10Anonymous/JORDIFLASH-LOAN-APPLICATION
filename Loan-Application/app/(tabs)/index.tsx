import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoanApplication() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');

  const populateDOB = (idNumber: string) => {
    if (idNumber.length >= 6) {
      const year = idNumber.substring(0, 2);
      const month = idNumber.substring(2, 4);
      const day = idNumber.substring(4, 6);
      const currentYear = new Date().getFullYear();
      const fullYear = parseInt(year) > currentYear % 100 ? `19${year}` : `20${year}`;
      const birthDate = `${fullYear}-${month}-${day}`;
      setDob(birthDate);

      // Calculate age
      const birthDateObj = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));
      let calculatedAge = currentYear - birthDateObj.getFullYear();
      const monthDiff = new Date().getMonth() - birthDateObj.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDateObj.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge.toString());
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      firstName,
      surname,
      idNumber,
      loanAmount,
      term,
      dob,
      age,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Loan Application</Text>
      
      <Text>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter First Name"
      />

      <Text>Surname:</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Enter Surname"
      />

      <Text>ID Number:</Text>
      <TextInput
        style={styles.input}
        value={idNumber}
        onChangeText={(text) => {
          setIdNumber(text);
          populateDOB(text);
        }}
        placeholder="Enter ID Number"
      />

      <Text>Date of Birth:</Text>
      <TextInput style={styles.input} value={dob} editable={false} placeholder="Date of Birth" />

      <Text>Age:</Text>
      <TextInput style={styles.input} value={age} editable={false} placeholder="Age" />

      <Text>Loan Amount:</Text>
      <TextInput
        style={styles.input}
        value={loanAmount}
        onChangeText={setLoanAmount}
        placeholder="Enter Loan Amount"
        keyboardType="numeric"
      />

      <Text>Term:</Text>
      <TextInput
        style={styles.input}
        value={term}
        onChangeText={setTerm}
        placeholder="Enter Term"
        keyboardType="numeric"
      />

      <Button title="Submit Application" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
