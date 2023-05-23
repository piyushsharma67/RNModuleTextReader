import React from 'react'
import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
const {width}=Dimensions.get('window')


interface IMyLoaderProps{
    loaderVisible:boolean
}
function MyLoader(props:IMyLoaderProps){
    return <Modal
    transparent
    animationType="none"
    visible={props.loaderVisible}
    onRequestClose={() => { ('close modal')}}>
    <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={props.loaderVisible}
            color="#2E9E92"
            size="large" />
          <Text style={{color:'black'}}>Please Wait!!</Text>
        </View>
    </View>
    </Modal>
}

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000020'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: 50,
      width: width*0.42,
      // borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection:'row'
    }
  });


export default MyLoader