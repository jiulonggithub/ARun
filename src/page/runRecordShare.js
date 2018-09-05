import React, { Component } from 'react';
import {StyleSheet,Text,Modal,PixelRatio,View,Image,TouchableOpacity} from 'react-native';


export default class runRecordShare extends Component {

  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      animationType: 'none',//none slide fade
      modalVisible: false,//模态场景是否可见
      transparent: true,//是否透明显示
      strangers:80,
      friends:2,
      cal:1540,
      mile:'82"01',
      time:'01:12:47',
      people:23
    };
  }

  static navigationOptions = ({navigation})=>(
    {
      headerTitle: '跑步成绩',
      headerStyle:{
          backgroundColor:'#171a21',
          height:44,
          elevation: 0,
          shadowOpacity: 0,
          
      },
      headerTitleStyle:{
          fontSize:18
      },
      headerTintColor:'#fff',
      headerRight: (<Image source={require('../images/icon_fire.png')} style={{width:17,height:20,marginRight:16}}/>),
      headerLeft: (<TouchableOpacity>
          <Image source={require('../images/icon_x.png')} style={{width:14,height:14,marginLeft:16}}/>
      </TouchableOpacity>)
    }
  )

  onPressBack(){
    alert('返程')
  }

  onPressWechatShare(){
    alert('QQ分享')
  }

  onPressWeiboShare(){
    alert('QQ分享')
  }

  onPressQQZoneShare(){
    alert('QQ分享')
  }

  onPressQQShare(){
    alert('QQ分享')
  }

  onPressFriendsShare(){
    alert('QQ分享')
  }

  onPressLinkShare(){
    alert('QQ分享')
  }

  goHomeByBike(){
    alert('bike')
  }

  goHomeByTaxi(){
    alert('taxi')
  }

  goHomeByBus(){
    alert('bus')
  }

  
  

  render() {
    let modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.9)' : 'red',
    };
    let innerContainerTransparentStyle = this.state.transparent
      ? { backgroundColor: 'rgba(0, 0, 0, 0)'}
      : null;

    return (

      <View style={{ alignItems: 'center', flex: 1 }}>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => { this._setModalVisible(false) } }
          //onShow={this.startShow}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <View style={styles.viewForShareIconTop}>
                <TouchableOpacity onPress={()=>{this.onPressQQShare()}}>
                  <View style={styles.qq}>
                    <Image source={require('../images/icon_qq_share.png')}   style={styles.qqShare}/>                    
                  </View>
                  <Text style={styles.text}>QQ好友</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.onPressWechatShare()}}>
                  <View style={styles.wechat}>
                    <Image source={require('../images/icon_wechat_share.png')}   style={styles.wechatShare}/>                   
                  </View>
                  <Text style={styles.text}>微信好友</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.onPressWeiboShare()}}>
                  <View style={styles.weibo}>
                    <Image source={require('../images/icon_weibo_share.png')}   style={styles.weiboShare}/>
                  </View>
                  <Text style={styles.text}>微博</Text> 
                </TouchableOpacity>
              </View>

              <View style={styles.viewForShareIconBottom}>
                <TouchableOpacity onPress={()=>{this.onPressQQZoneShare()}}>
                  <View style={styles.qqZone}>
                    <Image source={require('../images/icon_qq_zone.png')}   style={styles.qqZoneShare}/>
                  </View>
                  <Text style={styles.text}>QQ空间</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.onPressFriendsShare()}}>
                    <View style={styles.qqFriends}>
                      <Image source={require('../images/icon_wechat_friends.png')}   style={styles.qqFriendsShare}/>
                    </View>
                    <Text style={styles.text}>朋友圈</Text> 
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.onPressLinkShare()}}>
                    <View style={styles.link}>
                      <Image source={require('../images/icon_link.png')}   style={styles.linkShare}/>
                    </View>
                    <Text style={styles.text}>复制链接</Text> 
                  </TouchableOpacity>
                </View>

              <TouchableOpacity onPress={this._setModalVisible.bind(this,false) } >
                <Image source={require('../images/icon_x.png')} style={{width:14,height:14}}/>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>



          <View style={styles.page}>
                <Text style={styles.textTop}>本次运动你错过了 {this.state.strangers} 可能相遇的陌生人,却获得了 {this.state.friends} 个好朋友</Text>
                <Text style={styles.textBottom}>本次卡路里</Text>
                <View style={styles.totalBox}>
                    <Text style={styles.totalText}>
                        {this.state.cal}
                        <Text style={styles.cal}>  cal</Text>
                    </Text>
                </View>
                <View style={styles.viewForIcon}>
                    <Image source={require('../images/icon_mile.png')} style={{width:15,height:14}}/>
                    <Image source={require('../images/icon_time.png')} style={{width:15,height:14}}/>
                    <Image source={require('../images/icon_strangers.png')} style={{width:14,height:14}}/>
                </View>
                <View style={styles.viewForNum}>
                    <Text style={styles.num}>{this.state.mile}</Text>
                    <Text style={styles.num}>{this.state.time}</Text>
                    <Text style={styles.num}>{this.state.people}</Text>
                </View>
                <View style={styles.viewForBotton}>
                    <TouchableOpacity style={styles.btn1} onPress={()=>{this.onPressBack()}}>
                        <Text style={styles.btnText1}>返程</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn2}   onPress={this._setModalVisible.bind(this, true) }>
                        <Text style={styles.btnText2} >分享</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.lazy}>偷懒一下，马上回家</Text>
                <View>
                    <View style={styles.viewForTransport}>
                       <View style={{width:56,height:56,borderRadius:28,backgroundColor:'#292c32',marginLeft:28}}>
                            <TouchableOpacity onPress={()=>{this.goHomeByBike()}}>
                                <Image source={require('../images/icon_bike.png')} style={{width:20,height:15,marginLeft:17,marginTop:19}}/>
                            </TouchableOpacity>
                       </View>
                        <View style={{width:56,height:56,borderRadius:28,backgroundColor:'#292c32'}}>
                            <TouchableOpacity onPress={()=>{this.goHomeByTaxi()}}>
                                <Image source={require('../images/icon_taxi.png')} style={{width:20,height:20,marginLeft:17,marginTop:18}}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:56,height:56,borderRadius:28,backgroundColor:'#292c32',marginRight:28}}>
                           <TouchableOpacity onPress={()=>{this.goHomeByBus()}}>
                                <Image source={require('../images/icon_bus.png')} style={{width:18,height:18,marginLeft:19,marginTop:19}}/>
                           </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

      </View>
    );
  }


  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  startShow=()=>{
    alert('开始显示了');
  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
  },
  

  page: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  zhifu: {
    height: 150,
  },

  flex: {
    flex: 1,
  },
  at: {
    borderWidth: 1 / PixelRatio.get(),
    width: 80,
    marginLeft:10,
    marginRight:10,
    borderColor: '#18B7FF',
    height: 1,
    marginTop: 10

  },
  date: {
    textAlign: 'center',
    marginBottom: 5
  },
  station: {
    fontSize: 20
  },
  mp10: {
    marginTop: 5,
  },
  btn: {
    width: 60,
    height: 30,
    borderRadius: 3,
    backgroundColor: '#FFBA27',
    padding: 5,
  },
  btn_text: {
    lineHeight: 18,
    textAlign: 'center',
    color: '#fff',
  },
  page:{
    position:"relative",
    width:"100%",
    height:"100%",
    backgroundColor:'#171a21',
    paddingLeft:16,
    paddingRight:16,
},
  textTop:{
      lineHeight:28,
      fontSize:16,
      color:'#fff',
      marginTop:7
  },
  textBottom:{
      lineHeight:30,
      color:'#555',
      fontSize:16
  },
  totalBox:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      marginTop:20,
      marginBottom:34
  },
  totalText:{
      fontSize:40,
      fontWeight:'800',
      color:"#fff"
  },
  cal:{
      fontSize:14,
      fontWeight:'normal',
      color:"#fff",
      marginLeft:10
  },
  viewForIcon:{
      flexDirection:"row",
      justifyContent:'space-between',
      marginLeft:45,
      marginRight:45,
  },
  viewForNum:{
      flexDirection:"row",
      justifyContent:'space-between',
      marginLeft:31,
      marginRight:44,
      marginTop:14
  },
  num:{
      fontSize:20,
      color:'#666'
  },
  viewForBotton:{
      flexDirection:"row",
      justifyContent:'space-between',
      marginTop:56
  },
  btn1:{        
      width:160,
      height:44,
      backgroundColor:'#171a21',
      borderWidth:2,
      borderColor:'#20dc74',
      borderRadius:80,
      justifyContent:'center',
      alignItems:'center'

  },
  btnText1:{
      fontSize:18,
      color:'#fff'
  },
  btn2:{
      width:160,
      height:44,
      backgroundColor:'#20dc74',
      borderRadius:80,
      justifyContent:'center',
      alignItems:'center'

  },
  btnText2:{
      fontSize:18,
      color:'#fff'
  },
  lazy:{
      fontSize:16,
      color:'#fff',
      width:158,
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:36,
  },
  viewForTransport:{
      flexDirection:"row",
      justifyContent:'space-between',
      marginTop:32
  },
  viewForShareIconTop:{
    width:272,
    marginLeft:'auto',
    marginRight:'auto',
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:112

  },
  viewForShareIconBottom:{
    width:272,
    marginLeft:'auto',
    marginRight:'auto',
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:112
  },
  qq:{
    width:56,
    height:56,
    backgroundColor:'#3facf1',
    borderRadius:28,
  },
  wechat:{
    width:56,
    height:56,
    backgroundColor:'#2eb544',
    borderRadius:28,
  },
  weibo:{
    width:56,
    height:56,
    backgroundColor:'#f2603f',
    borderRadius:28,
  },
  qqZone:{
    width:56,
    height:56,
    backgroundColor:'#f8a53a',
    borderRadius:28,
  },
  qqFriends:{
    width:56,
    height:56,
    backgroundColor:'#0cb959',
    borderRadius:28,
  },
  link:{
    width:56,
    height:56,
    backgroundColor:'#fff',
    borderRadius:28,
  },
  text:{
    width:56,
    textAlign:'center',
    marginTop:11,
    marginBottom:33,
    fontSize:12,
    color:'#fff'
  },
  qqShare:{
    marginLeft:18,
    marginTop:18,
    width:20,
    height:20
  },
  wechatShare:{
    marginLeft:17,
    marginTop:20,
    width:22,
    height:17,
  },
  weiboShare:{
    marginLeft:17,
    marginTop:20,
    width:22,
    height:18,
  },
  qqZoneShare:{
    marginLeft:16,
    marginTop:17,
    width:22,
    height:22,
  },
  qqFriendsShare:{
    marginLeft:17,
    marginTop:17,
    width:22,
    height:22,
  },
  linkShare:{
    marginLeft:18,
    marginTop:18,
    width:20,
    height:20,
  },
});

