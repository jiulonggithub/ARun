import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,TextInput,FlatList,Button,ToastAndroid,Animated,Dimensions} from 'react-native'
import { chatSend } from '../requests/http'
import io from 'socket.io-client';

const { width, height } = Dimensions.get('window');

let myHeadImg = "http://image-2.plusman.cn/app/im-client/doc/asset/im-js-logo@240.png";
let fromHeadImg = "http://image-2.plusman.cn/app/im-client/doc/asset/Im.JS-v1.4.0.apk.png";

// let socketText = io('192.168.2.100:3000');

export  default  class ChatRoom extends  Component{
    constructor(props){
        super(props);
        this.state = {
            currentUserID:null,//我的uid
            toId:null, //与我聊天的uid
            storageMessageKey: null, //本地存储与某人聊天的key
            messageList:[
                /*{id:0,uid:0,headIcon:fromHeadImg,dateTime:"2017-11-26",msg:"测试"},
                {id:1,uid:1,headIcon:myHeadImg,dateTime:"2017-11-27",msg:"我也测试我也测试我也测试"},
                {id:4,uid:1,headIcon:myHeadImg,dateTime:"2017-11-27",msg:"测就测呗"}*/
            ],
            refreshing:false,
            textInputHeight: 40,
            inputValue: '',
            is_arrived: 1, //(1是送达,0是未送达)
            friendName:null,
            friendIcon:null
        };
        this.timer = 0;
        this.timer2 = 0;
        this.timer3 = 0;
    }
    _flatList;
    _keyExtractor = (item, index) => item.id;
    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '迪丽热巴',
            headerStyle:{
                backgroundColor:'#3c3a3f',
                height:44,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:18
            },
            headerTintColor:'#fff'
        }
    );
    refreshing(){
        let self = this;
       /* self.timer =  setTimeout(()=>{
            clearTimeout(self.timer);
            ToastAndroid.show('刷新成功', ToastAndroid.SHORT);
        },1000)*/
    }
    _onload(){
        let self = this;
       /* self.timer2 =  setTimeout(()=>{
            clearTimeout(self.timer2);
            ToastAndroid.show('加载成功', ToastAndroid.SHORT);
        },1500)*/
    }
    _separator = () => {
        return <View style={{height:2,backgroundColor:'white'}}>
        </View>;
    }

    _renderItem = ({item}) => {
        let differentStyle = {};
        if (item.uid === this.state.currentUserID) {
            differentStyle = {
                flexDirection: 'row-reverse',
                backgroundColor: '#20dc74',
                color:"#fff",
                icon:myHeadImg
            };
        } else {
            differentStyle = {
                flexDirection: 'row',
                backgroundColor: '#f4f4f4',
                color:"#333",
                icon:this.state.friendIcon
            };
        }
        return (
            <View style={[styles.messageCell, {flexDirection: differentStyle.flexDirection}]} key={item}>
                <Image source={{uri: differentStyle.icon,cache: 'force-cache'}} style={styles.avatar} />
                <View  style={[styles.contentView, {backgroundColor: differentStyle.backgroundColor}]} >
                    <Text style={[styles.messageCellText,{color:differentStyle.color}]}>{item.msg}</Text>
                </View>
                <View style={styles.endBlankBlock} />
            </View>
        );
    };

    _onSubmitEditing = ()=>{
        let self = this;
        let _key =  this.state.storageMessageKey;
        let currentVal = self.state.inputValue;
        let origArr = self.state.messageList;
        let currentItem = {id:origArr.length,uid:self.state.currentUserID,dateTime:new Date().getTime(),msg:currentVal};
        let newMsgList = Object.assign([],self.state.messageList);
        newMsgList.push(currentItem);
        self.setState({messageList:newMsgList});
        storage.save({
            key:_key,
            data:{
                allMessage: newMsgList
            }
        });

        socketText.emit('message', {
            from: this.state.currentUserID,
            to:  this.state.toId,
            msgType: 'plaintext',
            content: this.state.inputValue
        });
        let _data = {
            friend_id: self.state.toId ,
            type:1,
            content: this.state.inputValue,
            is_arrived: this.state.is_arrived
        };
        chatSend(_data).then((res)=>{
            // console.log(res);
            if(parseInt(res.data.errcode) === 0){
                console.log("发送成功");
                console.log(_data);
            }
        }).catch((err)=>{
            console.log(err);
        });
    /*    self.setState({ inputValue: "" });*/
        self.setState({ inputValue: "" });
        self.scrolling(200);
        self._flatList.scrollToEnd();
    };

    scrolling(time){
        let self = this;
        setTimeout(()=>{
            if(self._flatList){
               self._flatList.scrollToEnd();
            }
        },time)
    }
    componentWillMount(){

    }
    componentDidMount(){
        let self = this;
        // storage.remove({key:'myMessages2'});
        let myID = userID;
        let toUid = this.props.navigation.state.params.userid;
        let _friendName = this.props.navigation.state.params.name;
        let _friendIcon = this.props.navigation.state.params.icon;
        this.setState({friendName: _friendName});
        this.setState({friendIcon: _friendIcon});
        this.setState({toId: toUid});
        this.setState({currentUserID: myID});
        let _key = 'myMessages'+ toUid;
        this.setState({storageMessageKey: _key});
        self.loadingData(_key);
        this._initIO(_key,toUid);
    }
    componentWillUnmount() {
   /*     this.timer && clearTimeout(this.timer);
        this.timer2 && clearTimeout(this.timer2);
        this.timer3 && clearTimeout(this.timer3);*/
    }

    loadingData(_key){
        let self = this;
        storage.load({key:_key}).then((res)=>{
            self.setState({ messageList: res.allMessage});
            // console.log(res.allMessage);
            self.scrolling(800);
        }).catch((err)=>{
            console.log(err);
        });
    }
    _initIO(_key,toid) {
        let self = this;
        console.log(toid);
        socketText.on('message', function (res) {
            console.log(res);//服务器发送的消息
            let _toId = toid;
            if(res.content === 'offline'){
                self.setState({is_arrived:0})
            }
            if(res.content === 'reached'){
                // self.loadingData(self.state.storageMessageKey);
            }
            //别人发过来的消息
            if(parseInt(res.from) === parseInt(_toId)){
                let currentItem = {id:self.state.messageList.length,uid:parseInt(res.from),dateTime:res.date,msg:res.content};
                let newMsgList = Object.assign([],self.state.messageList);
                newMsgList.push(currentItem);
                self.setState({messageList:newMsgList});
                self.scrolling(300);
            }
        });
    }
    fristMsg(key,msgid,uid,dataTime,msg){
        let self = this;
        console.log('initSrorageMsg ');
        let currentItem = {id:msgid,uid:uid,dateTime:dataTime,msg:msg};
        let newMsgList = [];
        newMsgList.push(currentItem);
        self.setState({ messageList: newMsgList});
        storage.save({
            key:key,
            data:{
                allMessage: newMsgList
            }
        });
        this.setState({ inputValue: "" });
    }
    render(){
        return <View style={{backgroundColor:"#fff"}}>
            <FlatList style={styles.page}
                      ref={(flatList) => this._flatList = flatList}
                      data={this.state.messageList}
                /*      initialNumToRender={10}*/
                      ItemSeparatorComponent={this._separator}
                      onRefresh={this.refreshing}
                      refreshing={this.state.refreshing}
                      onEndReachedThreshold={0.1}
                      onEndReached={
                          this._onload
                      }
                      keyExtractor = {this._keyExtractor}
                      renderItem = {this._renderItem}
            />
            <View  style={styles.bottomToolBar}>
                <TextInput
                    style={[styles.input, {
                        height: Math.max(40, this.state.textInputHeight < 180 ? this.state.textInputHeight : 180 )
                    }]}
                    multiline={true}
                    controlled={true}
                    underlineColorAndroid="transparent"
                    returnKeyType="default"
                    value={this.state.inputValue}
                    placeholder="Type here to send message"
                    // ios only
                    enablesReturnKeyAutomatically={true}
                    onContentSizeChange={
                        (event) => {
                            // this.setState({textInputHeight: event.nativeEvent.contentSize.height});
                        }
                    }
                    onChangeText={ (text) => {
                        this.setState({ inputValue: text });
                    }}
                />
                <Button
                    title="发送"
                    style={styles.sendButton}
                    color="#20dc74"
                    textStyle={styles.sendButtonText}
                    disabled={!this.state.inputValue}
                    onPress={this._onSubmitEditing}
                >
                </Button>
            </View>

        </View>
    }
}

const styles = StyleSheet.create({
    page:{
        position:"relative",
        width:"100%",
        height:height-44-75,
        backgroundColor:'#fff'
    },
    cellItem:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft:14,
        paddingTop:16,
        paddingBottom:16
    },
    cellWrapper:{
        width:"100%",
        backgroundColor:"#fff",
    },

    bottomToolBar: {
        height:50,
        paddingHorizontal:5,
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: "#eee",
        backgroundColor:"#f4f4f4",
    },
    sendButton: {
        height:20,
        color:"#12ffa4",
        borderRadius:8
    },
    sendButtonText: {
        color: "#fff"
    },
    input: {
        flex: 1,
        // height:40,
        marginRight:10,
        color: "#333",
        fontSize: 14,
        backgroundColor:"#fff"
    },
    messageCell: {
        marginTop: 5,
        marginBottom: 5
    },
    messageCellText: {
        fontSize: 14
    },
    avatar: {
        borderRadius: 20,
        margin: 5,
        width: 40,
        height: 40
    },
    contentView: {
        borderRadius: 4,
        padding: 4,
        paddingHorizontal: 8,
        overflow: 'hidden',
        // flex: 1,
        maxWidth:260,
        margin: 5,
        justifyContent: 'center',
        backgroundColor:"red"
    },
    endBlankBlock: {
        margin: 10,
        width: 50,
        height: 40
    }
});