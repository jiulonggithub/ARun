import React,{ Component } from 'react'
import {StyleSheet,View,Text ,Image,TouchableOpacity,ScrollView,Button} from 'react-native'

const navItemList = [
    {text:"运动记录",icon:require('../images/icon_record.png'),pageUrl:"RunningRecord",styleClass:'navIcon0'},
    // {text:"我的运动轨迹",icon:require('../images/icon_guide_record.png'),pageUrl:"sportRecord",styleClass:'navIcon1'},
    {text:"通讯录",icon:require('../images/icon_txl.png'),pageUrl:"FriendsList",styleClass:'navIcon2'},
    {text:"我的卡路里",icon:require('../images/icon_money.png'),pageUrl:"MyCalCalorie",styleClass:'navIcon3'},
    {text:"个人档案",icon:require('../images/icon_data.png'),pageUrl:"EditData",styleClass:'navIcon4'},
    {text:"设置",icon:require('../images/icon_setting.png'),pageUrl:"Setting",styleClass:'navIcon5'}
];

export default class MainLeftNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            nickname : '山河',
            address: '杭州',
            level: '1',
            dayNumber:7
        };
    }
    static navigationOptions = ({ navigation }) => ({
        header: null,
        // headerTitle: '标题1',
    });

    _renderNavItem(item,i){
        return <TouchableOpacity style={styles.navItemRow} key={i} onPress ={() => console.log(item.pageUrl)} title={item.text}>
            <View style={{width:22,marginRight:12}}><Image style={styles[item.styleClass]} source={item.icon} /></View>
            <Text style={styles.navItem}>{item.text}</Text>
        </TouchableOpacity>
    }

    render(){
        // const { navigate } = this.props.navigation;
        return <ScrollView style={{width:'100%',backgroundColor:'#171a21'}}>
            <View style={styles.menuBox}>
                <View style={{width:'100%',marginTop:40}}>
                    <View style={styles.headBox}>
                        <View style={styles.headImgBox}>
                            <Image source={require('../images/login_title.png')} style={styles.headImg}/>
                        </View>
                        <Text style={styles.nickname}>{this.state.nickname}</Text>
                    </View>
                    <View style={styles.detailsBox}>
                        <View style={styles.levelBox}>
                            <Image source={require('../images/icon_level.png')} style={styles.levelIcon}/>
                            <Text style={styles.levelText}>{this.state.level}</Text>
                        </View>
                        <View style={styles.levelBox}>
                            <Image source={require('../images/icon_addr.png')} style={styles.addressIcon}/>
                            <Text style={styles.levelText}>{this.state.address}</Text>
                        </View>
                    </View>
                    <Text style={styles.NavTitle}>Arun已经陪伴你{this.state.dayNumber}天</Text>
                    {
                        navItemList.map((item,i)=>this._renderNavItem(item,i))
                    }
                </View>
            </View>
        </ScrollView>
    }
}

const styles = StyleSheet.create({
    menuBox:{
        width:'100%',
        display:'flex',
        paddingLeft:20,
        backgroundColor:'#171a21',
    },
    headBox:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
    },
    headImgBox:{
        width:52,
        height:52,
        overflow:'hidden',
        backgroundColor:'#fff',
        borderRadius:26,
        marginRight:16
    },
    headImg:{
        width:52,
        height:52,
    },
    nickname:{
        fontSize:20,
        color:"#fff",
    },
    detailsBox:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
    },
    levelBox:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        marginRight:40,
        marginTop:30,
        marginBottom:30
    },
    levelIcon:{
        width:17,
        height:15
    },
    addressIcon:{
        width:15,
        height:17
    },
    levelText:{
        color:"#fff",
        fontSize:14,
        marginLeft:10
    },
    navItem:{
      fontSize:14,
      color:'#bbb'
    },
    navItemRow:{
        width:'100%',
        height:50,
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        // backgroundColor:'#fff'
    },
    navIcon0:{
        width:16,
        height:18
    },
    navIcon1:{
        width:19,
        height:20
    },
    navIcon2:{
        width:16,
        height:18
    },
    navIcon3:{
        width:17,
        height:14
    },
    navIcon4:{
        width:16,
        height:14
    },
    navIcon5:{
        width:19,
        height:18
    },
    NavTitle:{
        fontSize:14,
        color:"#bbb",
        marginBottom:16
    }
});