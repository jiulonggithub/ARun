import React, { Component } from 'react';
import {View, StyleSheet,Text,TextInput,TouchableOpacity,Image,ScrollView,Picker,ToastAndroid} from 'react-native';
import CellInput from '../component/CellInput'
import CellBox from '../component/CellBox'
import { getUserProfile , editUserProfile,uploadFile} from '../requests/http';
import area from '../area.json';

import RNPicker from 'react-native-picker';

import DialogSelected from '../component/AlertSelected';
import ImagePicker from 'react-native-image-crop-picker';

const selectedArr = ["拍照", "图库"];

export default class EditData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            imageID:null,
            nickname :"",
            height: '',
            weight: "",
            sex: "1",  //1表示男，2表示女
            birthday: ["",'',''],
            address: ['','',''],
            description: ""
        };
        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);
    };
    static navigationOptions = ({ navigation }) => ({
        headerTitle: '编辑资料',
        headerStyle:{
            backgroundColor:'#3c3a3f',
            height:44,
            elevation: 0,
            shadowOpacity: 0
        },
        headerTitleStyle:{
            fontSize:18,
            alignSelf:'center',
        },
        headerTintColor:'#fff',
        headerRight: (<Text
            style={styles.HeaderRightBtn}
            onPress={()=>{navigation.state.params?navigation.state.params.navigatePress():null}}
        >保存</Text>),
    });

     uploadFile(formData){
         let self = this;
         uploadFile(formData).then((res)=>{
             console.log(res);
             if(parseInt(res.data.errcode)===0){
                 ToastAndroid.show('上传成功!', ToastAndroid.SHORT);
                 self.setState({imageID:res.data.data});
             }else {
                 ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
             }
         }).catch((err)=>{
            console.log(err);
         });
     }
     uploadImage(url,formData){
        return new Promise(function (resolve, reject) {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization : 'Bearer ' + token
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData)=> {
                    console.log('uploadImage', responseData);
                    resolve(responseData);
                })
                .catch((err)=> {
                    console.log('err', err);
                    reject(err);
                });
        });
    }
    saveData=()=>{
        let self = this;
        console.log(self.state.imageID,self.state.nickname.trim());
        if(self.state.imageID && self.state.nickname.trim()!==""){
            let _data={
                nickname:self.state.nickname,
                avatar:self.state.imageID,
                gender:self.state.sex?parseInt(self.state.sex):1,
                birth_date:self.getNum(self.state.birthday[0])+"-"+self.getNum(self.state.birthday[1])+"-"+self.getNum(self.state.birthday[2]),
                height:self.state.height?parseInt(self.state.height):0,
                weight:self.state.weight?parseInt(self.state.weight):0,
                province:self.state.address[0]?self.state.address[0]:"",
                city:self.state.address[1]?self.state.address[1]:"",
                area:self.state.address[2]?self.state.address[2]:"",
                signature:self.state.description?self.state.description:""
            };
            console.log(_data);
            editUserProfile(_data).then((res)=>{
                console.log();
                if(parseInt(res.data.errcode) === 0){
                    console.log("保存成功");
                    ToastAndroid.show('保存成功!', ToastAndroid.SHORT);
                }
            }).catch((err)=>{
                console.log(err);
            })
        }else {
            alert("头像，昵称必须填写");
        }
    };

    getNum(text){
        return text.replace(/[^0-9]/ig,"");
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
            self.uploadFile(formData);
            this.setState({
                // image: {uri: image.path, width: image.width, height: image.height},
                image: image.path
            });
        });
    }
    pickSimple(){
        let self = this;
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            let formData = new FormData();
            let file = {uri: image.path, type: 'multipart/form-data', name: 'photo.jpg'};
            formData.append('type', 1);
            formData.append('resource', file);
            self.uploadFile(formData);
            this.setState({
                image: image.path
            });
        });
    }
    _changeSex(val){
        this.setState({sex:val})
    }
    _setNickName(text){
        this.setState({nickname:text})
    }
    _setHeight(text){
        this.setState({height:text})
    }
    _setWeight(text){
        this.setState({weight:text});
    }
    _setAddress(){
        this._showAreaPicker();
    }
    descriptionChange(text) {
        this.setState({description:text});
    }
    tapChangeHead(){
        this.showAlertSelected();
    }

    _showDatePicker() {
        RNPicker.init({
            pickerTitleText:"请选择年月日",
            pickerData: this._createDateData(),
            pickerToolBarFontSize: 16,
            pickerFontSize: 16,
            pickerFontColor: [0, 0 ,0, 1],
            selectedValue: this.state.birthday,
            onPickerConfirm: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
                this.setState({birthday:pickedValue});
            },
            onPickerCancel: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
            },
            onPickerSelect: (pickedValue, pickedIndex) => {
                console.log('date', pickedValue, pickedIndex);
                console.log('date', pickedValue);
                // alert(pickedValue)
            }
        });
        RNPicker.show();
    }

    _showAreaPicker() {
        RNPicker.init({
            pickerTitleText:"请选择所在地",
            pickerData: this._createAreaData(),
            selectedValue: this.state.address,
            onPickerConfirm: pickedValue => {
                // console.log('area', pickedValue);
                // RNPicker.select(['山东', '青岛', '黄岛区']);
                // alert(typeof pickedValue);
                this.setState({address:pickedValue})
                console.log('area', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('area', pickedValue);
            },
            onPickerSelect: pickedValue => {
                // Picker.select(['山东', '青岛', '黄岛区'])
                // alert(pickedValue);
            }
        });
        RNPicker.show();
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }

    _createDateData() {
        let date = [];
        for(let i=1950;i<2050;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    _renderImgItem(item){
        return  <Image source={{uri: item}} style={styles.headerIcon}/>
    }
    componentDidMount(){
        let self = this;
        this.props.navigation.setParams({
            navigatePress:self.saveData
        });

        getUserProfile().then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode) ===0){
                let _data = res.data.data[0];
                let _sex = _data.gender+"";
                let _nickname = _data.nickname;
                let _weight = _data.weight?_data.weight+"":"";
                let _height = _data.height?_data.weight+"":"";
                console.log(_weight,_height);
                let _province = _data.province;
                let _city = _data.city;
                let _area = _data.area;
                let _description = _data.signature;
                let _imgurl = 'http://'+_data.resource.resource;
                let _imgID = _data.resource.id;
                let _birth_date = _data.birth_date;
                let t = new Date(_birth_date);
                self.setState({sex:_sex});
                self.setState({nickname:_nickname});
                self.setState({weight:_weight});
                self.setState({height:_height});
                self.setState({address:[_province,_city,_area]});
                self.setState({description:_description});
                self.setState({image:_imgurl});
                self.setState({imageID:_imgID});
                self.setState({birthday:[t.getFullYear()+'年',(t.getMonth()+1)+"月",t.getDate()+'日']});
            }else {
                alert(res.data.msg);
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    render() {
        return (
            <View style={styles.page}>
                <ScrollView style={styles.pageBox} keyboardDismissMode="none">
                    <View>
                    <TouchableOpacity style={styles.headCellBox} activeOpacity={0.8} onPress={()=>{this.tapChangeHead()}}>
                        <Text style={{color:'#333'}}>更换头像</Text>
                        <View style={styles.rightRow}>
                            <View style={styles.headBox}>
                                {this.state.image ? this._renderImgItem(this.state.image) : null}
                            </View>
                            <Image source={ require('../images/icon_right_arrow.png') } style={styles.RightArrowIcon}/>
                        </View>
                    </TouchableOpacity>

                    <CellInput style={{marginBottom:10}} label="更换昵称" value={this.state.nickname} callbackParent={(val)=>{this._setNickName(val)}} placeholder="未填写" />

                    <View style={styles.sexPickerBox}>
                        <View style={styles.sexCell}>
                            <Text style={styles.showSexText}>性别</Text>
                            <View style={styles.hidePickerWrapper}>
                                <Image source={ require('../images/icon_right_arrow.png') } style={[styles.RightArrowIcon,{position:"absolute",right:14,top:18}]}/>
                                <Text style={{position:"absolute",right:32,top:15}}>{this.state.sex === '1'?'男':"女"}</Text>
                                <Picker
                                    selectedValue={this.state.sex}
                                    onValueChange={lang => this._changeSex(lang)}
                                    mode="dialog"
                                    style={styles.sexPicker}
                                >
                                    <Picker.Item style={{fontSize:14}} label="男" value="1"/>
                                    <Picker.Item label="女" value="2"/>
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <CellInput label="身高(cm)" value={this.state.height} keyboardType={'numeric'} callbackParent={(val)=>{this._setHeight(val)}} placeholder="未填写" />
                    <CellInput label="体重(kg)" value={this.state.weight} keyboardType={'numeric'} callbackParent={(val)=>{this._setWeight(val)}} placeholder="未填写" />
                    <CellBox label="生日" style={{marginBottom:10}} rightValue={this.state.birthday[0]+"/"+this.state.birthday[1]+"/"+this.state.birthday[2]} tapCell={()=>{this._showDatePicker()}}/>

                    <CellBox label="所在地" rightValue={this.state.address} tapCell={()=>{this._setAddress()}}/>
                    <View style={styles.desBox}>
                        <Text style={{marginLeft:14,marginBottom:14}}>运动宣言</Text>
                        <TextInput style={styles.inputDes} placeholder="运动宣言" numberOfLines = {4} multiline = {true}
                                   value={this.state.description} onChangeText={(e) => this.descriptionChange(e)}
                                   placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={54}/>
                    </View>
                </View>
                </ScrollView>
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
        height:'100%',
        backgroundColor:'#f5f5f5',
        position:'relative'
    },
    pageBox:{
        width:"100%",
        height:'100%',
    },
    RightArrowIcon:{
        width:  6,
        height:12,
        marginLeft:10
    },
    mb10:{
        marginBottom:10,
        borderBottomWidth:0
    },
    HeaderRightBtn:{
        color:"#fff",
        marginRight:14
    },
    desBox:{
        backgroundColor:"#fff",
        paddingTop:14,
        paddingBottom:20
    },
    headCellBox:{
        width:'100%',
        display:'flex',
        paddingLeft:15,
        paddingRight:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        borderStyle:'solid',
        backgroundColor:'#fff'
    },
    headBox:{
        width:50,
        height:50,
        borderRadius:25,
        backgroundColor:"#ededed",
        overflow:"hidden",
        justifyContent:'center',
        alignItems:"center",
        marginRight:10
    },
    headerIcon:{
        width:60,
        height:60
    },
    inputDes:{
        marginLeft:14,
        marginRight:14,
        padding:14,
        textAlignVertical: 'top',
        lineHeight:18,
        backgroundColor:"#eee"
    },
    rightRow:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    sexPicker:{
        height:"100%",
        width:"100%",
        position:"absolute",
        right:0,
        top:0,
        flex:1,
        color:"#333",
        opacity:0.01,
    },
    sexPickerBox:{
        height:50,
        backgroundColor:"#fff"
    },
    birthdayWrapper:{
        position:'relative',
        height:50,
        backgroundColor:"#fff",
        borderBottomWidth:1,
        borderStyle:"solid",
        borderBottomColor:"#eee",
        marginTop:10
    },
    sexCell:{
        height:'100%',
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row",
        borderBottomWidth:1,
        borderStyle:"solid",
        borderBottomColor:"#eee"
    },
    showSexText:{
        width:80,
        fontSize:14,
        color:'#333',
        marginLeft:14,
    },
    hidePickerWrapper:{
        position:'relative',
        flex:1,
        height:"100%",
    },
    dataPicker:{
        width: '100%',
        position:"absolute",
        left:0,
        top:0,
        opacity:0.01,
    }
});

