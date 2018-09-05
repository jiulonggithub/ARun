import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import Cell from '../component/CellBox'
export default class Setting extends Component {
    constructor(props) {
        super(props);
    };
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '标题',
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
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.page}>
                <Cell label="账号绑定" rightValue = '' tapCell={()=>navigate('AccountBind')} style={{marginTop:10}}/>
                <Cell label="安全设置" />
                <Cell label="新消息提醒" tapCell={()=>navigate('NewMessageReminder')} style={styles.mb10}/>
                <Cell label="清除缓存" tapCell={()=>{alert('测试')}}/>
                <Cell label="意见反馈" tapCell={()=>navigate('Feedback')} style={styles.mb10}/>
                <Cell label="邀请好友" tapCell={()=>{alert('测试')}}/>
                <Cell label="关于Arun" tapCell={()=>navigate('AboutArun')}/>
                <Cell label="社区规范" tapCell={()=>navigate('CommunityBehavior')}/>
                <Cell label="社区用户公约" tapCell={()=>navigate('CommunityRule')}/>
                <Cell label="联系我们" tapCell={()=>navigate('ContactUs')}/>
                <Cell label="给个好评" tapCell={()=>{alert('测试')}}/>
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
    mb10:{
        marginBottom:10,
        borderBottomWidth:0
    },

});

