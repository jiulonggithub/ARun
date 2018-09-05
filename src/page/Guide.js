import React, { Component } from 'react';
import { Image,View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
let image1 = require('../images/guide01.png');
let image2 = require('../images/guide02.png');
let image3 = require('../images/guide03.png');

const { width, height } = Dimensions.get('window');
export default class Guide extends Component {
    constructor() {
        super();
    };
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
                <View style={styles.slide1}>
                    <Image source={image1} style={styles.backgroundImage} />
                </View>
                <View style={styles.slide2}>
                    <Image source={image2} style={styles.backgroundImage} />
                </View>
                <View style={styles.slide3}>
                    <Image source={image3} style={[styles.backgroundImage,styles.btnOut]} />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            this.props.navigation.navigate('LoginSelect',{transition:'forFadeFromBottomAndroid'})
                        }}
                    >
                        <Text style={styles.btnText}>启动应用</Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
        );
    }
};
const styles = StyleSheet.create({
    contentContainer: {
        width: width * 3,
        height: height,
    },
    backgroundImage: {
        width: width,
        height: height,
    },
    btnOut:{
        alignItems:'center',
    },
    btn:{
        position:'absolute',
        width:150,
        height:50,
        backgroundColor:'#90ee90',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        bottom:100
    },
    btnText:{
        fontSize:18,
        color:'#fff'
    },
    wrapper: {
    },
    slide1: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        position:'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

