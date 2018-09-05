import React,{ Component } from 'react'
import {StyleSheet,View,Text,TextInput,Image,TouchableOpacity} from 'react-native'
import GreenBtn from  '../component/GreenBtn'
import { TotalProfit } from '../requests/http';

export  default  class MyCalCalorie extends  Component{
    constructor(){
        super();
        this.state = {
            distance:0  //一公里72  cal
        }
    }

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '我的卡路里',
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
    );


    componentDidMount(){
        this.getMyCal()
    }

    getMyCal(){
        let self = this;
        TotalProfit().then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                self.setState({distance:res.data.data[0].total_returns})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    toTiXian(){
        this.props.navigation.navigate('TiXian');
    }
    toMyProfit(){
        this.props.navigation.navigate('MyProfit');
    }

    render(){
        return <View style={styles.page}>
            <Text style={styles.title}>总卡路里</Text>
            <Text style={styles.text}>可提现{this.state.distance}元</Text>
            <View style={styles.totalBox}>
                <Text style={styles.totalText}>
                    {this.state.distance*72}
                    <Text style={styles.cal}>cal</Text>
                </Text>
            </View>
            <GreenBtn text="提现" onPress={()=>{this.toTiXian()}}/>
            <TouchableOpacity style={styles.profit}  onPress={()=>{this.toMyProfit()}} activeOpacity={0.8}>
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