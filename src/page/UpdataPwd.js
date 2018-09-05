import React, { Component } from 'react';
import {View, StyleSheet,TextInput,ToastAndroid } from 'react-native';
import GreenBtn from '../component/GreenBtn'
import {updatePwd } from '../requests/http'
export default class UpdataPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalPassword: '',
            newsPassword: '',
            newsPassword2:''
        };
    };
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '修改登录密码',
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

    originalPasswordChange(e) {
        this.setState({
            originalPassword: e
        })
    }
    newsPasswordChange(e) {
        this.setState({
            newsPassword: e
        })
    }
    newsPasswordChange2(e) {
        this.setState({
            newsPassword2: e
        })
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
    tapSubmit(){
        let self = this;
        if(self.validPwd(this.state.originalPassword)){
            if(self.validPwd(self.state.newsPassword)){
                if(self.state.newsPassword.trim() === self.state.newsPassword2.trim()){
                    let _data = {
                        old_password:this.state.originalPassword.trim(),
                        new_password:this.state.newsPassword.trim()
                    };
                    updatePwd(_data).then((res)=>{
                        console.log(res);
                        if(parseInt(res.data.errcode)===0){
                            ToastAndroid.show('修改成功', ToastAndroid.SHORT);
                            this.props.navigation.goBack();
                        }else {
                            ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else {
                    alert("两次密码不一致");
                }
            }
        }

    }

    render() {
        return (
            <View style={styles.page}>
                <View style={[styles.inputWrapper,{marginTop:10}]}>
                    <TextInput style={styles.inputPwd} placeholder="输入原密码" onChangeText={(e) => this.originalPasswordChange(e)}  placeholderTextColor="#333" underlineColorAndroid='transparent' secureTextEntry={true}/>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput style={styles.inputPwd} placeholder="输入新密码" onChangeText={(e) => this.newsPasswordChange(e)}  placeholderTextColor="#333" underlineColorAndroid='transparent' secureTextEntry={true}/>
                </View>
                <View style={[styles.inputWrapper,{marginBottom:40}]}>
                    <TextInput style={[styles.inputPwd,{borderBottomWidth:0}]} placeholder="确认密码" onChangeText={(e) => this.newsPasswordChange2(e)}  placeholderTextColor="#333" underlineColorAndroid='transparent' secureTextEntry={true}/>
                </View>
                <GreenBtn text="确认修改" onPress={()=>{this.tapSubmit()}}/>

            </View>
        );
    }
};
const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    },
    inputWrapper:{
        width:'100%',
        backgroundColor:'#fff',
        overflow:'hidden'
    },
    inputPwd:{
        width:'100%',
        marginLeft:14,
        padding: 0,
        height:50,
        marginRight:'auto',
        color:"#333",
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        borderStyle:'solid',
    }

});

