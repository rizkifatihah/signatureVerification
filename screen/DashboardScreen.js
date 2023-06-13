import React, { useState, useContext } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { GlobalContext } from '../App';

import { StatusBarHeight } from '../utils/HeightUtils';

let shadow = {
  shadowColor: "grey",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0,
  shadowRadius: 0,

  elevation: 3,
};

export default function DashboardScreen() {
  const globalContext = useContext(GlobalContext);
  const [ip, setIp] = useState(globalContext.perangkat);
  const [isIpModalVisible, setIsIpModalVisible] = useState(false);
  const [enteredIp, setEnteredIp] = useState('');

  const handleIpPress = () => {
    setIsIpModalVisible(true);
  };

  const handleIpModalSubmit = () => {
    setIsIpModalVisible(false);
    setIp(enteredIp);
    globalContext.setPerangkat(enteredIp);
  };

  const handleCameraPress = async () => {
    if (ip === null) {
        alert("Silahkan masukkan endpoint terlebih dahulu")
        return;
    }
    let status = await ImagePicker.requestCameraPermissionsAsync();
    if (status.granted === false) {
      Alert.alert("Error", "Permission to access camera is required");
      return;
    }
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      let form = new FormData();
      form.append("image", {
        uri: result.uri,
        name: "image.jpg",
        type: "image/jpg"
      });

      let request = await fetch(ip + "/classificationHandsign", {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      let response = await request.json();
      console.log(response);
      if (response.success) {
        Alert.alert("Success", response.text);
      } else {
        Alert.alert("Error", response.text);
      }
    }
  };

  const handleImageLibraryPress = async () => {
    if (ip === null) {
        alert("Silahkan masukkan endpoint terlebih dahulu")
        return;
    }
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      let form = new FormData();
      form.append("image", {
        uri: result.uri,
        name: "image.jpg",
        type: "image/jpg"
      });

      let request = await fetch(ip + "/classificationHandsign", {
        method: "POST",
        body: form,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      let response = await request.json();
      if (response.success) {
        Alert.alert("Success", response.text);
      } else {
        Alert.alert("Error", response.text);
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: StatusBarHeight, backgroundColor: "#24b596" }}></View>
      <View style={{ backgroundColor: "#24b596", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <View style={{ height: EStyleSheet.value("60rem"), justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: EStyleSheet.value("16rem"), fontWeight: "bold" }}>Signature Verification</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: EStyleSheet.value("20rem"), paddingVertical: EStyleSheet.value("20rem"), backgroundColor: "#f5f5f5", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: EStyleSheet.value("50rem") }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: EStyleSheet.value("40rem"), height: EStyleSheet.value("40rem"), borderRadius: EStyleSheet.value("20rem"), backgroundColor: "#24b596", justifyContent: "center", alignItems: "center" }}>
            <Entypo name="user" size={EStyleSheet.value("24rem")} color="white" />
          </View>
          <View style={{ marginLeft: EStyleSheet.value("20rem") }}>
            <Text style={{ color: "#24b596", fontSize: EStyleSheet.value("16rem"), fontWeight: "bold" }}>Gilbert Sihura</Text>
            <Text style={{ color: "#24b596", fontSize: EStyleSheet.value("12rem") }}>171402071</Text>
            {ip === null ? (
              <TouchableOpacity onPress={handleIpPress}>
                <Text style={{ color: "#24b596", fontSize: EStyleSheet.value("12rem"), fontWeight: "bold" }}>Masukkan Endpoint</Text>
              </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleIpPress}>
                    <Text style={{ color: "#24b596", fontSize: EStyleSheet.value("12rem"), fontWeight: "bold" }}>{ip}</Text>
                </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: EStyleSheet.value("20rem"), paddingVertical: EStyleSheet.value("20rem") }}>
        <TouchableOpacity style={{ flexDirection: "row", marginBottom: EStyleSheet.value("25rem") }} onPress={handleCameraPress}>
          <View style={{ ...shadow, backgroundColor: "#24b596", height: EStyleSheet.value("120rem"), borderRadius: EStyleSheet.value("5rem"), padding: EStyleSheet.value("10rem"), width: EStyleSheet.value("100%") }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Entypo name="camera" size={EStyleSheet.value("40rem")} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: EStyleSheet.value("20rem"), paddingVertical: EStyleSheet.value("20rem") }}>
        <TouchableOpacity style={{ flexDirection: "row", marginBottom: EStyleSheet.value("25rem") }} onPress={handleImageLibraryPress}>
          <View style={{ ...shadow, backgroundColor: "#24b596", height: EStyleSheet.value("120rem"), borderRadius: EStyleSheet.value("5rem"), padding: EStyleSheet.value("10rem"), width: EStyleSheet.value("100%") }}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Entypo name="folder" size={EStyleSheet.value("40rem")} color="white" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Modal isVisible={isIpModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Masukkan Endpoint</Text>
          <TextInput
            style={styles.modalInput}
            value={enteredIp}
            onChangeText={setEnteredIp}
            placeholder="Endpoint"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleIpModalSubmit}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setIsIpModalVisible(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = EStyleSheet.create({
    // Add your style definitions for the modal here
    modalContainer: {
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
    modalInput: {
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    modalButton: {
      backgroundColor: "#24b596",
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    modalButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });