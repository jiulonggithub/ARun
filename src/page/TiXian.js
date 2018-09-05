import React,{ Component } from 'react'
import {StyleSheet,View,Text,TextInput,Image,TouchableOpacity} from 'react-native'
import GreenBtn from  '../component/GreenBtn'
import {TotalProfit} from '../requests/http'
export  default  class MyCalCalorie extends  Component{
    constructor(){
        super();
        this.state = {
            showUsername: "脚先生",
            showTel: "15201934295",
            currentType: 0,  //0支付宝  1 微信支付，
            tixianMoney: '',
            distance: "240",//  可提现金额 (72cal/公里)
            payWayList: [
                {
                    account:"1234567891011",
                    name:"山河",
                    payWay:0,
                },
                {
                    account:"1234567891011",
                    name:"山河2",
                    payWay:1,
                }
            ],
            popupShow:false
        }
    };

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '提现',
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
            headerRight: (<Text
                    style={styles.HeaderRightBtn}
                    onPress={()=> navigation.navigate('TiXianDetails')}
                >提现明细</Text>),
        }
    );
    tixianMoneyChange(e){
        this.setState({tixianMoney:e})
    }
    tixianAllMoney(){
        this.setState({tixianMoney:this.state.distance})
    }
    _renderIcon01(){
        return <Image source={require('../images/icon_alipay.png')} style={styles.payIocn01}/>
    }
    _renderIcon02(){
        return <Image source={require('../images/icon_wechatPay.png')} style={styles.payIocn01}/>
    }
    getTotalProfix(){
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
    _renderCurrentPayWay(payWap){
        if(payWap!==null){
            return <TouchableOpacity style={styles.secTopCell01} onPress={()=>{this.showSelectPopup()}}  activeOpacity={0.9}>
                <Text style={{fontSize:18}}>{this.state.payWayList[parseInt(this.state.currentType)].name}</Text>
                <Text style={{color:"#999",marginHorizontal:16}}>({this.state.payWayList[parseInt(this.state.currentType)].account.substr(0,3)+"****"+this.state.payWayList[parseInt(this.state.currentType)].account.substr(7) })</Text>
                {this.state.currentType === 0 ? this._renderIcon01() : this._renderIcon02()}
            </TouchableOpacity>
        }
    }
    toBindAccountPage(){
        this.props.navigation.navigate("SafeSetting");
    }
    selectPayWay(e){
        this.setState({currentType:e});
        this.setState({popupShow:false})
    }
    showSelectPopup(){
        this.setState({popupShow:true})
    }
    _renderPayWay(item,i){
        return (
            <TouchableOpacity style={styles.wayCell} key={i} onPress={()=>{this.selectPayWay(i)}} activeOpacity={0.9}>
                <View style={{marginRight:14}}>{parseInt(item.payWay)===0?this._renderIcon01():this._renderIcon02()}</View>
                <Text>{item.name}({item.account})</Text>
            </TouchableOpacity>
        )
    }
    componentDidMount(){
        this.getTotalProfix();
    }
    _renderPopup(show){
        if(show){
            return <View style={styles.popup}>
                <View style={styles.popupContent}>
                    <Text style={{textAlign:"center",marginTop:10}}>选择到账账号</Text>
                    {this.state.payWayList.map((item,i)=>this._renderPayWay(item,i))}
                </View>
            </View>
        }
    }
    render(){
        return <View style={styles.page}>
            <View style={styles.secTopBox}>
                <View style={styles.secTopCellBox01}>
                    <View>
                        <Text style={[styles.gray9,{marginBottom:6}]}>到账账号</Text>
                        {this._renderCurrentPayWay(this.state.currentType)}
                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={styles.secTopBtn} onPress={()=>{this.toBindAccountPage()}}>
                        <Image  source={require('../images/add-icon.png')} style={styles.iconChange}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={[styles.gray9,{marginBottom:6,marginTop:20}]}>提现金额</Text>
                    <View style={styles.cell02}>
                        <Text style={{color:"#333"}}>￥</Text>
                        <TextInput style={styles.inputText} placeholder="请输入提现金额" keyboardType="numeric" value={this.state.tixianMoney} onChangeText={(e) => this.tixianMoneyChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent'/>
                    </View>
                </View>
            </View>
            <View style={styles.secText}>
                <Text style={styles.gray9}>可提现金额{this.state.distance}￥</Text>
                <TouchableOpacity activeOpacity={0.9}  onPress={()=>{this.tixianAllMoney()}}>
                    <Text style={{color:"#1fa2f4",marginLeft:8}}>全部提现</Text>
                </TouchableOpacity>
            </View>
            <GreenBtn style={{marginTop:30}} text="提现" onPress={()=>{alert('提现')}}/>
            {this._renderPopup(this.state.popupShow)}
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
    HeaderRightBtn:{
        marginRight:14,
        color:"#fff",
        fontSize:14
    },
    gray9:{
        color:"#999",
        fontSize:15
    },
    secTopBox:{
        marginLeft:14,
        marginRight:14,
        marginTop:14,
        backgroundColor:"#fff",
        borderRadius:6,
        paddingLeft:14,
        paddingTop:20,
        paddingBottom:20
    },
    iconChange:{
        width:28,
        height:30
    },
    secTopBtn:{
        width:48,
        height:48,
        display:"flex",
        justifyContent:'center',
        alignItems:"center",
        flexDirection:'row',
        borderRadius:24,
        borderStyle:"solid",
        borderWidth:1,
        borderColor:"#eee",
        marginRight:14
    },
    payIocn01:{
        width:21,
        height:21,
    },
    secTopCell01:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    secTopCellBox01:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        borderStyle:"solid",
        borderBottomWidth:1,
        borderColor:"#eee",
        paddingBottom:20
    },
    cell02:{
        alignItems:'center',
        flexDirection:'row',
    },
    inputText:{
        flex:1,
        fontSize:30,
        color:"#333",
        textAlign:'center',
        marginRight:24
    },
    secText:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:20,
        paddingLeft:34
    },
    popup:{
        position:'absolute',
        width:"100%",
        height:"100%",
        top:0,
        left:0,
        backgroundColor:'rgba(0, 0 ,0 ,.5)'
    },
    popupContent:{
        position:'absolute',
        width:"100%",
        bottom:0,
        left:0,
        backgroundColor:"#fff"
    },
    payWayIcon:{
        width:20,
        height:20
    },
    wayCell:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:20,
        paddingVertical:20,
        borderStyle:"solid",
        borderBottomWidth:1,
        borderColor:"#eee"
    }
});