import React,{ Component } from 'react'
import {StyleSheet,View,Text,TextInput,Image,TouchableOpacity,ToastAndroid,NativeModules} from 'react-native'
import RegisterBtn from '../component/registerBtn'
import { pwdLogin ,chatHistory ,msgStatusChange,LoginTelCode,TelCodeLogin} from '../requests/http';
import io from 'socket.io-client';
import AliPay from 'react-native-alipay-android-acinfo';
let loginTitle = require('../images/login_title.png');

export default class LoginPage extends Component{
    constructor(){
        super();
        this.state = {
            currentNavIndex: 0,  //0验证码登陆  1 密码登陆
            username: '88888888',
            password: '88888888',
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
    setNav(e){
        if(this.state.currentNavIndex !== e){
            this.setState({
                currentNavIndex: e
            });
        }
    }
    getCode(e){
        let self =this;
        if(this.validMobile(this.state.username)){
            if(this.state.getCodeFlag){
                let _data = {
                    phone: this.state.username.trim()
                };
                LoginTelCode(_data).then((res)=>{
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
                });
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
                console.log(self.count);
                self.setState({getCode:self.count+"s"});
            }
        },1000)
    }

    TapSubmit(e){
        let self = this;
        let currentState = this.state.currentNavIndex;
        if(currentState === 0){
            if(this.validMobile(this.state.username) && this.validYzm(this.state.code)){
                let _parameter = {
                    phone:this.state.username,
                    code:this.state.code
                };
                TelCodeLogin(_parameter).then((res)=>{
                    console.log(res);
                    if(parseInt(res.data.errcode)===0){
                        // ToastAndroid.show('登陆成功', ToastAndroid.SHORT);
                        let _token = res.data.data.token;
                        let _userid = res.data.data.user_id;
                        global.token = _token;
                        global.userID = _userid;
                        console.log(userID);
                        self.getChatHistory();
                        self.loginSuccess(_userid);//传入我的uid
                        self.saveId(_userid)
                    }else {
                        // ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
                        if(res.data.msg.code){
                            alert(res.data.msg.code[0]);
                        }
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }else if(currentState ===1){

            if(this.validUsername(this.state.username) && this.validPwd(this.state.password)){
                let _data = {
                    username:this.state.username.trim(),
                    password:this.state.password.trim()
                };
                pwdLogin(_data).then((res)=>{
                    console.log(res);
                    if(parseInt(res.data.errcode) === 0){
                        ToastAndroid.show('登陆成功', ToastAndroid.SHORT);
                        let _token = res.data.data.token;
                        let _userid = res.data.data.user_id;
                        global.token = _token;
                        global.userID = _userid;
                        console.log(userID);
                        self.getChatHistory();
                        self.loginSuccess(_userid);//传入我的uid
                        self.saveId(_userid)
                    }else if(parseInt(res.data.errcode) === 501){
                        alert("密码错误");
                    }else {
                        alert(res.data.msg);
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }

    //拉取离线的消息
    getChatHistory(){
        let _data = {
            // number:20
        };
        chatHistory(_data).then((res)=>{
            let self = this;
            // console.log('history',res);
            if(parseInt(res.data.errcode) === 0){
                let _data = res.data.data;
                if(_data.length > 0){
                     let msgIDList = [];
                     for(let i = 0; i < _data.length; i++){
                         let _item = _data[i];
                         msgIDList.push(_item.id);
                         let fromID = _item.from;
                         let _time = self.timeChange(_item.created_at);
                         let _content = _item.content;
                         let _key = 'myMessages'+ fromID;
                         storage.load({key:_key}).then((data)=>{
                             let currentID =  data.allMessage.length;
                             let currentItem = {id:currentID,uid:parseInt(fromID),dateTime:_time,msg:_content};
                             let newMsgList = Object.assign([],data.allMessage);
                             newMsgList.push(currentItem);
                             storage.save({
                                 key:_key,
                                 data:{
                                     allMessage: newMsgList
                                 }
                             });
                         }).catch((err)=>{
                             console.log(err);
                             console.log('initSrorageMsg ');
                             let currentItem = {id:0,uid:parseInt(fromID),dateTime:_time,msg:_content};
                             let newMsgList = [];
                             newMsgList.push(currentItem);
                             storage.save({
                                 key:_key,
                                 data:{
                                     allMessage: newMsgList
                                 }
                             });
                         })

                     }
                     self.msgSatusChange(msgIDList);
                }
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    msgSatusChange(idlist){
        msgStatusChange(idlist).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }

    //时间转换成毫秒数
    timeChange(starttime){
        //starttime = '2012-12-25 20:17:24';
        starttime = starttime.replace(new RegExp("-","gm"),"/");
        let starttimeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数
        return starttimeHaoMiao;
    }
    //登录成功后跳转页面，并且建立socketIO连接
    loginSuccess(uid){
        if(!global.socketText){
            global.socketText = io('192.168.2.100:3000');

            socketText.emit('login', {
                pubid: uid   //获取手机串号+uid 加密 =》 pubid;
            });

            socketText.on('login', function (res) {
                console.log(res)
            });
            socketText.on('message', function (res) {
                console.log(res);//服务器发送的消息
                let fromID = res.from;//发送消息者的id
                let toID = res.to;//接收者的id

                //别人发过来的消息
                if(parseInt(toID) === parseInt(uid)){
                    let _key = 'myMessages'+ fromID;
                    storage.load({key:_key}).then((data)=>{
                        let currentID =  data.allMessage.length;
                        let currentItem = {id:currentID,uid:parseInt(res.from),dateTime:res.date,msg:res.content};
                        let newMsgList = Object.assign([],data.allMessage);
                        newMsgList.push(currentItem);
                        // console.log("newMsgList",newMsgList);
                        storage.save({
                            key:_key,
                            data:{
                                allMessage: newMsgList
                            }
                        });
                    }).catch((err)=>{
                        console.log(err);
                        console.log('initSrorageMsg ');
                        let currentItem = {id:0,uid:parseInt(fromID),dateTime:res.date,msg:res.content};
                        let newMsgList = [];
                        newMsgList.push(currentItem);
                        storage.save({
                            key:_key,
                            data:{
                                allMessage: newMsgList
                            }
                        });
                    })
                }
            });
        }
        // this.props.navigation.navigate('MyCalCalorie');
        this.props.navigation.navigate('RunningRecord');

    }
    validMobile(tel){
        let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(tel.trim())){
            alert('请输入有效的手机号码！');
            return false;
        }
        return true;
    }
    validUsername(name){
        if(name.trim().length >= 8 && name.trim().length<=12){
            return true;
        }else if(name.trim().length === 0){
            alert('请输入用户名！');
            return false
        }else {
            alert('请输入8~12位用户名！');
            return false
        }
    }
    validPwd(pwd){
        if(pwd.trim().length >= 8 && pwd.trim().length<=20){
            return true;
        }else if(pwd.trim().length === 0){
            alert('请输入密码！');
            return false
        }else {
            alert('请输入8~20位密码！');
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
    _renderCode(){
        return <View style={styles.codeBox}>
            <TextInput style={styles.inputCode} placeholder="请输入验证码" keyboardType="numeric" onChangeText={(e) => this.codeChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={6}/>
            <TouchableOpacity  onPress={(e)=>{this.getCode(e)}} activeOpacity={0.8}  >
                <Text style={styles.getCode} >{this.state.getCode}</Text>
            </TouchableOpacity>
        </View>
    }
    _renderPwdLogin(){
        const { navigate } = this.props.navigation;
        return <View style={{marginTop:20}}>
            <TextInput style={styles.inputText} placeholder="请输入密码" value={this.state.password} onChangeText={(e) => this.passwordChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' secureTextEntry={true}/>
            <TouchableOpacity style={styles.forgetBtn} onPress={() => navigate('ForgetPassword')} activeOpacity={1} >
                <Text style={styles.forgetText}>忘记密码?</Text>
            </TouchableOpacity>
        </View>
    }
    saveId(_userid){
        storage.save({
            key:'userInfo',
            data:{
                id:_userid
            }
        });

        //获取数据
        // storage.load({key:'userInfo'}).then((res)=>{
        //     console.log('id----'+res.id);
        // })
    }
    componentDidMount(){
        //保存数据
        // storage.save({
        //     key:'userInfo',
        //     data:{
        //         id:"user_id"
        //     }
        // });

        // //获取数据
        // storage.load({key:'userInfo'}).then((res)=>{
        //     alert(res.id);
        // })

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
    alipayLogin(){
        /*NativeModules.AlipayModule.alipayAuth("http://192.168.2.139/api/auth_info",(e)=>{
            console.log(e);
        });*/
        AliPay.alipayAuth("http://192.168.2.139/api/auth_info",(e)=>{
            console.log(e);
        });
    }

    render(){
        const { navigate } = this.props.navigation;
        return <View style={styles.loginPage}>
            <Image source={loginTitle} style={styles.loginTitle}/>
            <View style={styles.titleNavs} >
                <TouchableOpacity activeOpacity={0.8} onPress={(e)=>{ this.setNav(0)}}>
                    <Text style={[styles.navText,this.state.currentNavIndex === 0 ? styles.activeNav: '']}>验证码登录</Text>
                </TouchableOpacity>
                <Text style={styles.whiteLine}>|</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={(e)=>{ this.setNav(1)}}>
                    <Text style={[styles.navText,this.state.currentNavIndex === 1 ? styles.activeNav: '']}>密码登录</Text>
                </TouchableOpacity>
            </View>
            <TextInput style={styles.inputText} placeholder="请输入手机号" keyboardType="numeric" value={this.state.username} onChangeText={(e) => this.usernameChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={11}/>
            {
                this.state.currentNavIndex === 0 ? this._renderCode(): this._renderPwdLogin()
            }
            {/*<TouchableOpacity style={styles.btn} onPress = {(e) => this.alipayLogin(e)} activeOpacity={0.8} >
                <Text style={styles.btnText}>支付宝登录</Text>
            </TouchableOpacity>*/}
            <TouchableOpacity style={styles.btn} onPress = {(e) => this.TapSubmit(e)} activeOpacity={0.8}  >
                <Text style={styles.btnText}>登录</Text>
            </TouchableOpacity>
            <RegisterBtn title="立即注册"   tapRegist = {() => navigate('RegisterPage')} />
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
    forgetText:{
        fontSize: 16,
        color:'#bbb',
        textAlign:'right'
    },
    titleNavs:{
        width:300,
        display:'flex',
        flexDirection:"row",
        // backgroundColor:'#ffb',
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30,
        marginBottom:3030,
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