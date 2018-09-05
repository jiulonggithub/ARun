import React,{ Component } from 'react'
import {StyleSheet,
    View,
    Text,
    Platform,
    ScrollView,
    TouchableOpacity,
    Button,
    FlatList,
    Image,
} from 'react-native'
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');

export  default  class MonthRecord extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            apple:[2, 4, 7, 2, 2, 7, 13, 16],
            year:2017,
            month:3,
            mile:9,
            cal:420500,
            time:'00:40:00',
            startMonth:11,
            startDay:13,
            endMonth:11,
            endDay:19,
           
        }
    }

    _flatList;
    
     _renderItem = (item) => {

       return (
        <View style={styles.list}>
            <View style={styles.listLeft}>
                <View style={styles.everyWeekLeft}>
                    <Text>{this.state.startMonth}月</Text>
                    <Text>{this.state.startDay}日 - </Text>
                </View>
                <View style={styles.everyWeeRight}>
                    <Text>{this.state.endMonth}月</Text>
                    <Text>{this.state.endDay}日</Text>
                </View>
            </View>
            <View  style={styles.calArrow}>
                <Text style={styles.listRight}>{this.state.cal}cal</Text>
                <Image source = {require ('../images/icon_right_arrow.png')} style={{width:6,height:12,marginLeft:20}}/>
            </View>
    </View>
       )
     }
    
    
     _separator = () => {
       return <View style={{height:1,backgroundColor:'#eee'}}/>;
     }
    


    render() {

        let data = [];
        for (var i = 0; i < 10; i++) {
          data.push({key: i, title: i + ''});
        }

        const option = {
            //点击某一个点的数据的时候，显示出悬浮窗
            // tooltip : {
            //     trigger: 'axis'
            // },
            //可以手动选择现实几个图标
            // legend: {
            //     data:['苹果','橘子']
            // },
            //各种表格
            toolbox: {
                //改变icon的布局朝向
                //orient: 'vertical',
                show : false,
                showTitle:false,
                feature : {
                    //show是否显示表格，readOnly是否只读
                    dataView : {show: false, readOnly: false},
                    magicType : {
                        //折线图  柱形图    总数统计 分开平铺
                        type: ['line', 'bar','stack','tiled'],
                    },
    
                }
            },
            xAxis : [
                {
                    //就是一月份这个显示为一个线段，而不是数轴那种一个点点
                    boundaryGap:true,
                    type : 'category',
                    name : '',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月'],
                    // 控制网格线是否显示
                    splitLine: {
                        show: false, 
                        //  改变轴线颜色
                        lineStyle: {
                            // 使用深浅的间隔色
                            color: ['red']
                        }                            
                    },
                    //  改变x轴颜色
                    axisLine:{
                        show:false,
                              
                    
                    },  
                    axisTick: {
                        show: false,
                          
                     },                          
                    //  改变x轴字体颜色和大小
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize:'12'
                        },
                    },                        
                    position:'top',
                    
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name : '单位：km',
                    nameTextStyle: {color:'#fff'},  
                    nameGap:40,
                    axisLine: {show: false},
                    // 去除y轴上的刻度线
                    axisTick: {
                            show: false
                    },                    
                    // 控制网格线是否显示
                    splitLine: {
                            show: false,
                            //  改变轴线颜色                  
                    },
                    //  改变y轴字体颜色和大小
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize:'12'
                        },
                    },   
                                  
                    
                }
            ],
            //图形的颜色组
            color:['#2bfc89'],
            //需要显示的图形名称，类型，以及数据设置
            series : [
                {
                    name:'苹果',
                    //默认显
                    type:'bar',
                    barWidth: '8%',
                    data:this.state.apple,
                    itemStyle: {
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[10, 10, 10, 10],
                        },
                        emphasis: {
                            color:'#f5fc2b'
                        }
                    }
                }
            ],
            
            
            
        };
    
        return(
            <View style={styles.page}>
                <ScrollView>
                    <View style={styles.container}>
                        <Echarts option={option} height={250} width={width} />
                    </View>
                    <View style={styles.bottomText}>
                        <View style={styles.viewForMonth}>
                            <Text style={styles.month}>{this.state.startMonth}月{this.state.startDay}日 - </Text>
                            <Text style={styles.month}>{this.state.endMonth}月{this.state.endDay}日</Text>
                        </View>
                        <View style={styles.viewForMile}>
                            <Text style={styles.mile}>{this.state.mile}</Text>
                            <Text style={styles.km}> km</Text>
                        </View>
                        <View style={styles.grayText}>
                            <Text style={styles.calText}>卡路里(千焦)</Text>
                            <Text style={styles.timeText}>运动时长(分钟)</Text>
                        </View>
                        <View style={styles.numText}>
                            <Text style={styles.calNum}>{this.state.cal}</Text>
                            <Text style={styles.timeNum}>{this.state.time}</Text>
                        </View>

                        <FlatList
                            ref={(flatList)=>this._flatList = flatList}
                            ItemSeparatorComponent={this._separator}
                            renderItem={this._renderItem}
                            data={data}
                            >
                        </FlatList>
                        
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:'100%'
    },
    container: {
        backgroundColor:'#171a21',

    },
    
    titleView:{
        height:Platform.OS=='ios'?64:44,
        paddingTop:Platform.OS=='ios'?14:0,
        backgroundColor:'#ff6400',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    title:{
        color:'white',
        fontSize:20,
        textAlign:'center',
    },
    bottomText:{
        width:'100%',
        padding:16,
        backgroundColor:'#fff',
    },
    month:{
        fontSize:18,
        marginTop:10,
        color:'#333'
    },
    viewForMile:{
        alignItems:"center",  
        flexDirection:"row",
        justifyContent:'center',
    },
    mile:{
        fontSize:52,
        color:'#333'
    },
    km:{
        fontSize:16,
        color:'#333',
        lineHeight:48
    },
    grayText:{
        flexDirection:"row",
        justifyContent:"center",


    },
    numText:{
        flexDirection:"row",
        justifyContent:"center",
        marginBottom:30
    },
    calText:{
        textAlign:'center',
        color:'#b6b6b6',
        fontSize:12,
        marginRight:103
    },
    timeText:{
        textAlign:'center',
        color:'#b6b6b6',
        fontSize:12,

    },
    calNum:{
        textAlign:'center',
        color:'#333',
        fontSize:16,
        width:72,
        marginRight:103,
        lineHeight:24
    },
    timeNum:{
        textAlign:'center',
        color:'#333',
        fontSize:16,
        width:72,
        lineHeight:24
    },   
    list:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        height:69
    },
    listLeft:{
        flexDirection:"row",
        justifyContent:'flex-start',

    },
    listRight:{

    },
    calArrow:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
    },
    everyWeekLeft:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
    },
    everyWeeRight:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
    },
    viewForMonth:{
        flexDirection:"row",
        justifyContent:'flex-start',
    }
})
        
        
