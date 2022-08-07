import React from 'react';
import { Text, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Entypo } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';


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
}

export default function DashboardScreen(){
    return (
        <ScrollView 
        style={{flex:1,backgroundColor:"white"}}>
               <View style={{height:StatusBarHeight,backgroundColor:"#24b596"}}></View>
               <View style={{backgroundColor:"#24b596",borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                   <View style={{height:EStyleSheet.value("60rem"),justifyContent:"center",alignItems:"center"}}>
                       <Text style={{color:"white",fontSize:EStyleSheet.value("16rem"),fontWeight:"bold"}}>Signature Verification</Text>
                   </View>
               </View>
               <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem"),backgroundColor:"#f5f5f5",borderTopLeftRadius:20,borderTopRightRadius:20,marginBottom:EStyleSheet.value("50rem")}}>
                    {/* Posisi view berada ditengah halaman */}
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={{width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem"),borderRadius:EStyleSheet.value("20rem"),backgroundColor:"#24b596",justifyContent:"center",alignItems:"center"}}>
                            <Entypo name="user" size={EStyleSheet.value("24rem")} color="white" />
                        </View>
                        <View style={{marginLeft:EStyleSheet.value("20rem")}}>
                            <Text style={{color:"#24b596",fontSize:EStyleSheet.value("16rem"),fontWeight:"bold"}}>Gilbert Sihura</Text>
                            <Text style={{color:"#24b596",fontSize:EStyleSheet.value("12rem")}}>171402071</Text>
                        </View>
                    </View>
                </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                    <TouchableOpacity 
                    style={{flexDirection:"row",marginBottom:EStyleSheet.value("25rem")}}
                    onPress={async () => {
                        let result = await ImagePicker.launchCameraAsync();
                        if(!result.cancelled){
                          let form = new FormData();
                          form.append("image", {
                            uri: result.uri,
                            name: "image.jpg",
                            type: "image/jpg"
                          });
                
                          let request = await fetch(`http://153.92.4.173/klasifikasiTTD`,{
                              method:"POST",
                              body:form,
                              headers:{
                                  "Content-Type":"multipart/form-data"
                              }
                          });
                
                          let response = await request.json();
                          console.log(response);
                          if(response.success){
                            Alert.alert("Success",response.message);
                          }else{
                            Alert.alert("Error",response.message);
                          }
                        }
                          
                      }
                      }>
                        <View style={{...shadow,backgroundColor:"#24b596",height:EStyleSheet.value("120rem"),borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),width:EStyleSheet.value("100%")}}>
                            {/* Icon Kamera berada di tengah view */}
                            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                <Entypo name="camera" size={EStyleSheet.value("40rem")} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>
               </View>
                <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                    <TouchableOpacity 
                    style={{flexDirection:"row",marginBottom:EStyleSheet.value("25rem")}}
                    onPress={async () => {
                        let result = await ImagePicker.launchImageLibraryAsync();
                        if(!result.cancelled){
                          let form = new FormData();
                          form.append("image", {
                            uri: result.uri,
                            name: "image.jpg",
                            type: "image/jpg"
                          });
                
                          let request = await fetch(`http://153.92.4.173/klasifikasiTTD`,{
                              method:"POST",
                              body:form,
                              headers:{
                                  "Content-Type":"multipart/form-data"
                              }
                          });
                
                          let response = await request.json();
                          if(response.success){
                            Alert.alert("Success",response.message);
                          }else{
                            Alert.alert("Error",response.message);
                          }
                        }
                      }
                      }>
                        <View style={{...shadow,backgroundColor:"#24b596",height:EStyleSheet.value("120rem"),borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),width:EStyleSheet.value("100%")}}>
                            {/* Icon Folder berada di tengah view */}
                            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                <Entypo name="folder" size={EStyleSheet.value("40rem")} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
        </ScrollView>
    )
} 