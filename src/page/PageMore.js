import React,{ Component } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image , ToastAndroid } from 'react-native';
import CellSwitch from '../component/CellSwitch';
import CellInput from '../component/CellInput';
import { remarkFriend , deleteFriend} from '../requests/http';

export default class PageMore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remarkName:"老马",
            chatToTop:true,
            addToblack:true
        }
    };

    static navigationOptions = ({ navigation }) => ({
        headerTitle: '更多',
        headerStyle:{
            backgroundColor:'#3c3a3f',
            height:44,
            elevation: 0,
            shadowOpacity: 0
        },
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center',
        },
        headerTintColor:'#fff'
    });

    onChatToTop(newState) {
        this.setState({chatToTop:newState});
    }
    onAddToblackp(newState) {
        this.setState({addToblack:newState});
    }

    _deleteFriend(){
        // let _data = {
        //     friend_id:'',
        // };
        // deleteFriend(_data).then((res)=>{
        //     console.log(res.data);
        //     ToastAndroid.show('删除成功！', ToastAndroid.SHORT);
            
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    componentDidMount() {
        // let _data = {
        //     friend_id:'',
        //     remark_name:this.state.remarkName
        // };
        // remarkFriend(_data).then((res)=>{
        //     console.log(res.data);
            
            
        // }).catch((err)=>{
        //     console.log(err)
        // })
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.page}>
                <CellInput style={{marginBottom:10}} label="备注设置" value={this.state.remarkName}  />
                <CellSwitch label="置顶聊天"  value={this.state.chatToTop} callbackParent={()=>{this.onChatToTop()}}/>
                <CellSwitch style={{marginBottom:10}} label="加入黑名单"  value={this.state.addToblack} callbackParent={()=>{this.onAddToblackp()}}/>
                <TouchableOpacity style={styles.report} onPress={()=>navigate('PageMoreReport')}>
                    <Text style={styles.reportText}>举报</Text>
                    <Image source={ require('../images/icon_right_arrow.png') } style={[styles.RightArrowIcon,{position:"absolute",right:14,top:18}]}/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn} onPress={()=>{this._deleteFriend()}}
                >
                    <Text style={styles.btnText}>删除</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:'100%',
        backgroundColor:'#f5f5f5',
        position:'relative'
    },
    RightArrowIcon:{
        width:  6,
        height:12,
        marginLeft:10
    },
    report:{
        width:"100%",
        height:52,
        backgroundColor:"#fff"
        
    },
    reportText:{
        paddingLeft:14,
        fontSize:14,
        color:'#333',
        lineHeight:34
    },
    RightArrowIcon:{
        width:  6,
        height:12,
        marginLeft:10,

    },
    leftArrowIcon:{
        width:  6,
        height:12,
        marginLeft:10,

    },
    btn:{
        marginTop:55,
        marginLeft:"auto",
        marginRight:"auto",
        width:240,
        height:44,
        backgroundColor:'#f81b45',
        borderRadius:120,
        justifyContent:'center',
        alignItems:'center'

    },
    btnText:{
        fontSize:18,
        color:'#fff'
    }
});
