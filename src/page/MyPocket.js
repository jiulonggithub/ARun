import React,{ Component } from 'react'
import {StyleSheet,View,Text,TextInput,Image,TouchableOpacity} from 'react-native'
import GreenBtn from  '../component/GreenBtn'
import { StackNavigator} from 'react-navigation';

export  default  class MyPocket extends  Component{
    constructor(props){
        super(props);
        this.state = {
            tixianMoney:"200",
            cal:5420
        }
    }

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '我的钱包',
            headerStyle:{
                backgroundColor:'#3c3a3f',
                height:44,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:18
            },
            headerTintColor:'#fff'
        }
    )

    

    render(){
        const { navigate } = this.props.navigation;
        return <View style={styles.page}>
            <Text style={styles.title}>总资产里</Text>
            <Text style={styles.text}>可提现{this.state.tixianMoney}元</Text>
            <View style={styles.totalBox}>
                <Text style={styles.totalText}>
                    {this.state.cal}
                    <Text style={styles.cal}>  cal</Text>
                </Text>
            </View>
            <GreenBtn text="提现" onPress={()=>navigate('MyCalCalorie')}/>
            <TouchableOpacity style={styles.profit}  onPress={()=>navigate('MyProfit')} activeOpacity={0.8}>
                <Text style={styles.profitText}>收益</Text>
            </TouchableOpacity>
            <View style={styles.protocolBox}>
                <Text style={styles.protocolText} onPress={()=>{alert("协议")}}>{'《Arun卡路里协议》'}</Text>
            </View>
        </View>
    }
}
const styles = StyleSheet.create({
    page:{
        position:"relative",
        width:"100%",
        height:"100%",
        backgroundColor:'#fff'
    },
    title:{
        fontSize:18,
        color:"#333",
        marginLeft:14,
        marginTop:20,
        marginBottom:10
    },
    text:{
        marginLeft:14,
        fontSize:14,
        color:"#999"
    },
    totalBox:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        marginTop:60,
        marginBottom:90
    },
    totalText:{
        fontSize:40,
        fontWeight:'800',
        color:"#333"
    },
    cal:{
        fontSize:14,
        fontWeight:'normal',
        color:"#666",
        marginLeft:10
    },
    profit:{
        width:240,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:22,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        borderStyle:"solid",
        borderWidth:2,
        borderColor:"#20dc74",
    },
    profitText:{
        textAlign:'center',
        color:'#20dc74',
        fontSize:16,
    },
    protocolText:{
        textAlign:'center',
    },
    protocolBox:{
        width:'100%',
        position:'absolute',
        bottom:30,
        alignItems:"center"
    }
});