import React,{ Component } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image,PanResponder ,Dimensions,Button, ScrollView,Modal} from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import Distance from '../component/Distance';
import Time from '../component/Time';
import Cal from '../component/Cal';
import RNSwiper from 'react-native-3d-swiper'
import {getMyLine,TotalProfit} from '../requests/http'
let {width,height} = Dimensions.get('window');
let mapItemImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513332279227&di=54fba6911208c5cf5dcd2b45d9e0eb29&imgtype=0&src=http%3A%2F%2Fa1.att.hudong.com%2F43%2F36%2F01300000735126126752369184257.jpg';

export default class RunningSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'山河',
            way:5,
            modalVisible: false,
            transparent: true,
            freeRun:true, //true =>（自由设定跑步）, false => 按照地图线路跑
            currentMapIndex:0,
            mapList:[],
            orginList:[],
            distance:0,
            setDistance:10,
            setTime:0,
            setCal:0,
            currentSettingIndex:0
        }
        // this._panResponder = {};
        // this._previousHeight =  0;
        // this._circleStyles = {};
        // this.circle = (null : ?{ setNativeProps(props: Object): void });
        // this.show = false;

    };

    // componentWillMount() {
    //     this._panResponder = PanResponder.create({
    //         onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    //         onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    //         onPanResponderGrant: this._handlePanResponderGrant,
    //         onPanResponderMove: this._handlePanResponderMove,
    //         onPanResponderRelease: this._handlePanResponderEnd,
    //         onPanResponderTerminate: this._handlePanResponderEnd,
    //     });
    //     this._previousHeight = 0;
    //     this._circleStyles = {
    //         style: {
    //             height: this._previousHeight,
    //             backgroundColor: 'green',
    //         }
    //     };
    // }

    // componentDidMount(){
    //     this._updateNativeStyles();
    // }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });
    
    newMessages(){
        alert('newMessages')
    }
    onSwipeUp(index){
        //parameter returned is the index of active child
        console.log(index)
    }

    onSwipeDown(index){
        //parameter returned is the index of active child
        console.log(index)
    }

    onPress(index){
        //parameter returned is the index of active child
        console.log(index)
    }
    onSwiped(index){
        console.log('index',index);
        this.setState({currentMapIndex:index});
    }
    getTotal(){
        let self = this;
        TotalProfit().then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
               if(res.data.data.length>0){
                   self.setState({distance:res.data.data[0].total_returns})
               }
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    getLineList(){
        let self = this;
        getMyLine().then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                if(res.data.data.length>0){
                    self.setState({orginList:res.data.data});
                    let _list = [];
                    for(let i=0;i<self.state.orginList.length;i++){
                        let tmp = self.state.orginList[i];
                        let item = {};
                        item.origin_name = tmp.origin_name;
                        item.destination_name = tmp.destination_name;
                        item.mapUrl = tmp.resource.resource;
                        item.id = tmp.id;
                        item.direct_distance = tmp.direct_distance;
                        _list.push(item);
                    }
                    self.setState({mapList:_list});
                    console.log(self.state.mapList);
                }
            }else {
                alert(res.data.msg)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    componentDidMount(){
        this.getTotal();
        this.getLineList();
    }
    _renderSliderItem(item,i){
        return <View style={styles.mapSlide} key={i}>
            <Image source={{uri:'http://'+item.mapUrl}} style={styles.mapItem} />
        </View>
    }
    _renderRunType(type){
        if(type){
            return (
                <View style={styles.mapContainer}>
                    <TouchableOpacity style={styles.setting} activeOpacity={0.8} onPress={this._setModalVisible.bind(this, true) }>
                        <Image source={require('../images/icon_botton.png')} style={styles.bottonImg}/>
                        <Text style={styles.bottonText}>跑步设定</Text>
                    </TouchableOpacity>
                </View>
            )
        }else {
            if(this.state.mapList.length>0){
                return <View style={styles.mapContainer}>
                    <RNSwiper
                        minimumScale={0.7}  //scale of out of focus components
                        minimumOpacity={0.9} // opacity of out of focus components
                        overlap={30}  // the degree to which components overlap.
                        cardWidth={280} // the width of each component
                        duration={100} // animation duration on swipe
                        swipeThreshold={200}// minimum distance to swipe to trigger change in state
                        onSwipeUp={this.onSwipeUp}
                        onSwipeDown={this.onSwipeDown}
                        onPress={this.onPress}
                        onSwiped = {(index)=>{this.onSwiped(index)}}
                    >
                        {this.state.mapList.map((item,i)=>this._renderSliderItem(item,i))}
                    </RNSwiper>
                    <View style={styles.mapTextBox}>
                        <Text style={styles.runAddress}>{this.state.mapList[this.state.currentMapIndex].origin_name}</Text>
                        <Image source={require('../images/run-icon.png')} style={styles.runIcon}/>
                        <Text style={styles.runAddress}>{this.state.mapList[this.state.currentMapIndex].destination_name}</Text>
                    </View>
                    <Text style={[styles.runAddress,{marginTop:8}]}>{this.state.mapList[this.state.currentMapIndex].direct_distance}公里</Text>
                </View>
            }else {
                return <View style={[styles.mapContainer,{flexDirection:"row",alignItems:"center",justifyContent:"center"}]}>
                    <Text style={{textAlign:"center",fontSize:14,color:"#fff"}}>未收藏线路</Text>
                </View>
            }
        }
    }
    _beginRun(){
        let self =this;
        if(self.state.freeRun){
            alert("自由模式")
        }else {
            if(self.state.mapList.length > 0){
                let lineID = self.state.mapList[self.state.currentMapIndex].id;
                alert(lineID);
            }else {
                alert("没有路线，请选择自由模式");
            }
        }
    }
    _setDistance = (e)=>{
        let self = this;
        console.log(e);
        self.setState({setDistance:e});
        self.setState({currentSettingIndex:1});
    };
    _setTime = (e)=>{
        let self = this;
        console.log(e);
        self.setState({setTime:e});
        self.setState({currentSettingIndex:2});
    };
    _setCal = (e)=>{
        let self = this;
        console.log(e);
        self.setState({setCal:e});
        // self.setState({modalVisible:false});
    };
    render(){
        const { navigate } = this.props.navigation;
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.9)' : 'red',
          };
          let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: 'rgba(0, 0, 0, 0)'}
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
                    <View style={[styles.modalContainer, modalBackgroundStyle]}>
                        <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                            <View style={styles.innerSetting} >
                                <View style={{height:200}}>
                                    <ScrollView onTouchStart={this._setModalVisible.bind(this, false) }
                                    
                                    >
                                    </ScrollView>
                                </View>
                                
                                <ScrollableTabView
                                    style={styles.container}
                                    renderTabBar={() => <DefaultTabBar />}
                                    tabBarUnderlineStyle={styles.lineStyle}
                                    initialPage={this.state.currentSettingIndex}
                                    tabBarActiveTextColor='#20dc74'
                                    tabBarInactiveTextColor='#999'
                                    >
                                    <Distance tabLabel='距离' parentCallBack={(e)=>{this._setDistance(e)}} distance={this.state.setDistance}/>
                                    <Time tabLabel='时长' parentCallBack={(e)=>{this._setTime(e)}} time={this.state.setTime}/>
                                    <Cal tabLabel='热量' parentCallBack={(e)=>{this._setCal(e)}} cal={this.state.setCal}/>
                                </ScrollableTabView>
                               
                            </View> 
                        </View>
                    </View>
                </Modal>

            <View style={styles.page}>
            <ScrollView>
            {/*{...this._panResponder.panHandlers} */}
            
                {/* <View  style={styles.circlePic}
                        ref={(circle) => {
                            this.circle = circle;
                        }}
                    >
                    <View style={styles.modal}>
                        
                    </View>
                </View> */}
                <View style={{paddingHorizontal:16}}>
                    <View style={styles.header} >
                        <View style={{flexDirection:'row',}}>
                            <View style={styles.headBox} >
                                <Image source={require('../images/icon_head.png')} style={{width:32,height:32}}/>
                            </View>
                            <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}}>{this.state.name}</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{this.newMessages()}}>
                            <Image source={require('../images/icon_bell.png')} style={{width:17,height:21}}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.mileText}>总公里</Text>

                    <View style={styles.viewForMile}>
                        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                            <Text style={styles.mile}>{this.state.distance}</Text>
                            <Text style={styles.km}>KM</Text>
                        </View>

                        <View style={styles.circle}>
                            <TouchableOpacity style={styles.viewForLocation} activeOpacity={0.8} onPress={()=>{this.newMessages()}}>
                                <Image source={require('../images/location.png')} style={{width:14,height:17}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.viewForShopping} activeOpacity={0.8} onPress={()=>{this.newMessages()}}>
                                <Image source={require('../images/shopping_mall.png')} style={{width:16,height:16}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.viewForSwift} activeOpacity={0.8} onPress={()=>{this.setState({freeRun:!this.state.freeRun})}}>
                                <Image source={require('../images/swift.png')} style={{width:16,height:17}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {this._renderRunType(this.state.freeRun)}
                <TouchableOpacity style={styles.go} activeOpacity={0.8} onPress={()=>{this._beginRun()}}>
                    <Image source={require('../images/go.png')} style={styles.goImg}/>
                </TouchableOpacity>
                {/*<ScrollView onScroll={()=>console.log('上滑')}>
                    <View style={styles.viewForSlide}>
                            <Image source = {require ('../images/icon_slide.png')} style={styles.slide}/>
                            <Text style={styles.slideText}>上划查看附近{this.state.way}条线路</Text>
                    </View>
                </ScrollView>*/}

                </ScrollView>
                </View>  
            </View>
        )
    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    // _highlight(){
    //     this._circleStyles.style.backgroundColor = 'rgba(0,0,0,0.03)';
    //     this._updateNativeStyles();
    // }

    // _unHighlight(){
    //     this._circleStyles.style.backgroundColor = 'transparent';
    //     this._updateNativeStyles();
    // }

    // _updateNativeStyles(){
    //     this.circle && this.circle.setNativeProps(this._circleStyles);
    // }

    // _handleStartShouldSetPanResponder = (e: Object, gestureState: Object): boolean => {
    //     // Should we become active when the user presses down on the circle?
    //     return true;
    // }

    // _handleMoveShouldSetPanResponder = (e: Object, gestureState: Object): boolean =>{
    //     // Should we become active when the user moves a touch over the circle?
    //     return true;
    // }

    // _handlePanResponderGrant = (e: Object, gestureState: Object) =>{
    //     this._highlight();
    // }
    // _handlePanResponderMove = (e: Object, gestureState: Object) =>{
    //     if(this.show && gestureState.dy > 0 || !this.show && gestureState.dy < 0){
    //         this._circleStyles.style.height = this._previousHeight - gestureState.dy;
    //         this._updateNativeStyles();
    //     }

    // }
    // _handlePanResponderEnd = (e: Object, gestureState: Object) =>{
    //     this._unHighlight();
        
    //     if( gestureState.dy <= 50 && this.show){
    //         this._circleStyles.style.height = 0;
    //         this.show = true;
    //         this._updateNativeStyles();
            
    //     }else if( gestureState.dy <= 50 && !this.show){
    //         this._circleStyles.style.height = height;
    //         this.show = false;
    //         this._updateNativeStyles();
    //     }else{
    //         this._circleStyles.style.height = this.show?height:0;
    //         this._updateNativeStyles();
    //     }
    //     this._previousHeight = this._circleStyles.style.height;
    // }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
    },

    page:{
        width:"100%",
        height:'100%',
        backgroundColor:'#171a21',
        /*paddingLeft:16,
        paddingRight:16,*/
        flex: 1,
        alignItems:'stretch',
        elevation:1,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:44
    },
    headBox:{
        width:32,
        height:32,
        borderRadius:16,
        backgroundColor:"#ededed",
        overflow:"hidden",
        marginRight:17,
        
    },
    mileText:{
        marginTop:42,
        marginBottom:20,
        fontSize:12,
        color:'#999'
    },
    viewForMile:{
        flexDirection:'row',
        justifyContent:'space-between',
        position:'relative',
    },
    mile:{
        fontSize:42,
        color:'#fff',
        marginTop:10
    },
    km:{
        fontSize:12,
        color:'#fff',
    },
    circle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    viewForLocation:{
        width:48,
        height:48,
        backgroundColor:'#f2cf29',
        borderRadius:24,  
        justifyContent:'center',
        alignItems:'center',
    },
    viewForShopping:{
        width:48,
        height:48,
        backgroundColor:'#20dc74',
        borderRadius:24,  
        marginLeft:27,
        justifyContent:'center',
        alignItems:'center',
    },
    viewForSwift:{
        width:48,
        height:48,
        backgroundColor:'#6a52ec',
        borderRadius:24,  
        marginLeft:27,
        justifyContent:'center',
        alignItems:'center',
    },
    setting:{
        width:240,
        height:44,
        borderRadius:22, 
        borderColor:'#20dc74', 
        borderWidth:2,
        backgroundColor:'#171a21',
        marginLeft:'auto',
        marginRight:'auto',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:80
    },
    bottonImg:{
        width:18,
        height:17,
        
    },
    bottonText:{
        fontSize:16,
        color:'#20dc74',
        marginLeft:8
    },
    go:{
        width:240,
        height:44,
        borderRadius:22, 
        marginLeft:'auto',
        marginRight:'auto'
    },
    goImg:{
        width:240,
        height:44,
    },
    // circlePic: {
    //     justifyContent:'flex-end',
    //     width:width,
    //     height:height,
    //     position:'absolute',
    //     bottom:0,
    //     left:0,
    //     elevation:10,
    //     alignItems:'center',
    // },
    viewForSlide:{
        justifyContent:'center',
        alignItems:'center',
    },
    slide:{
        width:13,
        height:9,
        marginTop:35,
        marginBottom:11,
    },
    slideText:{
        fontSize:12,
        color:'#999',
        
    },
    modalContainer:{
        width:'100%',
        height:'100%',
    },
    container: {
        width:width,
        height:800,
        backgroundColor: '#fff',
        borderTopLeftRadius:6,
        borderTopRightRadius:6,
        
    },
    lineStyle: {
        width:10,
        height: 2,
        backgroundColor: '#20dc74',
        marginLeft:59
    },
    mapContainer:{
        width:width,
        height:164,
        paddingTop:20,
        marginBottom:40
    },
    mapWrapper:{
        width:'80%',
        marginLeft:"auto",
        marginRight:"auto",
    },
    mapSlide:{
        width:'100%',
        height:124,
        marginLeft:0,
        marginRight:0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    mapItem:{
        width: '100%',
        height: '100%',
        borderRadius:10
    },
    mapTextBox:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        marginTop:10
    },
    runIcon:{
        width:17,
        height:15,
        marginHorizontal:8
    },
    runAddress:{
        fontSize:10,
        color:"#fff",
        textAlign:'center'
    }
})