import React, { Component } from 'react';
import {View, StyleSheet,Text,Image,TouchableOpacity,TextInput,ToastAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DialogSelected from '../component/AlertSelected';
import { uploadAvatar } from '../requests/http';

const selectedArr = ["拍照", "图库"];

export default class UpLoadHeadIcon extends Component {
    constructor(props) {
        super(props);
        this.state={
            image: null,
            name: ''
        };

        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);

    };
    static navigationOptions = ({ navigation }) => ({
        header: null        
    });

    tapChangeHead(){
        this.showAlertSelected();
    }

    showAlertSelected(){
        this.dialog.show("请选择图片", selectedArr, '#333333', this.callbackSelected);
    }
    callbackSelected(i){
        switch (i){
            case 0: // 拍照
                this.takePhoto();
                break;
            case 1: // 图库
                this.pickSimple();
                break;
        }
    }
    takePhoto(){
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
            });
        });
    }
    pickSimple(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height}
            });
        });
    }

    _renderImgItem(item){
        return  <Image source={item} style={styles.headerIcon}/>
    }
    
    validNickName(name){
        if(name.trim().length > 1 && name.trim().length < 8){
            return true;
        }else {
            return false;
        }
    }

    TapSubmit(e){
        let self = this;
        if(self.validNickName(this.state.name) && self.state.image !== null){
            let formData = new FormData();
            let file = {uri: self.state.image.uri, type: 'multipart/form-data', name: 'photo.jpg'};

            formData.append('avatar', file);
            formData.append('nickname', self.state.name);
            uploadAvatar(formData).then((res)=>{
                console.log(res);
                if(parseInt(res.data.errcode)===0){
                    ToastAndroid.show('上传成功', ToastAndroid.SHORT);
                    this.props.navigation.navigate('InputData',{transition:'forFadeFromBottomAndroid'});
                    storage.save({
                        key:'_info',
                        data:{
                            name: self.state.name,
                            image: self.state.image
                        }
                    });//通讯录头部个人信息
                }else {
                    ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
                }
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            ToastAndroid.show('请完成填写资料！', ToastAndroid.SHORT);
        }
    }

    render() {
        let { navigate } = this.props.navigation;
        return (
            <View style={styles.page}>
                <Image source={require('../images/login_title.png')} style={{width:160,height:48,marginTop
                :57}}/>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.tapChangeHead()}}>         
                    <View style={styles.headBox}>
                        {this.state.image ? this._renderImgItem(this.state.image) : null}
                    </View>           
                </TouchableOpacity>
                <Text style={styles.uploadText}>上传头像</Text>
                <TextInput
                    style={styles.textinput}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.setState({name:text})}
                    value={this.state.name}
                    placeholder="输入昵称" 
                    maxLength={16}
                    placeholderTextColor='#555'
                    editable={true}
                />
                <Text style={styles.reg}>以英文字母或汉字开头，限4-16个字符,一 个汉字为两个字符</Text>
                <View style={styles.viewForBotton}>
                    {/*<TouchableOpacity style={styles.pass}   activeOpacity={0.8}>
                        <Text style={styles.passText}>提交</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity style={styles.submit} onPress={(e)=>this.TapSubmit(e)}  activeOpacity={0.8}>
                        <Text style={styles.submitText}>提交</Text>
                    </TouchableOpacity>
                </View>
                <DialogSelected ref={(dialog)=>{
                    this.dialog = dialog;
                }} />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#171a21',
        justifyContent:"flex-start",
        alignItems:"center",
    },
    headBox:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:"#13161c",
        overflow:"hidden",
        justifyContent:'center',
        alignItems:"center",
        marginTop:37,
        marginBottom:16
    },
    uploadText:{
        fontSize:16,
        color:'#bbb'
    },
    textinput:{
        width:240,
        height:44,
        backgroundColor:'#13161c',
        color:'#555',
        fontSize:15,
        textAlign:'center',
        lineHeight:22,
        padding:0,
        marginTop:52,
        marginBottom:10
    },
    reg:{
        width:240,
        color:'#555',
        fontSize:12,
        lineHeight:16,
    },
    viewForBotton:{
        flexDirection:"row",
        justifyContent:"center",
        width:300,
        marginTop:90
    },
    pass:{
        width:140,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#292c32',
        borderRadius:22,
    },
    profitText:{
        textAlign:'center',
        color:'#fff',
        fontSize:16,
    },
    submit:{
        width:140,
        height:44,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#20dc74',
        borderRadius:22,
    },
    submitText:{
        textAlign:'center',
        color:'#fff',
        fontSize:16,
    },
    passText:{
        color:"#fff"
    }
})