import React, { useState } from 'react'
import {View, Button, StyleSheet, Text, Alert} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import HTTP from '../api/http-commons'

const SubmitTransactionForm = () => {
    const STATUS_VALUES = [
        'CREATED',
        'PENDING',
        'FULFILLED',
        'REJECTED',
        'CANCELLED',
        'SHIPPED',
        'DELIVERED',
        'RETURNED',
        'REFUNDED',
        'RECEIVED',
        'COMPLETED',
    ]

    const [selectedValue, setSelectedValue] = useState(STATUS_VALUES[0])

    const transaction = {
        id: '-1',
        timestamp: 'never',
        source: 'nowhere',
        status: 'REJECTED'
    }

    const handleSubmit = async () => {
        const updatedTransaction = {
            ...transaction,
            id: new Date().getSeconds() + new Date().getMilliseconds(),
            timestamp: new Date().toISOString(),
            source: 'mobile',
            status: selectedValue,
        }

        try {
            const response =
                await HTTP.post('/transaction/submitTransaction', updatedTransaction);
            console.log(response)
            Alert.alert('Submit Transaction - Succeed')
        } catch (error) {
            console.log(error)
            Alert.alert('Submit Transaction - Failed')
        }
    }

    return (
        <View style={styles.container}>
            <Text>Submit Transaction</Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
                {STATUS_VALUES.map(status => <Picker.Item key={status} label={status} value={status} />)}
            </Picker>
            <Button
                title="Submit Transaction"
                onPress={handleSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        height: 50,
        width: 200,
        marginBottom: 20,
    },
});

export default SubmitTransactionForm;