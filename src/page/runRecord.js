import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native'

export  default  class runRecord extends  Component{
    constructor(){
        super();
        this.state = {
            strangers:80,
            friends:2,
            cal:1540,
            mile:'82"01',
            time:'01:12:47',
            people:23
        }
    }

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '跑步成绩',
            headerStyle:{
                backgroundColor:'#171a21',
                height:44,
                elevation: 0,
                shadowOpacity: 0,
                
            },
            headerTitleStyle:{
                fontSize:18
            },
            headerTintColor:'#fff',
            headerRight: (<Image source={require('../images/icon_fire.png')} style={{width:17,height:20,marginRight:16}}/>),
            headerLeft: (<TouchableOpacity>
                <Image source={require('../images/icon_x.png')} style={{width:14,height:14,marginLeft:16}}/>
            </TouchableOpacity>)
        }
    )

    onPressBack(){
        alert('返程')
    }

    onPressShare(){
        alert('分享')
    }

    render(){
        return (
            <View style={styles.page}>
                <Text style={styles.textTop}>本次运动你错过了 {this.state.strangers} 可能相遇的陌生人,却获得了 {this.state.friends} 个好朋友</Text>
                <Text style={styles.textBottom}>本次卡路里</Text>
                <View style={styles.totalBox}>
                    <Text style={styles.totalText}>
                        {this.state.cal}
                        <Text style={styles.cal}>  cal</Text>
                    </Text>
                </View>
                <View style={styles.viewForIcon}>
                    <Image source={require('../images/icon_mile.png')} style={{width:15,height:14}}/>
                    <Image source={require('../images/icon_time.png')} style={{width:15,height:14}}/>
                    <Image source={require('../images/icon_strangers.png')} style={{width:14,height:14}}/>
                </View>
                <View style={styles.viewForNum}>
                    <Text style={styles.num}>{this.state.mile}</Text>
                    <Text style={styles.num}>{this.state.time}</Text>
                    <Text style={styles.num}>{this.state.people}</Text>
                </View>
                <View style={styles.viewForBotton}>
                    <TouchableOpacity style={styles.btn1} onPress={()=>{this.onPressBack()}}>
                        <Text style={styles.btnText1}>返程</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2} onPress={()=>{this.onPressShare()}}>
                        <Text style={styles.btnText2}>分享</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.lazy}>偷懒一下，马上回家</Text>
                <View>
                    <View style={styles.viewForTransport}>
                       <View style={{width:56,height:56,borderRadius:28,backgroundColor:'#292c32',marginLeft:28}}>
                            <TouchableOpacity>
                                <Image source={require('../images/icon_bike.png')} style={{width:20,height:15,marginLeft:17,marginTop:19}}/>
                            </TouchableOpacity>
                       </View>
                        <View style={{width:56,height:56,borderRadius:28,backgroundColor:'#292c32'}}>
                            <TouchableOpacity>
                                <Image source={require('../images/icon_taxi.png')} style={{width:20,height:20,marginLeft:18,marginTop:18}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:56,height:56,borderRadius:28,backgroundColor:'#292c32',marginRight:28}}>
                           <TouchableOpacity>
                                <Image source={require('../images/icon_bus.png')} style={{width:18,height:18,marginLeft:19,marginTop:19}}/>
                           </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        position:"relative",
        width:"100%",
        height:"100%",
        backgroundColor:'#171a21',
        paddingLeft:16,
        paddingRight:16,
    },
    textTop:{
        lineHeight:28,
        fontSize:16,
        color:'#fff',
        marginTop:7
    },
    textBottom:{
        lineHeight:30,
        color:'#555',
        fontSize:16
    },
    totalBox:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:20,
        marginBottom:34
    },
    totalText:{
        fontSize:40,
        fontWeight:'800',
        color:"#fff"
    },
    cal:{
        fontSize:14,
        fontWeight:'normal',
        color:"#fff",
        marginLeft:10
    },
    viewForIcon:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginLeft:45,
        marginRight:45,
    },
    viewForNum:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginLeft:31,
        marginRight:44,
        marginTop:14
    },
    num:{
        fontSize:20,
        color:'#666'
    },
    viewForBotton:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginTop:56
    },
    btn1:{        
        width:160,
        height:44,
        backgroundColor:'#171a21',
        borderWidth:2,
        borderColor:'#20dc74',
        borderRadius:80,
        justifyContent:'center',
        alignItems:'center'

    },
    btnText1:{
        fontSize:18,
        color:'#fff'
    },
    btn2:{
        width:160,
        height:44,
        backgroundColor:'#20dc74',
        borderRadius:80,
        justifyContent:'center',
        alignItems:'center'

    },
    btnText2:{
        fontSize:18,
        color:'#fff'
    },
    lazy:{
        fontSize:16,
        color:'#fff',
        width:158,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:36,
    },
    viewForTransport:{
        flexDirection:"row",
        justifyContent:'space-between',
        marginTop:32
    }
})