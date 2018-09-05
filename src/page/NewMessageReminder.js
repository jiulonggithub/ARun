import React, { Component } from 'react';
import {View, StyleSheet,Text,ToastAndroid} from 'react-native';
import CellSwitch from '../component/CellSwitch'
import GreenBtn from '../component/GreenBtn'
import { getOwnSetting , ownSettingUpdate} from '../requests/http';


export default class NewMessageReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsMsgReminder: null,
            voice : null,
            vibrate : null,
            friendsReminder: null,
            runningReminder: null,
        }
    };
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '新消息提醒',
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

    onChildChanged01(newState) {
        console.log(newState);
        this.setState({newsMsgReminder:newState});
    }
    onChildChanged02(newState) {
        console.log(newState);
        this.setState({voice:newState});
    }
    onChildChanged03(newState) {
        console.log(newState);
        this.setState({vibrate:newState});
    }
    onChildChanged04(newState) {
        console.log(newState);
        this.setState({friendsReminder:newState});
    }
    onChildChanged05(newState) {
        console.log(newState);
        this.setState({runningReminder:newState});
    }
    tapSubmit(e){
        let self = this;
        let _data = {
            system_message:self.state.newsMsgReminder === true ? 0 : 1,
            voice:self.state.voice === true ? 0 : 1,
            shake:self.state.vibrate === true ? 0 : 1,
            request_remind:self.state.friendsReminder === true ? 0 : 1,
            running_called:self.state.runningReminder === true ? 0 : 1,
        };
        console.log(_data);
        ownSettingUpdate(_data).then((res)=>{
            console.log(res.data);
            if(parseInt(res.data.errcode)===0){
                ToastAndroid.show('设置保存成功', ToastAndroid.SHORT);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    componentDidMount() {
        let self = this;
        getOwnSetting().then((res)=>{
            console.log(res.data.data);
            if(parseInt(res.data.errcode)===0){
                let  _data = res.data.data;
                let newsMsgReminder = self.isTrue(_data.system_message);
                let voice = self.isTrue(_data.voice);
                let vibrate = self.isTrue(_data.shake);
                let friendsReminder = self.isTrue(_data.request_remind);
                let runningReminder = self.isTrue(_data.running_called);

                self.setState({
                    newsMsgReminder:newsMsgReminder,
                    voice:voice,
                    vibrate:vibrate,
                    friendsReminder:friendsReminder,
                    runningReminder:runningReminder,
                });
                console.log(self.state.newsMsgReminder)
                console.log(self.state.voice)
                console.log(self.state.vibrate)
                console.log(self.state.friendsReminder)
                console.log(self.state.runningReminder)
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    isTrue(num){
        if(parseInt(num) === 0){
            return true
        }else if(parseInt(num) === 1){
            return false;
        }else {
            console.log(num +"不是O或1");
        }
    }
    render() {
        return (
            <View style={styles.page}>
                <CellSwitch style={styles.mt10} label="系统消息推送"  value={this.state.newsMsgReminder} callbackParent={(e)=>{this.onChildChanged01(e)}}/>
                <CellSwitch label="声音"  value={this.state.voice} callbackParent={(e)=>{this.onChildChanged02(e)}}/>
                <CellSwitch style={styles.mt10} label="震动"  value={this.state.vibrate} callbackParent={(e)=>{this.onChildChanged03(e)}}/>
                <CellSwitch label="收到/通过好友请求提醒"  value={this.state.friendsReminder} callbackParent={(e)=>{this.onChildChanged04(e)}}/>
                <CellSwitch label="运动打招呼设置"  value={this.state.runningReminder} callbackParent={(e)=>{this.onChildChanged05(e)}}/>
                <GreenBtn style={styles.btn} text="保存设置" onPress={(e)=>{this.tapSubmit(e)}}/>
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
    mt10:{
        marginTop:10
    },
    btn:{
        position:'absolute',
        left:'50%',
        right:0,
        bottom:30,
        translateX:-120
    }
});

