import React,{ Component } from 'react'
import {StyleSheet,View,Text,ScrollView,ToastAndroid} from 'react-native'
import {myProfit,TotalProfit} from '../requests/http'
export  default  class MyCalCalorie extends  Component{
    constructor(){
        super();
        this.state = {
            profitList:[
                /*{id:0,dateTime:"2017-11-26",cal:"500"},
                {id:1,dateTime:"2017-11-27",cal:"800"}*/
                {
                    "raw_data": 4,
                    "created_at": "2017-12-19 00:00:00"
                },
                {
                    "raw_data": 8,
                    "created_at": "2017-12-18 00:00:00"
                }
            ],
            totalProfit:0
        }
    }

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '我的收益',
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

    __renderItem(item,i){
        return <View style={styles.cellWrapper} key={i}>
            <View style={styles.cellItem}>
                <Text style={styles.dateTime}>{item.created_at.split(" ")[0]}</Text>
                <Text style={styles.cal}>{item.raw_data}cal</Text>
            </View>
        </View>
    }
    getTotalProfix(){
        let self = this;
        TotalProfit().then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                self.setState({totalProfit:res.data.data[0].total_returns})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    componentDidMount(){
        this.getTotalProfix();
        this.getMyProfit();
    }
    getMyProfit(){
        let self = this;
        myProfit().then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                self.profitList = res.data.data;
            }else {
                ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    render(){
        return <View style={styles.page}>
            <View style={styles.secTopBox}>
                <Text style={styles.topTitle}>总资产</Text>
                <View style={styles.TopCell}>
                    <Text style={{fontSize:50,color:"#333"}}>{this.state.totalProfit}<Text style={{fontSize:18}}>  cal</Text></Text>
                    <Text style={{fontSize:15,color:"#999"}}>可提现{this.state.totalProfit}元</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewBox}>
                {this.state.profitList.map((item,i)=>this.__renderItem(item,i))}
            </ScrollView>
        </View>
    }
}
const styles = StyleSheet.create({
    page:{
        position:"relative",
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    },
    secTopBox:{
        backgroundColor:'#fff',
        marginBottom:8,
        paddingHorizontal:14,
        paddingVertical:14
    },
    topTitle:{
       fontSize:18,
       color:"#333",
       marginBottom:10
    },
    TopCell:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
    },
    scrollViewBox:{
        backgroundColor:'#fff'
    },
    cellItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:14,
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderStyle:'solid',
        borderColor:"#eee"
    },
    cellWrapper:{
        width:"100%",
        backgroundColor:"#fff",
    },
    dateTime:{
        fontSize:15,
        color:"#666"
    },
    cal:{
        fontSize:14,
        color:"#333",
        marginRight:16
    }
});