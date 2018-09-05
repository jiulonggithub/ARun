import React,{ Component } from 'react'
import {StyleSheet,
        View,
        Text,
        Platform,
        ScrollView,
        TouchableOpacity,
        FlatList,
        Image,
        Dimensions
    } from 'react-native'
import Echarts from 'native-echarts';
import {getDateRecord} from '../requests/http';
// import Dimensions from 'Dimensions';
const {width} = Dimensions.get('window');



export  default  class DayRecord extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            apple:[12, 14, 17, 12, 17, 23, 26],
            dataList:[],
            yTitle : ['11/29','11/30','12/31','1/1','1/2','1/3','1/4'],
            origYTitle:[],
            currentIndex:6,
            currentTitle:"",
            currentItem:null,
            orginData:{}
        }
    }

    _flatList;
    _echarts;
    _keyExtractor = (item, index) => item.id;
    _renderItemLeft(item){
        if(parseInt(item.item.type)===1){
            return <View style={styles.listLeft}>
                <Text>{item.item.origin_name}</Text>
                <Image source ={ require('../images/icon_status.png')} style={{width:17,height:15,marginLeft:15,marginRight:15}}/>
                <Text>{item.item.destination_name}</Text>
            </View>
        }else {
            return <Text>自由模式</Text>
        }
    }
     _renderItem = (item) => {
       return (
           <View style={styles.list}>
                <View style={styles.listLeft}>
                    {this._renderItemLeft(item)}
                </View>
                <View  style={styles.calArrow}>
                    <Text style={styles.listRight}>{item.item.calorie}cal</Text>
                    <Image source = {require ('../images/icon_right_arrow.png')} style={{width:6,height:12,marginLeft:20}}/>
                </View>
           </View>
       )
     };
    
    
     _separator = () => {
       return <View style={{height:1,backgroundColor:'#eee'}}/>;
     };
    
    componentDidMount(){
       /* let _data = new Date();
        let _time = _data.getFullYear()+"-"+(_data.getMonth()+1)+"-"+_data.getDate();*/
        this.getSomeDayRecord();//获取从今天起
    }

    tapEcharts(e){
        let self = this;
        // let _time = this.state.origYTitle[e.dataIndex];
        let _itemKey = self.state.yTitle[e.dataIndex];
        self.setState({currentTitle:_itemKey});
        self.setState({currentIndex:e.dataIndex});

        self.setState({currentItem:self.state.orginData[_itemKey]});
    }

    getSomeDayRecord(){
        let self = this;
        let _data= {
            status: '1',
        };
        getDateRecord(_data).then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                let _data = res.data.data;
                self.setState({orginData:_data});
                let _key =[];
                let _apple = [];
                for(let k in _data){
                   let _i =  _data[k].total_distance;
                    _apple.push(_i);
                    _key.push(k);
                }
                console.log(_apple);
                self.setState({apple:_apple});
                self.setState({yTitle:_key});
                self.setState({currentTitle:_key[self.state.currentIndex]});
                console.log(_key[self.state.currentIndex]);
                let _itemKey = _key[self.state.currentIndex];
                self.setState({currentItem:_data[_itemKey]});
                console.log(self.state.currentItem.toString());
                console.log(self.state.currentItem.total_distance);
                /*this.setState({dataList:res.data.data[0].date});
                this.setState({run_min_time:res.data.data[0].run_min_time});
                this.setState({total_calorie:res.data.data[0].total_calorie});
                this.setState({total_distance:res.data.data[0].total_distance})*/
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    setXAxis(){
        /*let _data = [];
        let _orig = [];
        let currentDate = new Date();
        let day = 24*60*60*1000;
        for(let i =6;i>=0;i--){
            let t = new Date();
            t.setTime(currentDate.getTime()-day*i);
            let riqi = (t.getMonth()+1) + "/" + t.getDate();
            let ymd = t.getFullYear() + "-" + (t.getMonth()+1) + "-" + t.getDate();
            _data.push(riqi);
            _orig.push(ymd);
        }
        this.setState({yTitle:_data});
        this.setState({origYTitle:_orig})*/

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
                    data : this.state.yTitle,
                    
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
                            fontSize:'10'
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
                    barWidth: '10%',
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
                        <Echarts option={option} width={width} height={250}  ref={(echarts)=>this._echarts = echarts} onPress={(e)=>{this.tapEcharts(e)}}/>
                    </View>
                    <View style={styles.bottomText}>
                        <Text style={styles.month}>{this.state.yTitle[this.state.currentIndex]}日</Text>
                        <View style={styles.viewForMile}>
                            <Text style={styles.mile}>{this.state.currentItem?this.state.currentItem.total_distance:"0"}</Text>
                            <Text style={styles.km}> km</Text>
                        </View>
                        <View style={styles.grayText}>
                            <Text style={styles.calText}>卡路里(千焦)</Text>
                            <Text style={styles.timeText}>运动时长(分钟)</Text>
                        </View>
                        <View style={styles.numText}>
                            <Text style={styles.calNum}>{this.state.currentItem?this.state.currentItem.calorie:"0"}</Text>
                            <Text style={styles.timeNum}>{this.state.currentItem?this.state.currentItem.run_min_time:"00:00:00"}</Text>
                        </View>

                        <FlatList
                            ref={(flatList)=>this._flatList = flatList}
                            ItemSeparatorComponent={this._separator}
                            keyExtractor = {this._keyExtractor}
                            renderItem={this._renderItem}
                            data={this.state.currentItem?this.state.currentItem.route_list:[]}
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
        overflow:"hidden"
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
        alignItems:'center'

    },
    listRight:{

    },
    calArrow:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
    },
    
})