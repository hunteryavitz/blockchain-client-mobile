import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import SubmitTransactionForm from './src/components/SubmitTransactionForm';

function App() {
    const [readinessData, setReadinessData] = useState(null);
    const [readinessLoading, setReadinessLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [readinessError, setReadinessError] = useState(null);

    const [livenessData, setLivenessData] = useState(null);
    const [livenessLoading, setLivenessLoading] = useState(false);
    const [isAlive, setIsAlive] = useState(false);
    const [livenessError, setLivenessError] = useState(null);

    const [versionData, setVersionData] = useState(null);
    const [versionLoading, setVersionLoading] = useState(false);
    const [hasVersion, setHasVersion] = useState(false);
    const [versionError, setVersionError] = useState(null);

    const [verifyData, setVerifyData] = useState(null);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [verifyError, setVerifyError] = useState(null);

    const [blockData, setBlockData] = useState(null);
    const [blockLoading, setBlockLoading] = useState(false);
    const [blockAdded, setBlockAdded] = useState(false);
    const [blockError, setBlockError] = useState(null);

    const http = axios.create({
        baseURL: "http://a9d2-154-6-90-24.ngrok-free.app/api/v1",
        headers: {
            "Content-type": "application/json"
        }
    })

    useEffect(() => {
        fetchReadiness()
            .then(() => setReadinessLoading(false))
            .catch((err) => setReadinessError(err.message))
        fetchLiveness()
            .then(() => setLivenessLoading(false))
            .catch((err) => setLivenessError(err.message))
        fetchVersion()
            .then(() => setVersionLoading(false))
            .catch((err) => setVersionError(err.message))
        fetchValidation()
            .then(() => setVerifyLoading(false))
            .catch((err) => setVerifyError(err.message))

    }, []);

    const fetchReadiness = async () => {
        setReadinessLoading(true);
        setIsReady(false);
        setReadinessError(null);

        try {
            const response = await http.get('/readiness');
            if (response.data) {
                setIsReady(true);
            } else {
                setIsReady(false);
            }
            setReadinessData(response.data);
        } catch (err) {
            setReadinessError(err.message);
        } finally {
            setReadinessLoading(false);
        }
    };

    const fetchLiveness = async () => {
        setLivenessLoading(true);
        setIsAlive(false);
        setLivenessError(null);

        try {
            const response = await http.get('/liveness');
            if (response.data) {
                setIsAlive(true);
            } else {
                setIsAlive(false);
            }
            setLivenessData(response.data);
        } catch (err) {
            setLivenessError(err.message);
        } finally {
            setLivenessLoading(false);
        }
    };

    const fetchVersion = async () => {
        setVersionLoading(true);
        setHasVersion(false);
        setVersionError(null);

        try {
            const response = await http.get('/version');
            if (response.data) {
                setHasVersion(true);
            } else {
                setHasVersion(false);
            }
            setVersionData(response.data);
        } catch (err) {
            setVersionError(err.message);
        } finally {
            setVersionLoading(false);
        }
    };

    const fetchValidation = async () => {
        setVerifyLoading(true);
        setIsValid(false);
        setVerifyError(null);

        try {
            const response = await http.get('/verifyBlockchain');
            if (response.data) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
            setVerifyData(response.data);
        } catch (err) {
            setVerifyError(err.message);
        } finally {
            setVerifyLoading(false);
        }
    }

    const addBlock = async () => {
        setBlockLoading(true);
        setBlockAdded(false);
        setBlockError(null);

        try {
            const response = await http.post('/block/addBlockToBlockchain');
            if (response.data) {
                setBlockAdded(true);
            } else {
                setBlockAdded(false);
            }
            setBlockData(response.data);
        } catch (err) {
            setBlockError(err.message);
        } finally {
            setBlockLoading(false);
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Blockchain Mobile Client</Text>
            {readinessLoading && <Text>Checking Readiness...</Text> || isReady && <Text>API Ready</Text> || <Text>Awaiting Readiness Check</Text>}
            {readinessError && <Text>Error: {readinessError}</Text>}
            {readinessData && <Text>{JSON.stringify(readinessData)}</Text>}
            <Button title="Readiness Check" onPress={fetchReadiness} />
            {livenessLoading && <Text>Checking Liveness...</Text> || isAlive && <Text>API Live</Text> || <Text>Awaiting Liveness Check</Text>}
            {livenessError && <Text>Error: {livenessError}</Text>}
            {livenessData && <Text>{JSON.stringify(livenessData)}</Text>}
            <Button title="Liveness Check" onPress={fetchLiveness} />
            {versionLoading && <Text>Checking Version...</Text> || hasVersion && <Text>Version</Text> || <Text>Awaiting Version Check</Text>}
            {versionError && <Text>Error: {versionError}</Text>}
            {versionData && <Text>{JSON.stringify(versionData)}</Text>}
            <Button title="Version Check" onPress={fetchVersion} />
            {verifyLoading && <Text>Checking Blockchain...</Text> || isValid && <Text>Blockchain Valid</Text> || <Text>Awaiting Validation</Text>}
            {verifyError && <Text>Error: {verifyError}</Text>}
            {verifyData && <Text>{JSON.stringify(verifyData)}</Text>}
            <Button title="Validate Blockchain" onPress={fetchValidation} />
            {blockLoading && <Text>Adding Block...</Text> || blockAdded && <Text>Block Added</Text> || <Text>Awaiting Block</Text>}
            {blockError && <Text>Error: {blockError}</Text>}
            {blockData && <Text>{JSON.stringify(blockData)}</Text>}
            <Button title="Add Block" onPress={addBlock} />
            <SubmitTransactionForm />
        </View>
    );
}

export default App;
