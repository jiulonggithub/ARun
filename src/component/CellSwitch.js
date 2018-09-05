import React, { Component } from 'react';
import {View, StyleSheet, Text ,Switch} from 'react-native';

export default class CellSwitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    };
    render() {
        return <View>
            <View style={[styles.cellBox,this.props.style]} >
                <Text style={styles.leftText}>{this.props.label}</Text>
                <Switch value={this.props.value? this.props.value:this.state.value} onValueChange={(value)=>{
                    this.props.callbackParent(value);
                }}/>
            </View>
        </View>
    }
};
const styles = StyleSheet.create({

    cellBox:{
        width:'100%',
        display:'flex',
        paddingLeft:15,
        paddingRight:15,
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        borderStyle:'solid',
        backgroundColor:'#fff'
    },
    leftText:{
        fontSize:14,
        color:'#333'
    },
    rightText:{
        fontSize:14,
        color:'#999'
    },
    rightRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
});