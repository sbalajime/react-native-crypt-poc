/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { RSA } from 'react-native-rsa-native';
 

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      encryptedMessage:'', 
      keys:{},
      decryptedMessage:''
    }
  }
  componentDidMount(){
    let message = "my secret message";
 
    RSA.generateKeys(4096) // set key size
    .then(keys => {
      this.setState({keys});
        console.log('4096 private:', keys.private); // the private key
        console.log('4096 public:', keys.public); // the public key
        RSA.encrypt(message, keys.public)
        .then(encodedMessage => {
            console.log(`the encoded message is ${encodedMessage}`);
            this.setState({encryptedMessage:encodedMessage});
            RSA.decrypt(encodedMessage, keys.private)
            .then(decryptedMessage => {
              this.setState({decryptedMessage});
                console.log(`The original message was ${decryptedMessage}`);
            });
        });
    })
  }
 render(){
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Encrypted:{this.state.encryptedMessage}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Keys: {JSON.stringify(this.state.keys)}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Decrypted:{this.state.decryptedMessage}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
          }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
