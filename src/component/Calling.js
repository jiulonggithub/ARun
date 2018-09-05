import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native';
import {ColorDotsLoader} from 'react-native-indicator';

export  default  class Calling extends  Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

 /*   static navigationOptions = ({navigation})=>(
        {
            header:null
        }
    )*/

    _renderImgItem(item){
        return  <Image source={{uri:item}} style={styles.headerIcon}/>
    }
    //取消呼叫
    _cancelCalling(){
        this.props.cancelCalling();
    }
    //拒绝接通
    refuseCalling(){
        this.props.refuseCalling();
    }
    //接通
    _adoptCalling(){
        this.props.adoptCalling();
    }
    //关闭正在进行的通话
    _closeCalling(){
        this.props.closeCalling();
    }
    _renderTimeOrWaiting(status){
        if(status==='正在通话'){
            return <Text style={{color:"#fff",fontSize:18}}>00:00:54</Text>
        }else {
            return (
                <ColorDotsLoader
                    size={8}
                    betweenSpace={12}
                    color1={'#20dc74'}
                    color2={'#f2cf29'}
                    color3={'#6a52ec'}
                />
            )
        }
    }
    _renderBtn(status){
        if(status==='正在呼叫'){
            return  <TouchableOpacity style={[styles.cancelBox,{marginTop:20}]} onPress={()=>this._cancelCalling()} activeOpacity={0.8}>
                <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
        }else if(status==='等待接通'){
            return  (
                <View style={styles.btnBox}>
                    <TouchableOpacity style={[styles.cancelBox,{marginRight:50}]}
                                      onPress={()=>this._adoptCalling()} activeOpacity={0.8}>
                        <Text style={styles.cancel}>接通</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelBox}
                                      onPress={()=>this.refuseCalling()} activeOpacity={0.8}>
                        <Text style={styles.cancel}>拒绝</Text>
                    </TouchableOpacity>
                </View>
            )
        }else if(status==='正在通话'){
            return  <TouchableOpacity style={[styles.cancelBox,{marginTop:20}]} onPress={()=>this._closeCalling()} activeOpacity={0.8}>
                <Text style={styles.cancel}>取消</Text>
            </TouchableOpacity>
        }
    }
    render(){
        return(
            <View style={styles.page}>
                <View style={styles.headBox}>
                    {this.props.headImg ? this._renderImgItem(this.props.headImg) : null}
                </View>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text style={styles.wait}>能不能等一等我，带我一起跑</Text>
                <Text style={styles.call}>{this.props.callStatus}</Text>
                <View style={{height:40}}>
                    {this._renderTimeOrWaiting(this.props.callStatus)}
                </View>
                {this._renderBtn(this.props.callStatus)}
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    page:{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor:'#1b1b1b',
        justifyContent:"flex-start",
        alignItems:"center",
        zIndex:4
    },
    headBox:{
        width:60,
        height:60,
        borderRadius:30,
        borderWidth:2,
        borderColor:'#fff',
        backgroundColor:"#ededed",
        overflow:"hidden",
        marginTop:72,
    },
    headerIcon:{
        width:60,
        height:60
    },
    name:{
        fontSize:18,
        color:'#fff',
        marginBottom:31,
        marginTop:15
    },
    wait:{
        fontSize:16,
        color:'#999',
        
    },
    call:{
        fontSize:24,
        color:'#fff',
        marginBottom:31,
        marginTop:77
    },
    cancelBox:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:"#313131",
        justifyContent:"center",
        alignItems:"center",
        // marginTop:60
    },
    cancel:{
        fontSize:18,
        color:'#fff',
    },
    btnBox:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
    }
});