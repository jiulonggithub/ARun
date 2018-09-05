import React,{ Component } from 'react'
import {StyleSheet ,View,Text ,Image,TouchableOpacity} from 'react-native'
import RegisterBtn from '../component/registerBtn'

let loginTitle = require('../images/login_title.png');
let wechatIcon = require('../images/wechat_icon.png');
let qqIcon = require('../images/qq_icon.png');
let weiboIcon = require('../images/weibo_icon.png');

export default class LoginSelect extends Component{
    constructor(){
        super();
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    TapWechatLogin(e){
        alert("微信登录");
    }
    TapQQLogin(e){
        alert("QQ登录");
    }
    TapWeiBoLogin(e){
        alert("微博登录");
    }
    render(){
        const { navigate } = this.props.navigation;
        return <View style={styles.loginPage}>
            <Image source={loginTitle} style={styles.loginTitle}/>
            {/*<Button onPress = {() => navigate('Home')} title="按钮" />*/}
            <TouchableOpacity style={styles.btn}   onPress = {() => navigate('LoginPage')} activeOpacity={0.8}>
                <Text style={styles.btnText}>手机号登录</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.grayBtn} onPress={(e) => this.TapWechatLogin(e)} activeOpacity={0.8}>
                <Image source={wechatIcon} style={styles.wechatIcon}/>
                <Text style={styles.btnText}>微信登录</Text>
            </TouchableOpacity>
            <View style={styles.grayBtn} >
                <TouchableOpacity activeOpacity={0.8} onPress={(e) => this.TapQQLogin(e)}>
                    <Image source={qqIcon} style={styles.qqIcon}/>
                </TouchableOpacity>
                <Text style={styles.whiteLine}>|</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={(e) => this.TapWeiBoLogin(e)}>
                    <Image source={weiboIcon} style={styles.weiboIcon}/>
                </TouchableOpacity>
            </View>
            <RegisterBtn title="立即注册" tapRegist = {() => navigate('RegisterPage')} />
        </View>
    }
}
const styles = StyleSheet.create({
    loginPage:{
        position:'relative',
        height:'100%',
        backgroundColor:'#171a21'
    },
    loginTitle:{
        width: 160,
        height: 43,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:60,
        marginBottom:20
    },
    btnText:{
        fontSize: 16,
        color: '#fff',
    },
    btn:{
        width:220,
        height:40,
        backgroundColor:'#20dc74',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:60,
        marginBottom:60
    },
    grayBtn:{
        display:'flex',
        flexDirection:"row",
        width:220,
        height:40,
        backgroundColor:'#13161c',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:16,
    },
    wechatIcon:{
        width:18,
        height:15,
        marginRight:10
    },
    qqIcon:{
        width:16,
        height:18,
    },
    weiboIcon:{
        width:19,
        height:16,
    },
    whiteLine:{
        fontSize:12,
        fontWeight:'bold',
        color:'#fff',
        marginLeft:60,
        marginRight:60
    }
});