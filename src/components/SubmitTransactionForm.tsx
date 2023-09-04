import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const SubmitTransactionForm = () => {

    const [selectedValue, setSelectedValue] = useState("CREATED");

    const handleSubmit = () => {
        alert('Your transaction has been submitted!');
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedValue}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Created" value="CREATED" />
                <Picker.Item label="Pending" value="PENDING" />
                <Picker.Item label="Completed" value="COMPLETED" />
                <Picker.Item label="Cancelled" value="CANCELLED" />
            </Picker>
            <Button
                title="Submit"
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