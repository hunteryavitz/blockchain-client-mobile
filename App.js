import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [blockData, setBlockData] = useState(null);
    const [blockLoading, setBlockLoading] = useState(true);
    const [blockError, setBlockError] = useState(null);

    const http = axios.create({
        baseURL: "http://a9d2-154-6-90-24.ngrok-free.app/api/v1",
        headers: {
            "Content-type": "application/json"
        }
    })

    useEffect(() => {
        fetchData()
            .then(() => setLoading(false))
            .catch((err) => setError(err.message))
            .finally(() => console.log('useEffect done'))
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await http.get('/readiness');
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addBlock = async () => {
        setBlockLoading(true);
        setBlockError(null);

        try {
            const response = await http.post('/block/addBlockToBlockchain');
            setBlockData(response.data);
        } catch (err) {
            setBlockError(err.message);
        } finally {
            setBlockLoading(false);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading && <Text>Getting Readiness Check...</Text>}
            {error && <Text>Error: {error}</Text>}
            {data && <Text>{JSON.stringify(data)}</Text>}
            <Button title="Readiness Check" onPress={fetchData} />

            {blockLoading && <Text>Adding Block...</Text>}
            {blockError && <Text>Error: {blockError}</Text>}
            {blockData && <Text>{JSON.stringify(blockData)}</Text>}
            <Button title="Add Block" onPress={addBlock} />
        </View>
    );
}

export default App;
