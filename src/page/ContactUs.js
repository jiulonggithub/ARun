import React, { Component } from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity} from 'react-native';
import {contactUs} from '../requests/http';
export default class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tel:"",
            email:"",
            img:""
        }
    };
    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '联系我们',
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
        this.getData();
    }
    getData(){
        let self = this;
        contactUs().then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                let _tel = res.data.data[0].value;
                let _email = res.data.data[1].value;
                let _img = res.data.data[2].value;
                self.setState({tel:_tel});
                self.setState({email:_email});
                self.setState({img:_img});
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.secTop}>
                    <View style={styles.imgBox}>
                        <Image source={{uri:"http://"+this.state.img}} style={styles.logo}/>
                    </View>
                    <Text style={styles.companyText}>微信公众号</Text>
                </View>
                <View style={styles.cellContainer}>
                    <View style={styles.wrapperBox}>
                        <View>
                            <Text style={styles.grayColor}>联系电话</Text>
                            <Text style={styles.blackColor}>{this.state.tel}</Text>
                        </View>
                        <TouchableOpacity style={styles.rightBtn}  activeOpacity={0.8}>
                            <Text style={styles.btnText}>呼叫</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cellContainer}>
                    <View style={[styles.wrapperBox,{borderBottomWidth:0}]}>
                        <View>
                            <Text style={styles.grayColor}>联系邮箱</Text>
                            <Text style={styles.blackColor}>{this.state.email}</Text>
                        </View>
                        <TouchableOpacity style={styles.rightBtn}  activeOpacity={0.8}>
                            <Text style={styles.btnText}>复制</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        paddingBottom:20,
        marginBottom:10
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
        borderBottomWidth:0
    },
    cellContainer:{
        width:'100%',
        backgroundColor:'#fff'
    },
    wrapperBox:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:14,
        borderBottomWidth:1,
        borderBottomColor:"#eee",
        borderStyle:'solid',
        paddingTop:10,
        paddingBottom:10
    },
    rightBtn:{
        width:60,
        height:28,
        backgroundColor:"#20dc74",
        borderRadius:14,
        justifyContent:'center',
        alignItems:'center',
        marginRight:14
    },
    btnText:{
        color:"#fff",
        fontSize:16,
    },
    grayColor:{
        color:'#999',
        marginBottom:4
    },
    blackColor:{
        color:'#333'
    }
});

