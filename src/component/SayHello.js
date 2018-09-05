import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,TouchableOpacity} from 'react-native'

export  default  class SayHello extends  Component{
    constructor(props){
        super(props);
        this.state = {
           /* image:null,
            name:'迪丽热',
            mile:'500m',
            from:'西湖',
            to:'湘湖'*/
        }
    }

/*    static navigationOptions = ({navigation})=>(
        {
            header:null
        }
    )*/

    _renderImgItem(item){
        return  <Image source={{uri:item}} style={styles.headerIcon}/>
    }

    render(){
        return(
            <View style={styles.page}>
                <View style={styles.container}>
                    <View style={styles.top}>
                        <View style={{
                            flexDirection:"row",
                            justifyContent:"flex-start"
                            }}>
                            <View style={styles.headBox}>
                                {this.props.image ? this._renderImgItem(this.props.image) : null}
                            </View>
                            <Text style={styles.name}>{this.props.name}</Text>
                        </View>
                        <Text style={styles.mile}>距我
                            <Text style={styles.mileNum}>{this.props.mile}</Text>
                        </Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.text}>正在</Text>
                        <View style={styles.running} >
                            <Text style={styles.text}>{this.props.from}</Text>
                            <Image source ={require('../images/icon_status.png')} 
                            style={{width:17,height:15,marginLeft:12,marginRight:12}}/>
                            <Text style={styles.text}>{this.props.to}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.bottom}  onPress={()=>this.props.callHello()} activeOpacity={0.8}>
                        <Text style={styles.wait}>能不能等一等我，带我一起跑</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor:'rgba(0,0,0,.9)',
        justifyContent:"center",
        alignItems:"center",
        zIndex:3
    },
    container:{
        width:280,
    },
    top:{
        height:52,
        backgroundColor:'#fff',
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
    },
    headBox:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:"#ededed",
        overflow:"hidden",
        marginRight:16
    },
    headerIcon:{
        width:30,
        height:30
    },
    name:{
        fontSize:18,
        color:'#333',
    },
    mile:{
        fontSize:12,
        color:'#999'
    },
    mileNum:{
        fontSize:20,
    },
    center:{
        height:52,
        backgroundColor:'#fff',
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16,
    },
    running:{
        flexDirection:"row",
        justifyContent:"center",
    },
    text:{
        fontSize:16,
        color:'#333'
    },
    bottom:{
        height:52,
        backgroundColor:'#20dc74',
        alignItems:'center',
        justifyContent:"center",
        borderBottomLeftRadius:4,
        borderBottomRightRadius:4,
    },
    wait:{
        fontSize:16,
        color:'#fff' 
    }
});