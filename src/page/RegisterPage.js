import React,{ Component } from 'react'
import {StyleSheet,View,Text,TextInput,Image,TouchableOpacity,ToastAndroid} from 'react-native'
import RegisterBtn from '../component/registerBtn'
import { registerTelCode,register } from '../requests/http'
let loginTitle = require('../images/login_title.png');

export default class RegisterPage extends Component{
    constructor(){
        super();
        this.state = {
            username: '15201934295',
            password: '',
            code:'',
            getCodeFlag:true,
            getCode:"获取",
        };
        this.count = 60;
        this.timer = 0
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    usernameChange(e) {
        this.setState({
            username: e
        })
    }
    passwordChange(e) {
        this.setState({
            password: e
        })
    }
    codeChange(e) {
        this.setState({
            code: e
        })
    }
    getCode(e){
        let self = this;
        // alert(this.state.username);
        if(this.validMobile(this.state.username) ){
            if(this.state.getCodeFlag){
                //发送短信验证码后倒计时
                let _data = {
                    phone: this.state.username.trim()
                };
                registerTelCode(_data).then((res)=>{
                    console.log(res.data);
                    if(parseInt(res.data.errcode) === 0){
                        ToastAndroid.show('发送成功!', ToastAndroid.SHORT);
                        self.setState({getCodeFlag:false});
                        self.count--;
                        self.setState({getCode:self.count+"s"});
                        self.jishi();
                    }else {
                        alert(res.data.msg);
                    }
                }).catch((err)=>{
                    console.log(err);
                })

            }
        }
    }
    jishi() {
        let self = this;
        self.timer = setInterval(()=> {
            if(self.count === 1){
                self.timer && clearTimeout(self.timer);
                self.setState({getCode:'获取'});
                self.setState({getCodeFlag:true});
                self.count = 60;
            }else {
                self.count--;
                self.setState({getCode:self.count+"s"});
            }
        },1000)
    }

    TapSubmit(e){
        let self = this;
        if(this.validMobile(this.state.username) && this.validYzm(this.state.code) && this.validPwd(this.state.password) ){
            let _data = {
                username: self.state.username,
                password: self.state.password,
                code: self.state.code,
            };
            register(_data).then((res)=>{
                console.log(res);
                if(parseInt(res.data.errcode)===0){
                    ToastAndroid.show('注册成功!', ToastAndroid.SHORT);
                    setTimeout(()=>{
                        const { goBack } = this.props.navigation;
                        if(goBack){
                            goBack();
                        }
                    },800)
                }else {
                    ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
    validMobile(tel){
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(tel.trim())){
            alert('请输入有效的手机号码！');
            return false;
        }
        return true;
    }
    validPwd(pwd){
        if(pwd.trim().length > 0){
            return true;
        }else {
            alert('请输入密码！');
            return false
        }
    }
    validYzm(code){
        if(code.trim().length> 0){
            return true;
        }else {
            alert('请输入短信验证码！');
            return false
        }
    }
    componentDidMount (){
        /*storage.load({key:'userInfo'}).then((res)=>{
            alert(res.age);
        });*/
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render(){
        const { navigate } = this.props.navigation;
        return <View style={styles.loginPage}>
            <Image source={loginTitle} style={styles.loginTitle}/>
            <View style={styles.titleNavs} >
                <TouchableOpacity activeOpacity={1}>
                    <Text style={[styles.navText,styles.activeNav]}>注册</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={styles.inputText} placeholder="请输入手机号" keyboardType="numeric" value={this.state.username} onChangeText={(e) => this.usernameChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={11}/>

            <View style={styles.codeBox}>
                <TextInput style={styles.inputCode} placeholder="请输入验证码" keyboardType="numeric" onChangeText={(e) => this.codeChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={6}/>
                <TouchableOpacity  onPress={(e)=>{this.getCode(e)}} activeOpacity={0.8}  >
                    <Text style={styles.getCode} >{this.state.getCode}</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:20}}>
                <TextInput style={styles.inputText} placeholder="请输入密码" onChangeText={(e) => this.passwordChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' secureTextEntry={true}/>
            </View>
            <TouchableOpacity style={styles.btn} onPress = {(e) => this.TapSubmit(e)} activeOpacity={0.8}  >
                <Text style={styles.btnText}>注册</Text>
            </TouchableOpacity>
            <RegisterBtn title="马上登录" tapRegist = {() => navigate('LoginPage')} />
        </View>
    }
}
const styles = StyleSheet.create({
    loginPage:{
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
    inputText:{
        width:300,
        paddingLeft:10,
        padding: 0,
        height:40,
        marginLeft:'auto',
        marginRight:'auto',
        color:"white",
        backgroundColor:'#13161c',
    },

    btnText:{
        fontSize: 16,
        color: '#fff',
    },
    btn:{
        width:300,
        height:40,
        backgroundColor:'#20dc74',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
    },
    forgetBtn:{
        width:300,
        height:40,
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20,
        flexDirection:"row-reverse",
    },
    titleNavs:{
        width:300,
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30,
        marginBottom:30
    },
    navText:{
        color:'#bbb',
        fontSize:14
    },
    activeNav:{
      color:'#20dc74'
    },
    whiteLine:{
        fontSize:12,
        fontWeight:'300',
        color:'#fff',
        marginLeft:14,
        marginRight:14
    },
    codeBox:{
        width:300,
        height:40,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection:"row",
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:20
    },
    inputCode:{
        width:200,
        height:40,
        paddingLeft:10,
        padding: 0,
        color:'#fff',
        backgroundColor:'#13161c',
    },
    getCode:{
        color:"#bbb",
        width:80,
        paddingTop:10,
        paddingBottom:10,
        textAlign:'center',
        backgroundColor:'#292c32',
        borderRadius:20,
    }
});