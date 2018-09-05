import React, { Component } from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import CellSwitch from '../component/CellSwitch'
import GreenBtn from '../component/GreenBtn'
export default class AccountBind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wechat: true,
            qq: false,
            weibo: false
        }
    };
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '账号绑定',
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
    });

    _setWechat(newState){
        this.setState({wechat:newState});
    }
    _setQQ(newState){
        this.setState({qq:newState});
    }
    _setWeiBo(newState){
        this.setState({weibo:newState});
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style={styles.page}>
                <Text style={styles.cellTitle}>添加手机号</Text>
                <View style={styles.secBox}>
                    <TouchableOpacity style={styles.telBtn}  onPress={()=>navigate('TelBind')} activeOpacity={0.8}>
                        <Text style={styles.btnText}>添加手机号</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.cellTitle}>第三方账号</Text>
                <CellSwitch style={styles.mt10} label="微信"  value={this.state.wechat} callbackParent={()=>{this._setWechat()}}/>
                <CellSwitch style={styles.mt10} label="QQ"  value={this.state.qq} callbackParent={()=>{this._setQQ()}}/>
                <CellSwitch style={styles.mt10} label="微博"  value={this.state.weibo} callbackParent={()=>{this._setWeiBo()}}/>

                <GreenBtn style={styles.btnBottom} text="退出账号" onPress={()=>{alert('退出账号')}}/>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    page:{
        position:'relative',
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    },
    cellTitle:{
        fontSize:14,
        color:'#999',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:14,
    },
    mb10:{
        marginBottom:10,
        borderBottomWidth:0
    },
    btnBottom:{
        position:'absolute',
        left:'50%',
        right:0,
        bottom:30,
        translateX:-120
    },
    secBox:{
        backgroundColor:'#fff'
    },
    telBtn:{
        width:240,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#eeeeee',
        borderRadius:22,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        marginBottom:20
    },
    btnText:{
        textAlign:'center',
        color:'#333',
        fontSize:16,
    }
});

