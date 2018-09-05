import React, { Component } from 'react';
import {View, StyleSheet,Text,Image,Linking , ToastAndroid} from 'react-native';
import Cell from '../component/CellBox'
import { versionUpdate , aboutUs , privacyTreaty} from '../requests/http'
var url = '';


export default class AboutArun extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version:'1.0',
            versionIntro:''
        }
    };
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '关于Arun',
        headerStyle:{
            backgroundColor:'#3c3a3f',
            height:44,
            elevation: 0,
            shadowOpacity: 0
        },
        headerTitleStyle:{
          fontSize:18
        },
        headerTintColor:'#fff'
    });
    

    componentDidMount(){
        aboutUs().then((res)=>{
            console.log(res.data);
            let number = res.data.data.number;
            let content = res.data.data.content;
            this.setState({
                version:number,
                versionIntro:content
            })
            
        }).catch((err)=>{
            console.log(err)
        })
    }

    _updateSoftware(){
        let _data = {
            type:1,
            number:this.state.version,

        };
        versionUpdate(_data).then((res)=>{
            console.log(res.data);
            let _version = res.data.data;
            let reg = /^[a-zA-Z]/;
            if(reg.test(_version)){
                url = 'https://' + _version
                Linking.openURL(url).catch(err => console.error('An error occurred', err));
            }else{
                ToastAndroid.show(_version, ToastAndroid.SHORT);
            }
        }).catch((err)=>{
            console.log(err)
        })
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.page}>
                <View style={styles.secTop}>
                    <View style={styles.imgBox}>
                        <Image source={require('../images/icon_setting.png')} style={styles.logo}/>
                    </View>
                    <Text style={styles.companyText}>浙江上信科技有限公司</Text>
                </View>
                <Cell label="软件版本" rightValue = {this.state.version} style={{marginTop:10}}/>
                <Cell label="版本介绍" rightValue = {this.state.versionIntro} />
                <Cell label="版本更新" tapCell={()=>{this._updateSoftware()}} style={styles.update} />
                <Cell label="Arun用户隐私条款" tapCell={()=>navigate('PrivacyClause')}/>
                <Cell label="Arun用户服务协议" tapCell={()=>navigate('PrivacyAgreement')} />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    },
    secTop:{
        backgroundColor:'#fff',
        paddingBottom:20
    },
    imgBox:{
        width:72,
        height:72,
        borderRadius:6,
        overflow:'hidden',
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:40,
        marginBottom:10,
        backgroundColor:'#e6e6e6'
    },
    logo:{
        width: 72,
        height:72
    },
    companyText:{
        fontSize:14,
        color:'#999',
        textAlign:'center'
    },
    mb10:{
        marginBottom:10,
        borderBottomWidth:0,
        
    },
    update:{
        marginBottom:10
    }
});

