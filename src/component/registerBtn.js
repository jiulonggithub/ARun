import React,{ Component } from 'react'
import {StyleSheet ,View,Text ,TouchableOpacity} from 'react-native'


export default class RegisterBtn extends Component{

    render(){
        return <View style={[styles.regBtnBox,this.props.style]}>
            <TouchableOpacity style={styles.regBtn}  onPress={this.props.tapRegist} activeOpacity={0.8}>
                <Text style={styles.btnText}>{this.props.title}</Text>
            </TouchableOpacity>
        </View>
    }
}
const styles = StyleSheet.create({
    regBtnBox:{
        width:'100%',
        position:'absolute',
        bottom:30,
        justifyContent:'center',
        alignItems:'center',
    },
    regBtn:{
        width:120,
    },
    btnText:{
        textAlign:'center',
        color:'#bbb',
        fontSize:14,
    },
});