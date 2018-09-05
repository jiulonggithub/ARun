import React,{ Component } from 'react'
import {StyleSheet,View,Text,Platform} from 'react-native'
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');

export  default  class TotalRecord extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            apple:[2, 4, 7, 2, 2, 7, 13, 16],
           
        }
    }


    render() {
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
            <View style={styles.container}>
                <Echarts option={option} height={300} width={width} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
        
        
})