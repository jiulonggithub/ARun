import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,Dimensions } from 'react-native';
// import GetSetStorge from '../utils/GetSetStorg';

const splashImg = require('../images/loading.png');//加载图片

const { width, height } = Dimensions.get('window');
// create a component
class splashView extends Component {
    constructor() {
        super();
        this.state = {  //这是动画效果
            bounceValue: new Animated.Value(1)
        };
    }
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    componentDidMount() {
        Animated.timing(
            this.state.bounceValue, { toValue: 1.2, duration: 1000 }
        ).start();
        this.timer = setTimeout(() => {
            this.props.navigation.navigate('Guide',{transition:'forFadeFromBottomAndroid'});
            /*GetSetStorge.getStorgeAsync('isFrist').then((result) => {
                if (result === null || result === '') {
                    this.props.navigation.navigate('Guide');
                    GetSetStorge.setStorgeAsync('isFrist', 'true');
                } else {
                    this.props.navigation.navigate('Home');
                }
            }).catch((error) => {
                console.log('==========================');
                console.log('系统异常' + error);
                console.log('==========================');
            });*/
        }, 1000);
    }
    componentWillUpdate(){
        clearTimeout(this.timer);
    }

    render() {
        return (
            <Animated.Image
                style={{
                    width: width,
                    height: height,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default splashView;