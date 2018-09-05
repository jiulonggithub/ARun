import React, { Component } from 'react';
import {View, StyleSheet,Text,TextInput,Button,TouchableOpacity,Image,ToastAndroid} from 'react-native';
import GreenBtn from '../component/GreenBtn';
import DialogSelected from '../component/AlertSelected';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadFile,feedBack} from '../requests/http';
const selectedArr = ["拍照", "图库"];
export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            imgList: []
        };
        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);

    };
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '意见反馈',
        headerStyle:{
            backgroundColor:'#3c3a3f',
            height:44,
            elevation: 0,
            shadowOpacity: 0
        },
        headerTitleStyle:{
          fontSize:18
        },
        headerTintColor:'#fff',
        /*headerRight: (
            <Button
                title="上传"
                onPress={()=>{
                    // this.state.params.commitPage();
                }}
            />
        ),*/
    });
    descriptionChange(text) {
        this.setState({description:text});
    }
    tapSubmit(){
        let self = this;
        if(this.state.description.trim().length > 0){
            let _data = {};
            _data.content = this.state.description.trim();
            if(self.state.imgList.length>0){
                let idArr = [];
                for(let i = 0;i<self.state.imgList.length;i++){
                    let _tmp = self.state.imgList[i];
                    idArr.push(_tmp.id);
                }
                let str = JSON.stringify(idArr);
                let newStr = str.replace("[","(").replace("]",")");
                _data.imgs = newStr;
            }
            console.log(_data);
            feedBack(_data).then((res)=>{
                console.log(res.data);
                if(parseInt(res.data.errcode)===0){
                    ToastAndroid.show('提交成功!', ToastAndroid.SHORT);
                    self.props.navigation.goBack();
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else{
            ToastAndroid.show('内容不能为空!', ToastAndroid.SHORT);
        }
    }
    showAlertSelected(){
        this.dialog.show("请选择图片", selectedArr, '#333333', this.callbackSelected);
    }
    // 回调
    callbackSelected(i){
        switch (i){
            case 0: // 拍照
                this.takePhoto();
                break;
            case 1: // 图库
                this.pickMultiple();
                break;
        }
    }
    takePhoto(){
        let self = this;
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            let formData = new FormData();
            let file = {uri: image.path, type: 'multipart/form-data', name: 'photo.jpg'};
            formData.append('type', 1);
            formData.append('resource', file);
            self.uploadFile(formData,(id)=>{
                let currentList = self.state.imgList;
                currentList.push({id:id[0],uri: image.path, width: image.width, height: image.height});
                self.setState({
                    imgList: currentList,
                });
                console.log(self.state.imgList);
            });

        });
    }
    pickMultiple(){
        let self = this;
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
            /*let addImgs = images.map(i => {
                console.log('received image', i);
                return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
            });
            console.log(addImgs);*/

            let formData = new FormData();
            formData.append('type', 1);
            for(let i = 0;i< images.length;i++){
                let file = {uri: images[i].path, type: 'multipart/form-data', name: 'photo.jpg'};
                if(i===0){
                    formData.append('resource',file);
                }else {
                    formData.append('resource'+(i+1),file);
                }

            }
            console.log(formData);
            self.uploadFile(formData,(id)=>{
                let  currentList = self.state.imgList;
                console.log(id);
                for(let j = 0;j<id.length;j++){
                    currentList.push({id:id[j],uri: images[j].path, width: images[j].width, height: images[j].height});
                }
                self.setState({
                    imgList: currentList,
                });
                console.log(self.state.imgList);
            });

        });
    }
    uploadFile(formData,callback){
        let self = this;
        uploadFile(formData).then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                // ToastAndroid.show('上传成功!', ToastAndroid.SHORT);
                callback(res.data.data)
            }else {
                // ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    clearImg(index){
        alert(index);
        let tmp = this.state.imgList;
        tmp.splice(index,1);
        this.setState({imgList:tmp});
        console.log(this.state.imgList);
    }
    _renderImgItem(item,index){
        return  <View style={styles.picBox}>
            <TouchableOpacity style={styles.clearBtn} activeOpacity={0.8} onPress={()=>{this.clearImg(index)}}><Text style={{color:"#fff",textAlign:"center",fontSize:10}}>x</Text></TouchableOpacity>
            <Image source={item} style={styles.imgItem}/>
        </View>
    }

    render() {
        return (
            <View style={styles.page}>
                <Text style={styles.secTitle}>问题输入</Text>
                <View style={styles.secBox}>
                    <TextInput style={styles.inputDes} placeholder="把你的想法告诉我们" keyboardType="default" numberOfLines = {4} multiline = {true}
                               value={this.state.description} onChangeText={(e) => this.descriptionChange(e)}
                               placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={120}>
                    </TextInput>
                </View>
                <Text style={styles.secTitle}>添加照片</Text>
                <View style={[styles.secBox,{flexDirection:"row",alignItems:'center',flexWrap: 'wrap'}]}>
                    <View style={styles.picList}>
                        {this.state.imgList ? this.state.imgList.map((i,index) => <View key={i.uri}>{this._renderImgItem(i,index)}</View>) : null}
                    </View>
                    <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={()=>{this.showAlertSelected()}}>
                        <Text style={styles.addIcon}>+</Text>
                    </TouchableOpacity>
                </View>
                <GreenBtn style={styles.btn} text="确认提交" onPress={(e)=>{this.tapSubmit()}}/>

                <DialogSelected ref={(dialog)=>{
                    this.dialog = dialog;
                }} />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    page:{
        position:'relative',
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    },
    secTitle:{
        fontSize:16,
        color:'#333',
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:14
    },
    mt10:{
        marginTop:10
    },
    btn:{
        marginTop:40
    },
    inputDes:{
        padding:0,
        textAlignVertical: 'top',
        lineHeight:18
    },
    secBox:{
        backgroundColor:"#fff",
        padding:10,
    },
    picList:{
        // flex:1,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"center",
        flexWrap: 'wrap'
    },
    picBox:{
        position:'relative',
        width:48,
        height:48,
        marginRight:10,
        marginBottom:10,
        marginTop:10
    },
    clearBtn:{
        position:"absolute",
        top:-4,
        right:-4,
        width:10,
        height:10,
        borderRadius:5,
        backgroundColor:"#222",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        zIndex:2
    },
    imgItem:{
        width:48,
        height:48,
    },
    addBtn:{
        width:48,
        height:48,
        backgroundColor:"#eee",
        justifyContent:'center',
        alignItems:'center'
    },
    addIcon:{
        fontSize:28,
        color:"#bbb",
        textAlign:'center'
    }
});

