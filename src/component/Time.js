import React, { Component } from 'react';
import LineGauge from 'react-native-line-gauge';
import GreenBtn from '../component/GreenBtn';
import {
   StyleSheet,
   Text,
   Image,
   View
 } from 'react-native';



 export  default  class Time extends Component {
    constructor(props){
        super(props);
        this.state = {
            time:this.props.time,

        }
        
    }

    _handleGaugeChange = (value) => this.setState({ time: value });

    TapSubmit(e){
        if(this.state.time === 0 ){
            alert('请选择时间！')
		}else {
            /*alert(this.state.distance)*/
            this.props.parentCallBack(this.state.time);
        }
    }

   

    

    render() {


        return (
            <View>
                <Text style={styles.textNum}>{this.state.time}</Text>
                <Text style={styles.textNumBottom}>设定跑步时长(分钟)</Text>
                <LineGauge
                min={0} 
                max={200} 
                largeInterval={5}
                value={this.state.time} 
                onChange={this._handleGaugeChange}  />
                
                <GreenBtn text='目标确认' style={{marginTop:42,}}  onPress={(e) =>this.TapSubmit(e)}/>
            </View>  
        );
    }
}


const styles = StyleSheet.create({
    textNum:{
        fontSize:40,
        color:'#333',
        textAlign:'center',
        marginTop:20
    },
    textNumBottom:{
        fontSize:12,
        color:'#999',
        textAlign:'center',
        marginBottom:20,
    },
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:'auto',
        marginRight:'auto',
        width:100,
        marginTop:20
      },

 });

