import { Alert, PermissionsAndroid } from "react-native";
import { launchCamera } from "react-native-image-picker";
import {RNTextDetector} from '../../utils/nativeModules/RNTextDetectorModule'
import { useState } from "react";

function useCaptureImage(){

    const cameraOptions = {
        skipBackup: true,
        includeBase64: false,
        path: "images",
        mediaType: 'photp',
        saveToPhotos: false,
        quality: 1.0,
        storageOptions: {
          skipBackup: true,
          includeBase64: true,
          path: "images",
        },
    };

    const [loading,setLoading]=useState(false)
    const [data,setData]=useState({
        mobile:"",
        email:""
    })

    const [parsedData,setParsedData]=useState<{text:string}[]>([])


    const onClickImage=async ()=>{
        setLoading(true)
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                  title: "App Camera Permission",
                  message: "App needs access to your camera ",
                  buttonNeutral: "Ask Me Later",
                  buttonNegative: "Cancel",
                  buttonPositive: "OK",
                }
            );

            if(granted==='granted'){
                //@ts-ignore
                launchCamera(cameraOptions,async (response:any)=>{
                    if(response.didCancel){
                       throw new Error("Cancelled By user")
                    }else{
                        const imageUri=response.assets[0].uri
                        RNTextDetector.detectFromUri(imageUri).then((response:{text:string}[])=>{
                            const mobileNumberPattern = /^\d{10}$/;
                            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            console.log("response is",response)
                            setData(prev=>{return {
                                ...prev,mobile:"",email:''
                            }})
                            response.forEach(item=>{
                                if(mobileNumberPattern.test(item.text)){
                                    setData(prev=>{return {
                                        ...prev,mobile:item.text
                                    }})
                                }else if(item.text.includes("@")){
                                    setData(prev=>{return {
                                        ...prev,email:item.text
                                    }})
                                }
                            }
                            )
                            setParsedData(response)
                        })
                        .catch((err:any)=>{
                            setLoading(false)
                            Alert.alert("Notification",err.message)
                        })
                    }
                })
            }
            setLoading(false)
        }catch(err:any){
            setLoading(false)
            Alert.alert("Notification",err.message)
        }
    }

    return {
        onClickImage,
        data,
        loading,
        parsedData
    }
}

export default useCaptureImage