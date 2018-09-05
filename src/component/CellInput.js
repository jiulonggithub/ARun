import React, { Component } from 'react';
import { Image,View, StyleSheet,TextInput, Text, TouchableOpacity } from 'react-native';

export default class CellInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
    };
    inputChange(e){
        this.setState({value: e.trim()});
        this.props.callbackParent(e.trim());
    }
    render() {
        return <View>
            <View style={[styles.cellBox,this.props.style]}>
                <Text style={styles.leftText}>{this.props.label}</Text>
                <View style={styles.rightRow}>
                    <TextInput style={styles.inputText} placeholder={this.props.placeholder} keyboardType={this.props.keyboardType?this.props.keyboardType:'default'} value={this.props.value? this.props.value:this.state.value} onChangeText={(e) => this.inputChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent'/>
                    <Image source={ require('../images/icon_right_arrow.png') } style={styles.RightArrowIcon}/>
                </View>
            </View>
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
        width:80,
        fontSize:14,
        color:'#333'
    },
    rightRow:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    inputText:{
        flex:1,
        textAlign:'right',
        padding:0
    }
});