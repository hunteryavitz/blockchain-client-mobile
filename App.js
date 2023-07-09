import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Header} from "react-native/Libraries/NewAppScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blockchain Mobile Client</Text>
      <Text style={styles.body}>This client serves as the mobile component for the blockchain project.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue'
  },
  body:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
  }
});
