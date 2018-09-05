import React,{ Component } from 'react'
import {StyleSheet,View,Text,Dimensions, ScrollView} from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
import MonthRecord from '../component/MonthRecord';
import DayRecord from '../component/DayRecord';
import WeekRecord from '../component/WeekRecord';
import TotalRecord from '../component/TotalRecord';

let {width,height} = Dimensions.get('window');
export  default  class RunningRecord extends  Component{
    constructor(props) {
        super(props);
        this.state = {

           
        }
    }

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '运动记录',
            headerStyle:{
                backgroundColor:'#171a21',
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

    render() {    
        return(
            <View style={styles.page}>
                
                    <ScrollableTabView
                        style={styles.containerTab}
                        renderTabBar={() => <DefaultTabBar />}
                        tabBarUnderlineStyle={styles.lineStyle}
                        initialPage={0}
                        tabBarActiveTextColor='#20dc74'
                        tabBarInactiveTextColor='#999'
                        tabBarTextStyle={{fontSize:15,marginBottom:-15,color:'#fff'}}
                        >
                        <DayRecord tabLabel='日'/>
                        <WeekRecord tabLabel='周'/>
                        <MonthRecord tabLabel='月'/>
                    </ScrollableTabView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#fff'
    },
    containerTab: {
        width:width,
        height:height,
        backgroundColor: '#171a21',
    },
    lineStyle: {
        width:10,
        height: 2,
        backgroundColor: '#fff',
        marginLeft:43
    },
   
        
})