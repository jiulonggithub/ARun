import React,{ Component } from 'react'
import {StyleSheet,View,Text,TextInput,WebView} from 'react-native'
export  default  class TestPage extends  Component{
    constructor(){
        super();
        this.state = {
            webViewData: ''
        };
        this.data = 0;
    }
    static navigationOptions = ({navigation})=>(
        {
            headerTitle: null
        }
    );

    sendMessage() {
        this.data++;
        this.refs.webview.postMessage(this.data);
    }

    handleMessage(e) {
        this.setState({webViewData: e.nativeEvent.data});
    }
    webViewLoaded(){
        console.log('onLoadEnd');
        this.sendMessage();
    }

    render(){
        return (
            <View style={styles.page}>
                <View style={{width: 375, height: 220}}>
                    <WebView
                        ref={'webview'}
                        source={{uri:'http://www.acinfo.com.cn/arunwap/index.html'}}
                        style={{width: 375, height: 220}}
                        onMessage={(e) => {
                            this.handleMessage(e)
                        }}
                        onLoadEnd={(e) => this.webViewLoaded()}
                    />

                </View>
                <Text>来自webview的数据 : {this.state.webViewData}</Text>
                <Text onPress={() => {
                    this.sendMessage()
                }}>发送数据到WebView</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    page:{
        position:"relative",
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    }
});