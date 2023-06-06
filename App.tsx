import React from 'react'
import { Button, StyleSheet,  Text,  View } from 'react-native'
import useCaptureImage from './src/hooks/useCaptureImage';
import MyLoader from './src/Components/loader/Loader';

function App(){

  const {onClickImage,data,loading,parsedData}=useCaptureImage()

  console.log("dsdas")

  return (
    <View style={style.container}>
      <MyLoader loaderVisible={loading}/>
      <Button 
        title='Click me to Open Camera'
        onPress={onClickImage}
      />
      <Text style={style.text}>Email : {data.email}</Text>
      <Text style={style.text}>Mobile : {data.mobile}</Text>

        {parsedData && <View style={style.parsedDataContainer}>
          <Text style={style.text}>Parsed Data is:</Text>
          {parsedData.map((item,index)=>{
            return <Text key={index} style={style.text}>{item.text}</Text>
          })}
          </View>}
      </View>
  )
}

const style=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  text:{
    fontSize:14,
    color:'black'
  },
  parsedDataContainer:{
    margin:10,

  }
})

export default App