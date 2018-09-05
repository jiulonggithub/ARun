import React,{ Component } from 'react'
import {StyleSheet,View,Text,TextInput,Image,TouchableOpacity, ScrollView,ToastAndroid} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import DialogSelected from '../component/AlertSelected';
import {wayDetails,lineMessage,commentAdd,addLine} from '../requests/http';

const selectedArr = ["拍照", "图库"];

export  default  class WayDetail extends  Component{
    constructor(props){
        super(props);
        this.state = {
            plan:'1',
            distance:1.6,
            person:82,
            image:null,
            builderHeader:null,
            view:null,
            commentHeader:null,
            commentName:'快乐的大长腿',
            commentYear:2017,
            commentMonth:11,
            commentDay:23,
            commentText:'国际动画设计公司开发公开数据公开数据高科技高考加分高考辅导机构开具经过考试机构贷款',
            detailsInfo:{},
            leaveMessageList:[
                {
                    "id": 1,
                    "type": "route",
                    "type_id": 1,
                    "content": "111",
                    "user_id": 1,
                    "comment_id": 0,
                    "created_at": null,
                    "updated_at": null,
                    "children": []
                },
                {
                    "id": 2,
                    "type": "route",
                    "type_id": 1,
                    "content": "222",
                    "user_id": 2,
                    "comment_id": 0,
                    "created_at": null,
                    "updated_at": null,
                    "children": []
                },
                {
                    "id": 6,
                    "type": "route",
                    "type_id": 1,
                    "content": "1111111111",
                    "user_id": 21,
                    "comment_id": 0,
                    "created_at": "2017-11-29 17:02:56",
                    "updated_at": "2017-11-29 17:02:56",
                    "children": []
                },
                {
                    "id": 7,
                    "type": "route",
                    "type_id": 1,
                    "content": "12312131213",
                    "user_id": 23,
                    "comment_id": 0,
                    "created_at": "2017-12-11 17:50:29",
                    "updated_at": "2017-12-11 17:50:29",
                    "children": []
                }
            ],
            inputMessage:"",
            inputting:false,
            pathID:null,
            type:'route',//评论的类型
            type_id:0 //评论的类型ID
        };

        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);
    }
   

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '路线详情',
            headerStyle:{
                backgroundColor:'#3c3a3f',
                height:44,
                elevation: 0,
                shadowOpacity: 0
            },
            headerTitleStyle:{
                fontSize:18
            },
            headerTintColor:'#fff',
            headerRight: (
                <TouchableOpacity
                style={{width:16,height:14,marginRight:16}} activeOpacity={0.8} 
                onPress={()=>{alert(111)}}>
                    <Image source={require('../images/icon_line.png')}
                style={{width:16,height:14}}/>
                </TouchableOpacity>
            ),
        }
    )

    _camera(){
        this.showAlertSelected();
    }

    showAlertSelected(){
        this.dialog.show("请选择图片", selectedArr, '#333333', this.callbackSelected);
    }
    callbackSelected(i){
        switch (i){
            case 0: // 拍照
                this.takePhoto();
                break;
            case 1: // 图库
                this.pickSimple();
                break;
        }
    }
    takePhoto(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
            });
        });
    }
    pickSimple(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height}
            });
        });
    }

    _renderImgItem(item){
        return (
            <View style={styles.headerBox}>
                <Image source={item} style={styles.headerIcon}/>
            </View>
        ) 
    }

    _renderBuilderHeader(item){
        return  <Image source={item} style={styles.headerIcon}/>
    }

    _renderView(item){
        return  <Image source={item} style={styles.headerIcon}/>
    }

    _add(){
        this.addLine(this.state.pathID);
    }

    // _renderView(item){
    //     return(
    //         <View style={styles.view}>
    //             <Image source={item} style={styles.imgLeft}/>   
    //             <View style={styles.imgLRight}>
    //                 <Image source={requireitem}  style={styles.imgTop}/>
    //                 <Image source={require(item)} s style={styles.imgBottom}/>
    //             </View>   
    //     </View> 
    //     ) 
    // }

    _comment(){
        this.setState({inputting:true});
    }

    _goNow(){
        if(this.state.inputting){
            this.commentAdd();
        }else {
            alert("立即出发");
        }
    }
    addLine(lineID){
        let _data = {
            route_id:lineID,
        };
        addLine(_data).then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                ToastAndroid.show('添加成功', ToastAndroid.SHORT);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    _getData(){
        
    }
    commentAdd(){
        let self = this;
        if(self.state.inputMessage.trim()!==""){
            let _data = {
                type: self.state.type,
                type_id: self.state.type_id,
                path_id: self.state.pathID,
                content: self.state.inputMessage
            };
            commentAdd(_data).then((res)=>{
                console.log(res);
                if(parseInt(res.data.errcode)===0){
                    self.setState({inputting:false});
                    ToastAndroid.show('评论成功', ToastAndroid.SHORT);
                    lineMessage(_data).then((res)=>{
                        console.log(res);
                        if(parseInt(res.data.errcode)===0){
                            self.setState({
                                leaveMessageList:res.data.data.result,
                                inputMessage:""
                            })
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            }).catch((err)=>{
               console.log(err);
            });
        }else {
            ToastAndroid.show('请输入评论', ToastAndroid.SHORT);
        }
    }

    componentDidMount(){
        let self = this;
        let wayID = this.props.navigation.state.params.wayid ? this.props.navigation.state.params.wayid:1;
        self.setState({pathID:wayID});
        let _data = {
            id:wayID
        };
        self.getLeaveMsg(wayID);
        wayDetails(_data).then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode) === 0){
                self.setState({detailsInfo:res.data.data[0]})
            }else {
                alert(res.data.msg);
            }
        }).catch((err)=>{
            console.log(err);
        })

    }

    getLeaveMsg(lineID){
        let self = this;
        let _data = {
            type:self.state.type,
            type_id:self.state.type_id,
            path_id:lineID
        };
        console.log(_data);
        lineMessage(_data).then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                self.setState({leaveMessageList:res.data.data.result})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    inputMessageChange(e){
        this.setState({inputMessage:e})
    }
    renderInputBox(isshow){
        if(isshow){
            return <View style={styles.inputContainer}>
                <TextInput style={styles.inputDes} placeholder="请输入..." keyboardType="default" numberOfLines = {4} multiline = {true}
                           value={this.state.inputMessage} onChangeText={(e) => this.inputMessageChange(e)}
                           placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={120}>
                </TextInput>
            </View>
        }
    }
    rederMessageCell(item,i){
        return <View style={styles.commentHeader} key={i}>
            <View style={styles.commentHeaderIcon}>
                {/* 头像 */}
            </View>
            <View>
                <View style={styles.commentHeaderRight}>
                    <Text style={styles.commentName}>{this.state.commentName}</Text>
                    <Text style={styles.commentYear}>{item.created_at?item.created_at.split(" ")[0]:"未知时间"}</Text>
                </View>
                <Text style={styles.commentText}>{item.content}</Text>
            </View>
        </View>
    }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View style={styles.page}>
            <ScrollView>
                <View style={styles.top}>
                    <View style={styles.first}>
                        <View style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                        }}>
                            <View style={styles.viewForLocation}>
                                <Text style={styles.from}>{this.state.detailsInfo.origin_name}</Text>
                                <Image source ={ require('../images/icon_status.png')} style={{width:17,height:15,marginLeft:17,marginRight:17}}/>
                                <Text style={styles.to}>{this.state.detailsInfo.destination_name}</Text>
                                <Text style={styles.plan}>（路线{this.state.plan}）</Text>
                            </View>
                            <TouchableOpacity style={styles.add}  onPress={()=>{this._add()}} activeOpacity={0.8}>
                                <Text style={styles.addText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.viewForText}>
                            <Text style={styles.total}>全程{this.state.detailsInfo.total_distance}公里</Text>
                            <Text style={styles.distance}>距离{this.state.distance}公里</Text>
                            <Text style={styles.person}>{this.state.person}人正在跑步</Text>
                        </View>
                    </View>
                    <View style={styles.second}>
                        <View style={styles.friend}>
                            <Text style={styles.friendText}>跑友</Text>
                            <View style={styles.friendImg}>
                                {/* <Image/> */}
                            </View>
                        </View>
                        <View style={styles.build}>
                            <View style={styles.buildLeft}>
                                <View style={{width:32,height:32,backgroundColor:'#eee',borderRadius:16}}>
                                    {this._renderBuilderHeader(this.state.builderHeader)}
                                </View>
                                <Text style={styles.builder}>{this.state.detailsInfo.creator}</Text>
                                <Text style={styles.data}>创建于{this.state.detailsInfo.created_at?this.state.detailsInfo.created_at.split(" ")[0]:"未知时间"}</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.feedBack}  onPress={()=>navigate('FeedBack')} activeOpacity={0.8}>
                                    <Text style={styles.feedBackText}>反馈</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.middle}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>路线照片</Text>
                        <TouchableOpacity activeOpacity={0.8} >
                            <Image source={require('../images/icon_camera.png')} style={{width:16,height:14}}/>        
                        </TouchableOpacity>
                    </View>  
                    <View style={styles.view}>
                        {/* {this._renderView(this.state.view)} */}
                            <Image source={require('../images/icon_camera.png')} style={styles.imgLeft}/>   
                            <View style={styles.imgLRight}>
                                <Image source={require('../images/icon_camera.png')}  style={styles.imgTop}/>
                                <Image source={require('../images/icon_camera.png')} s style={styles.imgBottom}/>
                            </View>   
                    </View>  
                </View>
                <DialogSelected ref={(dialog)=>{
                    this.dialog = dialog;
                }} />
                <View style={styles.bottom}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>评论留言</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._comment()}}>         
                            <Image source={require('../images/icon_comment.png')} style={{width:16,height:16}}/>        
                        </TouchableOpacity>
                    </View>  
                    <View style={styles.comment}>
                        {/*{this.state.leaveMessageList.map((item,i)=>{this.rederMessageCell(item,i)})}*/}
                        {this.state.leaveMessageList.map((item,i)=>this.rederMessageCell(item,i))}
                    </View>
                </View>
            </ScrollView>
                {this.renderInputBox(this.state.inputting)}
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{this._goNow()}} style={styles.goNow}>         
                <Text style={styles.goNowText}>{this.state.inputting?'评论':"立即出发"}</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        position:"relative",
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5',
    },
    top:{
        backgroundColor:'#fff',
        paddingLeft:16,
        paddingRight:16,
    },
    first:{
        paddingTop:16,
        paddingBottom:16,
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    viewForLocation:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    from:{
        fontSize:16,
        color:"#333",
    },
    to:{
        fontSize:16,
        color:"#333",
    },
    plan:{
        fontSize:12,
        color:"#999",
        marginLeft:16
    },
    add:{
        width:64,
        height:32,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#20dc74",
        borderRadius:16,
    },
    addText:{
        fontSize:24,
        color:"#fff",
    },
    viewForText:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        marginTop:10
    },
    total:{
        fontSize:12,
        color:"#666",
    },
    distance:{
        fontSize:12,
        color:"#666",
    },
    person:{
        fontSize:12,
        color:"#666",
    },
    friend:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:"center",
        height:52
    },
    build:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
    },
    friendText:{
        fontSize:14,
        color:"#333",
        marginRight:76
    },
    friendImg:{

    },
    headerIcon:{
        width:32,
        height:32,
    },
    headerBox:{
        width:32,
        height:32,
        borderRadius:16
    },
    builder:{
        fontSize:12,
        color:"#333",
        marginLeft:16,
        marginRight:6
    },
    data:{
        fontSize:12,
        color:"#999",
    },
    feedBack:{
        width:64,
        height:32,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:16,
        borderWidth:1,
        borderColor:'#eee'
    },
    feedBackText:{
        fontSize:12,
        color:"#999",
    },
    buildLeft:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:"center",
        height:52
    },
    titleText:{
        fontSize:16,
        color:"#333",
    },
    title:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    middle:{
        marginTop:5,
        backgroundColor:'#fff',
        paddingLeft:16,
        paddingRight:16,
        paddingTop:16,
        paddingBottom:20
    },
    view:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:16
    },
    imgLeft:{
        width:230,
        height:140,
    },
    imgTop:{
        width:105,
        height:66,
    },
    imgBottom:{
        width:105,
        height:66
    },
    imgLRight:{
        justifyContent:'space-between'
    },
    bottom:{
        marginTop:5,
        backgroundColor:'#fff',
        paddingLeft:16,
        paddingRight:16,
        paddingTop:16,
    },
    comment:{
        marginTop:16
    },
    commentHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    commentHeaderIcon:{
        width:32,
        height:32,
        borderRadius:16,
        backgroundColor:'#eee',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    commentName:{
        color:"#333",
    },
    commentYear:{
        fontSize:12,
        color:"#999",
    },
    commentHeaderRight:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    commentText:{
        width:295,
        color:"#999",
    },
    goNow:{
        width:'100%',
        height:49,
        backgroundColor:"#20dc74",
        justifyContent:'center',
        
    },
    goNowText:{
        color:"#fff",
        fontSize:16,
        textAlign:'center'
    },
    inputContainer:{
        width:'100%',
    },
    inputDes: {
        padding: 14,
        textAlignVertical: 'top',
        lineHeight: 18,
        color: "#fff",
        backgroundColor: "#292c32"
    },

});

