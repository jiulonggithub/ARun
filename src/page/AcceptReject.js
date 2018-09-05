import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native'

export  default  class AcceptReject extends  Component{
    constructor(props){
        super(props);
        this.state = {
            image:null,
            name:'迪丽热',
            
        }
    }

    static navigationOptions = ({navigation})=>(
        {
            header:null
        }
    )

    _renderImgItem(item){
        return  <Image source={item} style={styles.headerIcon}/>
    }

    _acceptCalling(){
        alert('接受')
    }

    _rejectCalling(){
        alert('拒绝')
    }

    render(){
        return(
            <View style={styles.page}>
                <View style={styles.headBox}>
                    {this.state.image ? this._renderImgItem(this.state.image) : null}
                </View>
                <Text style={styles.name}>{this.state.name}</Text>
                <Text style={styles.wait}>能不能等一等我，带我一起跑</Text>  
               <View style={styles.button}>
                    <TouchableOpacity style={styles.acceptBox}
                    onPress={()=>this._acceptCalling()} activeOpacity={0.8}>
                        <Text style={styles.accept}>接受</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rejectBox}
                    onPress={()=>this._rejectCalling()} activeOpacity={0.8}>
                        <Text style={styles.reject}>拒绝</Text>
                    </TouchableOpacity>
               </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#1b1b1b',
        justifyContent:"center",
        alignItems:"center",
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
        marginTop:16,
        marginBottom:123
    },
    wait:{
        fontSize:16,
        color:'#999',
        marginBottom:120 
    },
    button:{
        flexDirection:"row",
        justifyContent:"center",
    },
    acceptBox:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:"#20dc74",
        justifyContent:"center",
        alignItems:"center",
        marginRight:40,
    },
    rejectBox:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:"#f81b45",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:40,
        
    },
    accept:{
        color:'#fff',
        fontSize:16
    },
    accrejectept:{
        color:'#fff',
        fontSize:16
    }
})