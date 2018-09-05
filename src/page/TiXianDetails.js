import React,{ Component } from 'react'
import {StyleSheet,View,Text,FlatList,ToastAndroid,Image} from 'react-native'
export  default  class MyCalCalorie extends  Component{
    constructor(){
        super();
        this.state = {
            profitList:[
                {id:0,dateTime:"2017-11-26",money:"240",uname:"脚先生",tel:"15201934295",type:0},
                {id:1,dateTime:"2017-11-26",money:"240",uname:"脚先生",tel:"15201934295",type:1},
            ],
            refreshing:false
        }
    }
    _flatList;
    _keyExtractor = (item, index) => item.id;
    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '提现明细',
            headerStyle:{
                backgroundColor:'#3c3a3f',
                height:44,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:18,
                alignSelf:'center',
            },
            headerTintColor:'#fff',
            headerRight: (<Text onPress={()=>{}}/>),
        }
    )
    refreshing(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            // ToastAndroid.show('刷新成功', ToastAndroid.SHORT);
        },1000)
    }
    _onload(){
        let timer2 =  setTimeout(()=>{
            clearTimeout(timer2);
            // ToastAndroid.show('加载成功', ToastAndroid.SHORT);
        },1000)
    }
    _separator = () => {
        return <View style={{height:2}}>

        </View>;
    }
    _renderIcon01(){
        return <Image source={require('../images/icon_alipay.png')} style={styles.payIocn01}/>
    }
    _renderIcon02(){
        return <Image source={require('../images/icon_wechatPay.png')} style={styles.payIocn01}/>
    }

    _renderItem = ({item}) => (
        <View style={styles.cellWrapper}>
            <Text style={styles.cellTitle}>{item.dateTime}</Text>
            <View style={styles.cellItem}>
                <View style={styles.cellTop01}>
                    <Text style={styles.gray9}>到账账号</Text>
                    <View style={styles.secTopCell01}>
                        <Text style={{fontSize:18,color:"#333"}}>{item.uname}</Text>
                        <Text style={{color:"#999",marginHorizontal:16}}>({item.tel})</Text>
                        {item.type === 0 ? this._renderIcon01() : this._renderIcon02()}
                    </View>
                </View>
                <Text style={[styles.gray9,{marginVertical:10}]}>提现金额</Text>
                <Text style={{textAlign:"center",fontSize:24,color:"#333"}}>{item.money}<Text style={{fontSize:14}}>￥</Text></Text>
            </View>
        </View>
    );

    render(){
        return <FlatList style={styles.page}
                ref={(flatList)=>this._flatList = flatList}
                data={this.state.profitList}
                initialNumToRender={10}
                ItemSeparatorComponent={this._separator}
                onRefresh={this.refreshing}
                refreshing={this.state.refreshing}
                onEndReachedThreshold={0.1}
                onEndReached={
                    this._onload
                }
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
    }
}
const styles = StyleSheet.create({
    page:{
        position:"relative",
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    },
    cellItem:{
        marginLeft:14,
        marginRight:14,
        flex:1,
       /* flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',*/
        backgroundColor:"#fff",
        borderRadius:6,
        paddingTop:16,
        paddingLeft:16,
        paddingBottom:16,
    },
    cellWrapper:{
        width:"100%",
    },
    cellTitle:{
        paddingLeft:14,
        paddingVertical:10
    },
    cellTop01:{
        borderBottomWidth:1,
        borderStyle:"solid",
        borderColor:"#eee"
    },
    secTopCell01:{
        // justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingBottom:18
    },
    payIocn01:{
        width:21,
        height:21,
    },
    gray9:{
        color:"#999",
        fontSize:15,
        marginBottom:10
    },

});