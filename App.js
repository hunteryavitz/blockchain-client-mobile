import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
    const [data, setData] = useState(false);
    const [message, setMessage] = useState('Awaiting readiness check');

    const fetchData = async () => {
        setMessage('Fetching data');

        try {
            const response = await fetch('http://localhost:8080/api/v1/readiness');
            const json = await response.json();
            setData(json);

            console.log(data);
            if (!data) {
                setMessage('Readiness check failed');
            }

        } catch (error) {
            setMessage('Error fetching data');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Blockchain Mobile Client</Text>
            <Text style={styles.body}>This client serves as the mobile component for the blockchain project.</Text>
            <Button title="Readiness Check" onPress={fetchData} />
            <Text>{message}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green'
    },
    body:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    }
});
