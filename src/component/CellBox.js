import React, { Component } from 'react';
import { Image,View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class CellBox extends Component {

    render() {
        return <View>
            <TouchableOpacity style={[styles.cellBox,this.props.style]} activeOpacity={0.8} onPress={this.props.tapCell}>
                <Text style={styles.leftText}>{this.props.label}</Text>
                <View style={styles.rightRow}>
                    <Text style={styles.rightText}>{this.props.rightValue}</Text>
                    <Image source={ require('../images/icon_right_arrow.png') } style={styles.RightArrowIcon}/>
                </View>
            </TouchableOpacity>
        </View>
    }
};
const styles = StyleSheet.create({
    RightArrowIcon:{
        width:  6,
        height:12,
        marginLeft:10
    },
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