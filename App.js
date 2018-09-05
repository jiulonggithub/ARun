/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StackNavigator,TabNavigator,TabBarBottom,DrawerNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Drawer from 'react-native-drawer'
import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';


import LoginPage from "./src/page/LoginPage";
import LoginSelect from "./src/page/LoginSelect";
import RegisterPage from "./src/page/RegisterPage";
import splashView from "./src/page/splashView";
import Guide from "./src/page/Guide";
import MainLeftNav from "./src/page/MainLeftNav";
import Setting from "./src/page/Setting";
import SafeSetting from "./src/page/SafeSetting";
import UpdataPwd from "./src/page/UpdataPwd";
import AboutArun from "./src/page/AboutArun";
import ContactUs from "./src/page/ContactUs";
import NewMessageReminder from "./src/page/NewMessageReminder";
import Feedback from "./src/page/Feedback";
import AccountBind from "./src/page/AccountBind";
import TelBind from "./src/page/TelBind";
import ForgetPassword from "./src/page/ForgetPassword";
import MyCalCalorie from "./src/page/MyCalCalorie";
import MyProfit from "./src/page/MyProfit";
import TiXian from "./src/page/TiXian";
import TiXianDetails from "./src/page/TiXianDetails";
import EditData from "./src/page/EditData";
import FriendsList from "./src/page/FriendsList";
import PageMore from "./src/page/PageMore";//他的主页更多
import HisPage from "./src/page/HisPage";//他的主页
import MyPocket from "./src/page/MyPocket";//我的钱包
import runRecordShare from "./src/page/runRecordShare";//成绩分享
import UpLoadHeadIcon from "./src/page/UpLoadHeadIcon";//上传头像
import PageMoreReport from "./src/page/PageMoreReport";//举报

import ChatRoom from "./src/page/ChatRoom";
import InputData from "./src/page/InputData";  //填些资料
import RunningSetting from "./src/page/RunningSetting";//运动设定
import RunningRecord from "./src/page/RunningRecord";//运动记录
import AcceptReject from "./src/page/AcceptReject";
import RunScreen from "./src/page/RunScreen";
import WayDetail from "./src/page/WayDetail";
import Grade from "./src/page/Grade";
import Video from "./src/page/Video";
import WayDetailSwiper from "./src/page/WayDetailSwiper";
import PrivacyClause from "./src/page/PrivacyClause";
import PrivacyAgreement from "./src/page/PrivacyAgreement";
import CommunityBehavior from "./src/page/CommunityBehavior";
import CommunityRule from "./src/page/CommunityRule";


const { width, height } = Dimensions.get('window');

const TransitionConfiguration = () => ({
    screenInterpolator: (sceneProps) => {
        const { scene } = sceneProps;
        const { route } = scene;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
    },
});

const drawerNavigator = DrawerNavigator(
    {
        Setting: { screen: Setting},
     /*   MyHomeScreen: { screen: MyHomeScreen},*/
    },
    {
        drawerWidth: width*(2/3),
        drawerBackgroundColor:"#1b1d22",
        useNativeAnimations:true,
        contentComponent:(props)=>{
            return <MainLeftNav {...props} />
        },
        contentOptions:{
            activeTintColor:"#bbb",
            activeBackgroundColor:"#1b1d22",
            inactiveTintColor:"#bbb",
            inactiveBackgroundColor:"#1b1d22",
            iconContainerStyle: {
                opacity: 1
            }
        }
    }
);

const App = StackNavigator(
    {
        splashView: { screen: splashView },
        Guide: { screen: Guide },
        LoginSelect: { screen: LoginSelect },
        LoginPage: { screen: LoginPage },
        MainLeftNav: { screen: MainLeftNav },
        RegisterPage: { screen: RegisterPage },
        Setting: { screen: Setting},
        SafeSetting: { screen: SafeSetting},
        UpdataPwd: { screen: UpdataPwd},
        AboutArun: { screen: AboutArun},
        ContactUs: { screen: ContactUs},
        NewMessageReminder: { screen: NewMessageReminder},
        Feedback: { screen: Feedback},
        AccountBind: { screen: AccountBind},
        TelBind: { screen: TelBind},
        ForgetPassword: { screen: ForgetPassword},
        MyCalCalorie: { screen: MyCalCalorie},
        MyProfit: { screen: MyProfit},
        TiXian: { screen: TiXian},
        TiXianDetails: { screen: TiXianDetails},
        EditData: { screen: EditData},
        PageMore: { screen: PageMore},
        HisPage: { screen: HisPage},
        MyPocket: { screen: MyPocket},
        runRecordShare: { screen: runRecordShare},
        UpLoadHeadIcon: { screen: UpLoadHeadIcon},
        FriendsList: { screen: FriendsList},
        PageMoreReport: { screen: PageMoreReport},
        ChatRoom: { screen: ChatRoom},
        RunningSetting: { screen: RunningSetting},
        RunningRecord: { screen: RunningRecord},

        InputData: { screen: InputData},

        AcceptReject: { screen: AcceptReject},
        RunScreen: { screen: RunScreen},
        WayDetail: { screen: WayDetail},
        Grade: { screen: Grade},
        Video: { screen: Video},
        WayDetailSwiper: { screen: WayDetailSwiper},

        PrivacyClause: { screen: PrivacyClause},
        PrivacyAgreement: { screen: PrivacyAgreement},
        CommunityBehavior: { screen: CommunityBehavior},
        CommunityRule: { screen: CommunityRule},
        /*drawerNavigator:{screen:drawerNavigator,
            navigationOptions: {
                header:null,
            },
        }*/
    },
    {
        initialRouteName: 'LoginPage',
        headerMode: 'screen',
        mode: Platform.OS === 'ios' ? 'modal' : '',
        transitionConfig: TransitionConfiguration,
        onTransitionStart: (() => {
            console.log('页面跳转动画开始');
        }),
        onTransitionEnd: (() => {
            console.log('页面跳转动画结束');
        }),
    }
);

export default class Application extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            drawerType: 'displace',
            openDrawerOffset:0.2,
            closedDrawerOffset:0,
            panOpenMask: .1,
            panCloseMask: .5,
            relativeDrag: false,
            panThreshold: .25,
            tweenHandlerOn: false,
            tweenDuration: 350,
            tweenEasing: 'linear',
            disabled: false,
            tweenHandlerPreset: null,
            acceptDoubleTap: false,
            acceptTap: false,
            acceptPan: true,
            tapToClose: false,
            negotiatePan: true,
            side: "left",
        };
    }

    tweenHandler(ratio){
        if(!this.state.tweenHandlerPreset){ return {} }
        return tweens[this.state.tweenHandlerPreset](ratio)
    }

    noopChange(){
        this.setState({
            changeVal: Math.random()
        })
    }

    openDrawer(){
        this.drawer.open()
    }

    setStateFrag(frag) {
        this.setState(frag);
    }
    render () {
        return (
            <Drawer
                ref={c => this.drawer = c}
                type={this.state.drawerType}
                animation={this.state.animation}
                openDrawerOffset={this.state.openDrawerOffset}
                closedDrawerOffset={this.state.closedDrawerOffset}
                panOpenMask={this.state.panOpenMask}
                panCloseMask={this.state.panCloseMask}
                relativeDrag={this.state.relativeDrag}
                panThreshold={this.state.panThreshold}
                styles={{width:'100%'}}
                disabled={this.state.disabled}
                tweenHandler={this.tweenHandler.bind(this)}
                tweenDuration={this.state.tweenDuration}
                tweenEasing={this.state.tweenEasing}
                acceptDoubleTap={this.state.acceptDoubleTap}
                acceptTap={this.state.acceptTap}
                acceptPan={this.state.acceptPan}
                tapToClose={this.state.tapToClose}
                negotiatePan={this.state.negotiatePan}
                changeVal={this.state.changeVal}

                side={this.state.side}
                content={<MainLeftNav/>}
            >
                <App />
            </Drawer>
        )
    }
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// export default () => <App />;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
