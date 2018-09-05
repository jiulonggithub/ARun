import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,TextInput, ScrollView,TouchableOpacity,Modal,Dimensions,WebView} from 'react-native';
import NearBy from '../component/NearBy';
import Calling from "../component/Calling"
import SayHello from "../component/SayHello"
// import io from 'socket.io-client';

const {width} = Dimensions.get('window');

// let rtcio = io('192.168.2.100:3000/rtc');

export  default  class RunScreen extends  Component{
    constructor(props){
        super(props);
        this.state = {
            status:'沿着道路向北方向行走600米即可到达目的地',
            mile:6.20,
            speed:82,
            time:'00:27:42',
            fire:777,
            currentNavIndex: 0,
            currentPage:0,
            modalVisible: false,//模态场景是否可见
            transparent: true,
            calling:false,
            sayHello:false,
            nearData:[         //附近的跑友
                {id:1111,image: "" ,title: "每日一跑",from: "西湖",to: "湘湖",follower:2,mile: 5},
                {id:2222,image: "" ,title: "每日一跑",from: "西湖",to: "湘湖",follower:2,mile: 5},
                {id:3333,image: "" ,title: "每日一跑",from: "西湖",to: "湘湖",follower:2,mile: 5},
                {id:4444,image: "" ,title: "每日一跑",from: "西湖",to: "湘湖",follower:2,mile: 5},
            ],

            roomID: '',
            myID:8888,
            webViewData: '0011',
            callStatus:"等待接通", //正在呼叫，等待接通，正在通话，
            inputCallID:"",
            inputMyID:""
        }
    }

    static navigationOptions = ({navigation})=>(
        {
            header:null
        }
    );

    _contineRunning(){
        alert('继续')
    }

    _endingRunning(){
        alert('结束')
    }

    _onPressAlert(){
        alert('消息')
    }
    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };
    _renderPause(){
        return <View style={styles.button}>
            <TouchableOpacity style={styles.yellowBox}
                onPress={()=>{ this._onPressAlert()}} 
                activeOpacity={0.8}>
                <Image source={require('../images/icon_run_bell.png')} style={{width:16,height:20}}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pausetBox}
                onPress={(e)=>{ this.setNav(1)}} 
                activeOpacity={0.8}>
                <Text style={styles.pause}>暂停</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yellowBox}
                onPress={this._setModalVisible.bind(this, true) } 
                activeOpacity={0.8}>
                <Image source={require('../images/icon_run_location.png')} style={{width:17,height:20}}/>
            </TouchableOpacity>
        </View>
    }
    _renderContinue(){
        return <View style={styles.button}>
            <TouchableOpacity style={styles.acceptBox}
            onPress={(e)=>{ this.setNav(0)}} 
            activeOpacity={0.8}>
            <Text style={styles.accept}>继续</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectBox}
            onPress={()=>this._endingRunning()} 
            activeOpacity={0.8}>
                <Text style={styles.reject}>结束</Text>
            </TouchableOpacity>
       </View>
    }
    setNav(e){
        if(this.state.currentNavIndex !== e){
            this.setState({
                currentNavIndex: e
            })
        }
    }
    setTab(e){
        if(this.state.currentPage !== e){
            this.setState({
                currentPage: e
            })
        }
    }
    _calling(id){
        alert(id); //呼叫对方的ID
        this.setState({ modalVisible: false });
        this.setState({callStatus:"正在呼叫"});
        this.setState({ calling: true });
        let _data = {
          callid : id
        };
        this.sendMessage(JSON.stringify(_data));
    }
    _renderNearBy(){
        return (
            <NearBy data={this.state.nearData} calling={(e)=>{this._calling(e)}}/>
        )
    }
    _renderCallRecord(){

    }
    //取消发送的语音请求
    _cancel(){
        this.setState({calling:false})
        //todo
    }
    //拒绝某人的语音请求
    _refuseCalling(){
        this.setState({calling:false})
        //todo
        let _data = {
            refuse : 'refuse'
        };
        this.sendMessage(JSON.stringify(_data));
    }
    //接收某人的语音请求
    _adoptCalling(){
        this.setState({callStatus:"正在通话"});
        //todo  计算通话记录时间
    }
    //结束与某人的语音通话
    _closeCalling(){
        this.setState({calling:false});
        //todo
    }
    _callingHello(){
        this.setState({sayHello:false})
    }
    _renderCalling(calling){
        if(calling){
            return(
                <Calling callStatus={this.state.callStatus}
                         adoptCalling={()=>{this._adoptCalling()}}
                         refuseCalling={()=>{this._refuseCalling()}}
                         cancelCalling={()=>{this._cancel()}}
                         closeCalling ={()=>{this._closeCalling()}}
                         headImg = "http://image-2.plusman.cn/app/im-client/doc/asset/im-js-logo@240.png" name="大美女"/>
            )
        }else {}
    }
    _SayHello(helloShow){
        if(helloShow){
            return (
                <SayHello callHello={()=>{this._callingHello()}} image="http://image-2.plusman.cn/app/im-client/doc/asset/im-js-logo@240.png"  name="张三" mile="2" from="西湖" to="湘湖"/>
            )
        }

    }
    componentDidMount() {

    }
    goBack = () => {
        this.refs.webview.goBack();
    };

    goForward = () => {
        this.refs.webview.goForward();
    };

    reload = () => {
        this.refs.webview.reload();
    };
    sendMessage(data) {
        this.refs.webview.postMessage(data);
    }
    webViewLoaded(){
        console.log('onLoadEnd');
        // this.sendMessage('8887 ');//发送数据到页面
        let _data = {
            myid : '8788'
        };
        // this.sendMessage(JSON.stringify(_data));//发送数据到页面
    }

    handleMessage(e) { //获取页面发送的数据
        let _data = e.nativeEvent.data;
        if(_data === 'calling'){
            this.setState({callStatus:"正在呼叫"});
            this.setState({ calling: true });
        }
        this.setState({webViewData: e.nativeEvent.data});
        console.log(e.nativeEvent.data);
    }

    inputCallIDChange(e){
        this.setState({ inputCallID: e });
    }
    inputMyIDChange(e){
        this.setState({ inputMyID: e });
    }
    sendMyID(){
        let myID = this.state.inputMyID;
        let _data = {
            myid: myID
        };
        alert(myID+"加入");
        this.sendMessage(JSON.stringify(_data));//发送数据到页面
    }
    render(){
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.3)' : 'red',
          };
          let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff'}
            : null;

        return(
            <View style={{ alignItems: 'center', flex: 1 }}>
                <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => { this._setModalVisible(false) } }
                //onShow={this.startShow}
                >
                    <View style={[styles.container, modalBackgroundStyle]}>
                    
                        <ScrollView onTouchStart={this._setModalVisible.bind(this, false) } />

                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                        <View style={styles.titleNavs} >
                            <TouchableOpacity activeOpacity={0.8} onPress={(e)=>{ this.setTab(0)}} style={styles.tabTitle}>
                                <View>
                                    <Text style={[styles.navText,this.state.currentPage === 0 ? styles.activeNav: '']}>附近的人</Text>
                                </View>
                                <Text style={[styles.underLine,this.state.currentPage === 0 ? styles.underLine: styles.noUnderline]} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={(e)=>{ this.setTab(1)}} style={styles.tabTitle}>
                                <View>
                                    <Text style={[styles.navText,this.state.currentPage === 1 ? styles.activeNav:'']}>呼叫记录</Text>
                                </View>
                                <Text style={[styles.underLine,this.state.currentPage === 1 ? styles.underLine: styles.noUnderline]} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{maxHeight:300}}>
                            {
                                this.state.currentPage ===0 ? this._renderNearBy(): this._renderCallRecord()
                            }
                        </ScrollView>
                        </View>
                    </View>
                </Modal>
                <View style={styles.page}>
                    <View style={styles.pageBox}>
                        <ScrollView>
                            <View style={styles.map}>
                                <WebView
                                    ref={'webview'}
                                    source={{uri:'http://www.acinfo.com.cn/arunwap/map.html'}}
                                    style={{width:'100%',height:'100%'}}
                                    scalesPageToFit={true}
                                    javaScriptEnabled={true}
                                    mixedContentMode="always"
                                    contentInset={{top:0,left:0,bottom:0,right:0}}
                                    onLoad={(e) => console.log('onLoad')}
                                    onLoadEnd={(e) => this.webViewLoaded()}
                                    onLoadStart={(e) => console.log('onLoadStart')}
                                    renderError={() => {
                                        console.log('renderError')
                                        return <View><Text>renderError回调了，出现错误</Text></View>
                                    }}
                                    renderLoading={() => {
                                        return <View><Text>Loading...</Text></View>
                                    }}
                                    onMessage={(e) => {
                                        this.handleMessage(e)
                                    }}
                                />
                            </View>
                            <View style={styles.viewForStatus}>
                                <Image source={require('../images/icon_wave.png')} style={styles.wave} />
                                <View style={styles.dots}>
                                    <View style={styles.dots1} />
                                    <View style={styles.dots2} />
                                    <View style={styles.dots1} />
                                </View>
                                <Text style={styles.status}>{this.state.status}{this.state.webViewData}</Text>
                            </View>
                            <View style={styles.viewForNum}>
                                <View style={styles.ViewForMile}>
                                    <Text style={styles.mile}>{this.state.mile}</Text>
                                    <Text style={styles.km}>km</Text>
                                </View>
                                <View style={styles.ViewForIcon}>
                                    <View style={styles.ViewForSpeed}>
                                        <Image source = {require('../images/icon_run_mile.png')} style={{width:14,height:14}}/>
                                        <Text style={styles.speed}>{this.state.speed}</Text>
                                    </View>
                                    <View style={styles.ViewForClock}>
                                        <Image source = {require('../images/icon_run_clock.png')} style={{width:14,height:14}}/>
                                        <Text style={styles.speed}>{this.state.time}</Text>
                                    </View>
                                    <View style={styles.ViewForFire}>
                                        <Image source = {require('../images/icon_run_fire.png')} style={{width:12,height:14}}/>
                                        <Text style={styles.speed}>{this.state.fire}</Text>
                                    </View>
                                </View>
                            </View>
                            {
                                this.state.currentNavIndex ===0 ? this._renderPause(): this._renderContinue()
                            }

                            <TextInput style={styles.inputText} placeholder="请输入对方ID" value={this.state.inputCallID} onChangeText={(e) => this.inputCallIDChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' />
                            <TextInput style={styles.inputText} placeholder="请输入自己ID" value={this.state.inputMyID} onChangeText={(e) => this.inputMyIDChange(e)}  placeholderTextColor="#bbb" underlineColorAndroid='transparent' />
                            <TouchableOpacity style={{width:120,height:60,backgroundColor:"#fff"}} onPress={(e) => {this.sendMyID()}} activeOpacity={1} >
                                <Text style={styles.forgetText}>加入</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:120,height:60,backgroundColor:"#fff"}} onPress={(e) => {this._calling(this.state.inputCallID)}} activeOpacity={1} >
                                <Text style={styles.forgetText}>呼叫</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                    {this._SayHello(this.state.sayHello)}
                    {this._renderCalling(this.state.calling)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:"100%",
        
      },
      innerContainer: {
        alignItems: 'center',
        position:'absolute',
        bottom:0,
        left:(width-342)/2,
        width:343,
        borderTopRightRadius:6,
        borderTopLeftRadius:6,
      },
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#171a21',

    },
    pageBox:{
        width:"100%",
        height:"100%",
        paddingLeft:16,
        paddingRight:16,
        position:'relative'
    },
    map:{
        width:343,
        height:214,
        backgroundColor:'#abcdef',
        marginLeft:'auto',
        marginRight:'auto'
    },
    dots:{
        width:36,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
    },
    dots1:{
        width:4,
        height:4,
        borderRadius:2,
        backgroundColor:'#292e38',
    },
    dots2:{
        width:8,
        height:8,
        borderRadius:4,
        backgroundColor:'#2bfc89',
    },
    wave:{
        width:32,
        height:32,
    },
    status:{
        fontSize:16,
        color:'#bbb',
        lineHeight:20,
        width:235
    },
    viewForStatus:{
        height:104,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
    },
    /*ViewForIcon:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
    },*/
    ViewForMile:{
        flexDirection:"row",
        justifyContent:"flex-start",
        width:120
    },
    mile:{
        fontSize:52,
        color:'#fff',
    },
    km:{
        fontSize:10,
        color:'#fff',
        marginLeft:12,
        lineHeight:58
    },
    /*ViewForSpeed:{
        justifyContent:"space-between",
        alignItems:'center',
    },*/
    speed:{
        fontSize:20,
        color:'#fff',
    },
    viewForNum:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    ViewForIcon:{
        flexDirection:"row",
        justifyContent:"center",
        height:34,
        width:200,
        alignItems:'center',
        marginTop:26
    },
    ViewForSpeed:{
        justifyContent:"center",
        alignItems:'center',
    },
    ViewForClock:{
        justifyContent:"center",
        alignItems:'center',
        marginLeft:35,
        marginRight:35
    },
    ViewForFire:{
        justifyContent:"center",
        alignItems:'center',
    },
    button:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        marginTop:50
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
    },
    pausetBox:{
        width:80,
        height:80,
        borderRadius:40,
        backgroundColor:"#20dc74",
        justifyContent:"center",
        alignItems:"center",
        marginLeft:44,
        marginRight:44
    },
    pause:{
        color:'#fff',
        fontSize:16,
        
    },
    yellowBox:{
        width:56,
        height:56,
        borderRadius:28,
        backgroundColor:"#f2cf29",
        justifyContent:"center",
        alignItems:"center",
    },
    titleNavs:{
        
        height:55,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:'center',
        
    },
    navText:{
        color:'#bbb',
        fontSize:14,
        textAlign:'center'
    },
    activeNav:{
      color:'#20dc74',
    },
    underLine:{
        width:16,
        height:4,
        backgroundColor:"#20dc74",
        marginTop:15
    },
    noUnderline:{
        width:16,
        height:4,
        backgroundColor:"#fff",
    },
    tabTitle:{
        justifyContent:"center",
        alignItems:'center',
        width:171,
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    inputText:{
        width:200,
        paddingLeft:10,
        padding: 0,
        height:40,
        marginLeft:'auto',
        marginRight:'auto',
        color:"#000",
        backgroundColor:'#fff',
    },
});