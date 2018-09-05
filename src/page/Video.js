import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity, ScrollView,} from 'react-native'
import GreeenBtn from '../component/GreenBtn'


export  default  class Video extends  Component{
    constructor(props){
        super(props);
        this.state = {


        }
    }

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '视频认证',
            headerStyle:{
                backgroundColor:'#3c3a3f',
                height:44,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:18
            },
            headerTintColor:'#fff',

        }
    )

    render(){
        return(
            <ScrollView>
                <View style={styles.page}>
                    <Image source={require('../images/bg.png')} style={{width:'100%',height:'100%',position:'absolute'}}/>
                    <View style={styles.fff}>
                        <View style={styles.circle}>
                            <Image source={require('../images/icon_v.png')} style={{width:150,height:166}}/>
                        </View>                    
                    </View>
                    <Text style={styles.text}>视频认真更加真实，让交友更叫真诚</Text>
                    <GreeenBtn text='开启视频认证' onPress={() =>alert('认证')} style={{marginBottom:49}}/>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#171a21',
        justifyContent:"flex-start",
        alignItems:"center",
        position:'relative',
    },
    fff:{
        width:279,
        height:341,
        backgroundColor:'#fff',
        borderRadius:12,
        justifyContent:"center",
        alignItems:"center",
        marginTop:48
    },
    circle:{
        width:200,
        height:200,
        backgroundColor:'#f96864',
        borderRadius:200,
        justifyContent:"flex-end",
        alignItems:"center",
    },
    text:{
        fontSize:14,
        color:'#fff',
        marginTop:38,
        marginBottom:42
    }
})
