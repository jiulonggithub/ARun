import React, { Component } from 'react';
import {View, StyleSheet,Text,TextInput,TouchableOpacity,ToastAndroid} from 'react-native';
import GreenBtn from '../component/GreenBtn'
import { thirdBoundCode } from '../requests/http'

export default class TelBind extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel: '',
            code: '',
            password:'',
            getCodeFlag:true,
            getCode:"获取验证码",
        };
        this.count = 60;
        this.timer = 0
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


    telChange(text){
        this.setState({tel:text});
    }
    codeChange(text){
        this.setState({code:text});
    }

    passwordChange(text){
        this.setState({password:text});
    }

    getCode(e){
        let self = this;
        // alert(this.state.username);
        if(this.validMobile(this.state.tel) ){
            if(this.state.getCodeFlag){
                //发送短信验证码后倒计时
                let _data = {
                    phone: this.state.tel.trim()
                };
                thirdBoundCode(_data).then((res)=>{
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
        if(this.validMobile(this.state.tel) && this.validYzm(this.state.code) && validPassword(this.state.password)){
            let _data = {
                telephone:this.state.tel,
                password:this.state.password,
                code:this.state.code,
            };
            thirdBoundPhone(_data).then((res)=>{
                console.log(res.data);
                ToastAndroid.show('绑定成功!', ToastAndroid.SHORT);
                
            }).catch((err)=>{
                console.log(err)
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
    validYzm(code){
        if(code.trim().length> 0){
            return true;
        }else {
            alert('请输入短信验证码！');
            return false
        }
    }
    validPassword(code){
        if(code.trim().length> 0){
            return true;
        }else {
            alert('请输入密码！');
            return false
        }
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.secBox}>
                    <View style={styles.cellInput}>
                        <View style={styles.label}>
                            <Text>手机号</Text>
                            <Text style={{marginLeft:10}}>+86</Text>
                        </View>
                        <TextInput style={styles.inputTel} placeholder="" keyboardType="numeric" value={this.state.tel} onChangeText={(e) => this.telChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={11}/>
                    </View>
                    <View style={styles.cellInput}>
                        <View style={[styles.label,{flex:1}]}>
                            <Text>验证码</Text>
                            <TextInput style={styles.inputCode} placeholder="请输入验证码" keyboardType="numeric" onChangeText={(e) => this.codeChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={6}/>
                        </View>
                        <TouchableOpacity style={[styles.getBtn,this.state.getCodeFlag ? "":styles.gray ]}  onPress={()=>{this.getCode()}} activeOpacity={0.8}>
                            <Text style={styles.btnText}>{this.state.getCode}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cellInput}>
                        <View style={[styles.label,{flex:1}]}>
                            <Text>密    码</Text>
                            <TextInput style={styles.inputCode} placeholder="请输入密码"  onChangeText={(e) => this.passwordChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent'/>
                        </View>
                    </View>
                </View>
                <GreenBtn style={{marginTop:40}} text="确认" onPress={()=>{this.TapSubmit()}}/>
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
    secBox:{
        width:"100%",
        backgroundColor:'#fff'
    },
    cellInput:{
        marginLeft:14,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderStyle:"solid",
        borderBottomColor:"#eee"
    },
    label:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },
    inputTel:{
        flex:1,
        paddingLeft:10,
        padding: 0,
        height:50,
        color:"#333",
    },
    getBtn:{
        width:120,
        height:36,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#20dc74',
        borderRadius:22,
        marginLeft:'auto',
        marginRight:14
    },
    btnText:{
        textAlign:'center',
        color:'#fff',
        fontSize:16,
    },
    inputCode:{
        flex:1,
        paddingLeft:10,
        padding: 0,
        height:50,
        color:"#333",
    },
    gray:{
        backgroundColor:'#ccc'
    }
});

