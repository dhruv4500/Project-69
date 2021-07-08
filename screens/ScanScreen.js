import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';  
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class ScanScreen extends React.Component{
    constructor(){
        super();

        this.state={
            hasCameraPermissions: null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }
    render(){
        if(this.state.buttonState==="clicked"&&this.state.hasCameraPermission===true){
            return(
             <BarCodeScanner
             onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}/>
             );
        }else if(this.state.buttonState==="normal"){
            return(
                <View>
                    <TouchableOpacity onPress={()=>{this.getCameraPermission()}}>
                    <Text>Scan QR Code</Text>
                    </TouchableOpacity>

                    <Text>{this.state.hasCameraPermission ? this.state.scannedData:"Request For the Camera Permission"}</Text>
    
                </View>
            );
        }

        getCameraPermission=async ()=>{
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            this.setState({
                hasCameraPermission:(status === 'granted'),
                buttonState:"clicked",
                scanned:false
            })
        }
    
        handleBarCodeScanned = async ({ type, data }) => {
            this.setState({
                scanned:true,
                scannedData:data,
                buttonState:"clicked",
            })
          };
    }
}