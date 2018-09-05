import React,{ Component } from 'react'
import {StyleSheet,View,Text, ScrollView,Image} from 'react-native'
import RNSwiper from 'react-native-3d-swiper'

export  default  class WayDetailSwiper extends  Component{
    constructor(props){
        super(props);
        this.state = {
            from:'西湖',
            to:'湘湖',
            plan:'一',
            total:12,
            distance:1.6,
            person:82,
            
        }
    }
   

    static navigationOptions = ({navigation})=>(
        {
            header:null
        }
    )

    render(){
        return(
                <View style={styles.page}>
                    <RNSwiper
                        minimumScale={0.7}  //scale of out of focus components
                        minimumOpacity={0.9} // opacity of out of focus components
                        overlap={30}  // the degree to which components overlap.
                        cardWidth={311} // the width of each component
                        duration={100} // animation duration on swipe
                        swipeThreshold={200}// minimum distance to swipe to trigger change in state
                        onSwipeUp={this.onSwipeUp}
                        onSwipeDown={this.onSwipeDown}
                        onPress={this.onPress}
                        onSwiped = {(index)=>{this.onSwiped(index)}}
                    >
                        <View style={styles.mapSlide}>
                            <View style={styles.first}>
                                <View style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}>
                                    <View style={styles.viewForLocation}>
                                        <Text style={styles.from}>{this.state.from}</Text>
                                        <Image source ={ require('../images/icon_status.png')} style={{width:17,height:15,marginLeft:17,marginRight:17}}/>
                                        <Text style={styles.to}>{this.state.to}</Text>
                                        <Text style={styles.plan}>（路线{this.state.plan}）</Text>
                                    </View>
                                    
                                </View>
                                <View style={styles.viewForText}>
                                    <Text style={styles.total}>全程{this.state.total}公里</Text>
                                    <Text style={styles.distance}>距离{this.state.distance}公里</Text>
                                    <Text style={styles.person}>{this.state.person}人正在跑步</Text>
                                </View>
                            </View>
                            <View style={styles.friend}>
                                <Text style={styles.friendText}>跑友</Text>
                                <View style={styles.friendImg}>
                                    {/* <Image/> */}
                                </View>
                            </View>
                        </View>
                        <View style={styles.mapSlide}>
                            <View style={styles.first}>
                                <View style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                }}>
                                    <View style={styles.viewForLocation}>
                                        <Text style={styles.from}>{this.state.from}</Text>
                                        <Image source ={ require('../images/icon_status.png')} style={{width:17,height:15,marginLeft:17,marginRight:17}}/>
                                        <Text style={styles.to}>{this.state.to}</Text>
                                        <Text style={styles.plan}>（路线{this.state.plan}）</Text>
                                    </View>
                                    
                                </View>
                                <View style={styles.viewForText}>
                                    <Text style={styles.total}>全程{this.state.total}公里</Text>
                                    <Text style={styles.distance}>距离{this.state.distance}公里</Text>
                                    <Text style={styles.person}>{this.state.person}人正在跑步</Text>
                                </View>
                            </View>
                            <View style={styles.friend}>
                                <Text style={styles.friendText}>跑友</Text>
                                <View style={styles.friendImg}>
                                    {/* <Image/> */}
                                </View>
                            </View>
                        </View>
                        
                        
                    </RNSwiper>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:'100%',
        backgroundColor:'#171a21',
        justifyContent:'flex-end',
        alignItems:'center',
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
    mapSlide:{
        width:'100%',
        height:124,
        marginLeft:0,
        marginRight:0,
        borderRadius:10,
        backgroundColor:'#fff',
        paddingLeft:12,
        paddingRight:12
    },
})
