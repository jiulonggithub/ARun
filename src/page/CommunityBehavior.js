import React, { Component } from 'react';
import {View, StyleSheet,Text,ScrollView} from 'react-native';
import { privacyTreaty } from '../requests/http'
export default class CommunityBehavior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desc:""
        }
    };
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '社区规范',
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

    getData(){
        let self = this;
        let _data = {
            type:3
        };
        privacyTreaty(_data).then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                self.setState({desc:res.data.data});
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    componentDidMount(){
        this.getData();
    }

    render() {
        return (
            <ScrollView style={styles.page}>
                <Text style={styles.descText}>{this.state.desc}</Text>
            </ScrollView>
        );
    }
};
const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5',
        paddingVertical:10,
        paddingHorizontal:10
    },
    descText:{
        fontSize:12,
        color:"#333"
    }
});

