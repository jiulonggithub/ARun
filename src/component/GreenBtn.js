import React,{ Component } from 'react'
import {StyleSheet ,View,Text ,TouchableOpacity} from 'react-native'


export default class GreenBtn extends Component{

    render(){
        return <TouchableOpacity style={[styles.regBtn,this.props.style]}  onPress={this.props.onPress} activeOpacity={0.8}>
            <Text style={styles.btnText}>{this.props.text}</Text>
        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    regBtn:{
        width:240,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#20dc74',
        borderRadius:22,
        marginLeft:'auto',
        marginRight:'auto'
    },
    btnText:{
        textAlign:'center',
        color:'#fff',
        fontSize:16,
    },
});