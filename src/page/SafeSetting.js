import React, { Component } from 'react';
import {View, StyleSheet,Text} from 'react-native';
import Cell from '../component/CellBox'
export default class SafeSetting extends Component {
    constructor(props) {
        super(props);
    };
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '安全设置',
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
                <Text style={styles.cellTitle}>第三方账号</Text>
                <Cell label="微信支付" rightValue = '未绑定' tapCell={()=>{alert('微信支付')}}/>
                <Cell label="支付宝" rightValue = '未绑定' tapCell={()=>{alert('支付宝')}} style={styles.mb10}/>
                <Cell label="密码修改" tapCell={()=>navigate('UpdataPwd')}/>
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

});

