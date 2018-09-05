import React,{ Component } from 'react';
import {StyleSheet,Text,View,Image,ProgressBarAndroid, Button, TouchableOpacity, ScrollView } from 'react-native';


export default class HisPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"小迪",
            motto:"生命在于运动，慢跑有益健康",
            miles:"240",
            time:"320",
            days:"6",
            cal:"600",
            departure:'西湖',
            destination:'湘湖',
            image:null,
            grade:888

        }
    };

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Ta的主页',
        headerStyle:{
            backgroundColor:'#171a21',
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

    _renderImgItem(item){
        return (
            <View style={styles.headerBox}>
                <Image source={item} style={styles.headerIcon}/>
            </View>
        ) 
    }

    _renderGrade(){
       if(this.state.grade >=0 && this.state.grade <=7){
        return (
            <Image source={require('../images/grade_zero.png')} style={styles.gradeLogo}/>
        ) 
       }
       if(this.state.grade >7 && this.state.grade <= 14){
        return (
            <Image source={require('../images/grade_one.png')} style={styles.gradeLogo}/>
        ) 
       }
       if(this.state.grade >14 && this.state.grade <= 28){
        return (
            <Image source={require('../images/grade_two.png')} style={styles.gradeLogo}/>
        ) 
       }
       if(this.state.grade >28 && this.state.grade <= 56){
        return (
            <Image source={require('../images/grade_three.png')} style={styles.gradeLogo}/>
        ) 
       }
       if(this.state.grade >56 && this.state.grade <= 112){
        return (
            <Image source={require('../images/grade_four.png')} style={styles.gradeLogo}/>
        ) 
       }
       if(this.state.grade >112 && this.state.grade <= 224){
        return (
            <Image source={require('../images/grade_five.png')} style={styles.gradeLogo}/>
        ) 
       }
       if(this.state.grade >224 && this.state.grade <= 448){
        return (
            <Image source={require('../images/grade_six.png')} style={styles.gradeLogo1}/>
        ) 
       }
       if(this.state.grade >448 && this.state.grade <= 896){
        return (
            <Image source={require('../images/grade_seven.png')} style={styles.gradeLogo1}/>
        ) 
       }
       if(this.state.grade >896){
        return (
            <Image source={require('../images/grade_eight.png')} style={styles.gradeLogo1}/>
        ) 
       }
    }
    

    render(){
        return(
            <View style={styles.page}>
            <ScrollView>
                <View style={styles.top}>
                    <View>
                        <Text style={styles.name} >{this.state.name}</Text>
                        <Text style={styles.motto}>{this.state.motto}</Text>
                    </View>
                    <View style={styles.img}>
                        <Image source={require('../images/guide01.png')}/>
                    </View>
                </View>
                <View style={styles.grade}>

                    {this._renderGrade(this.state.grade)}

                    <View style={styles.data}>
                        <View style={styles.miles}>
                            <Text style={styles.numText}>{this.state.miles}</Text>
                            <Text style={styles.text}>里程</Text>
                        </View>
                        <View style={styles.miles}>
                            <Text style={styles.numText}>{this.state.time}</Text>
                            <Text style={styles.text}>天数</Text>
                        </View>
                        <View style={styles.miles}>
                            <Text style={styles.numText}>{this.state.days}</Text>
                            <Text style={styles.text}>时间</Text>
                        </View>
                        <View style={styles.miles}>
                            <Text style={styles.numText}>{this.state.cal}</Text>
                            <Text style={styles.text}>卡路里</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.viewForProgress}>
                    <Text style={{fontSize:16,paddingTop:24,paddingBottom:24,color:'#fff'}}>运动状态</Text>
                    <View style={styles.status}>
                        <Text style={styles.location}>{this.state.departure}</Text>
                        <Text style={styles.location}>{this.state.destination}</Text>
                    </View>
                    <View style={styles.progressBar}>
                        <Image source={require('../images/icon_status.png')} style={{width:18,height:15,position:'absolute',top:-13,left:110}}/>
                        <ProgressBarAndroid styleAttr='Horizontal'  progress={0.8} indeterminate={false} color='#20dc74'/>
                    </View>
                </View>
                <View style={styles.viewForFollower}>
                    <Text style={{lineHeight:32,fontSize:15,color:'#fff',width:94}}>跟跑人</Text>
                    <View style={{flexDirection:'row'}}>
                        {/* <Image/> */}
                    </View>
                </View>
                <View style={{marginTop:70,paddingLeft:16,
        paddingRight:16,flexDirection:'row',justifyContent:'space-between'}}>
                    <TouchableOpacity style={styles.addFriends}  activeOpacity={0.8}>
                        <Text style={styles.btnText}>加为好友</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sayHi}  activeOpacity={0.8}>
                        <Text style={styles.btnText}>打招呼</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:'100%',
        backgroundColor:'#171a21',
        position:'relative',
    },
    top:{
        paddingBottom:29,
        paddingLeft:16,
        paddingRight:16,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    name:{
        color:"#fff",
        fontSize:28,
        marginTop:16
    },
    motto:{
        color:"#555",
        fontSize:15,
        marginTop:12
    },
    img:{
        width:58,
        height:58,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:"#fff",
        borderRadius:29,
        overflow:'hidden',
        marginTop:16
    },
    circle1:{
        width:52,
        height:52,
        position:'absolute',
        left:16,
        top:40
    },
    circle2:{
        width:52,
        height:52,
        position:'absolute',
        left:114,
        top:40
    },
    circle3:{
        width:52,
        height:52,
        position:'absolute',
        left:216,
        top:40
    },
    circle4:{
        width:52,
        height:52,
        position:'absolute',
        left:314,
        top:40
    },
    circleView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:16,
        paddingRight:16,
        position:'relative',
        height:94,
        
    },
    circleViewBottom:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:16,
        paddingRight:16,
        position:'relative',
        height:59,
    },
    text:{
        lineHeight:52,
        color:"#fff"
    },
    textBottom:{
        color:"#bbb",
        lineHeight:37
    },
    viewForText:{
        width:52,
        height:52,
        alignItems:'center',  
        justifyContent: 'center',
        paddingTop:42,
    },
    viewForTextBottom:{
        width:52,
        height:37,
        alignItems:'center',  
    },
    viewForProgress:{
        paddingLeft:16,
        paddingRight:16,
        
    },
    progressBar:{
        width:'100%',
        position:'relative'
    },
    location:{
        color:'#bbb',
        fontSize:15,
        
    },
    status:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom:10
    },
    follower:{
        width:32,
        height:32,
        borderRadius:16,
        marginLeft:9
    },
    viewForFollower:{
        paddingLeft:16,
        paddingRight:16,
        flexDirection:'row',
        paddingTop:28
    },
    addFriends:{
        width:158,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#171a21',
        borderRadius:22,
        borderColor:'#20dc74',
        borderWidth:2,
        
    },
    btnText:{
        textAlign:'center',
        color:'#fff',
        fontSize:16,
    },
    sayHi:{
        width:160,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#20dc74',
        borderRadius:22,
    },
    gradeLogo1:{
        width:72,
        height:55,
    },
    gradeLogo:{
        width:90,
        height:55,
    },
    grade:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:16,
        paddingRight:16
    },
    miles:{
        justifyContent:'space-between',
        alignItems:'center',
    },
    data:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:220,
        marginTop:20,
        marginBottom:20
    },
    numText:{
        color:'#fff',
        fontSize:18,
    },
    text:{
        color:'#bbb',
        fontSize:12,
        marginTop:10
    }
})