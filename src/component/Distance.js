import React, { Component } from 'react';
import LineGauge from 'react-native-line-gauge';
import GreenBtn from '../component/GreenBtn';
import {
   StyleSheet,
   Text,
   Image,
   View
 } from 'react-native';



 export  default  class Distance extends Component {
    constructor(props){
        super(props);
        this.state = {
            distance:this.props.distance,
        }
        
    }

    _handleGaugeChange = (value) => this.setState({ distance: value });

    TapSubmit(e){
        if(this.state.distance === 0){
            alert('请选择距离！')
		}else {
            /*alert(this.state.distance)*/
            this.props.parentCallBack(this.state.distance);
        }
    }

    _valueChange=(value)=>this.setState({ distance: value });

    render() {
        return (
            <View>
                <Text style={styles.textNum}>{this.state.distance}</Text>
                <Text style={styles.textNumBottom}>设定跑步距离(公里)</Text>
                <LineGauge
                min={0} 
                max={100} 
                largeInterval={5}
                //mediumInterval={10}
                value={this.state.distance}
                onChange={this._handleGaugeChange}  />
                
                <GreenBtn text='目标确认' style={{marginTop:35,}}  onPress={(e) =>this.TapSubmit(e)}
                />
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
    }

 });

