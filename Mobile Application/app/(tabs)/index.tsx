import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default function LoanApplication() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);

  

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          surname,
          idNumber,
          loanAmount,
          term,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseData(result);
        setModalVisible(true);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    }
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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Application Submitted</Text>

            <Text>First Name: {firstName}</Text>
            <Text>Surname: {surname}</Text>
            <Text>ID Number: {idNumber}</Text>
            <Text>Date of Birth: {dob}</Text>
            <Text>Age: {age}</Text>
            <Text>Loan Amount: {loanAmount}</Text>
            <Text>Term: {term}</Text>
            <Text>Annual Interest Rate: {annualInterestRate}</Text>
            <Text>Monthly Payment: {monthlyPayment}</Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
