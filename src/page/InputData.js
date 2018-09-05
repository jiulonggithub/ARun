import React, { Component } from 'react';
import {View, StyleSheet,Text,TextInput,TouchableOpacity,Image,Picker,Animated,PanResponder,Dimensions,ScrollView,ToastAndroid} from 'react-native';
import area from '../area.json';
import RNPicker from 'react-native-picker';
import GreenBtn from '../component/GreenBtn';
import { registerProfile } from '../requests/http';

const { width, height } = Dimensions.get("window");

export default class InputData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 170,
            weight: 50,
            sex: "",
            birthday: ["",'',''], //['1992年','1月','1日']
            address: ['','',''],
            description: "",
            directionalDistanceChangeThreshold:20,//手指滑动距离
            horizontalSwipeGestureBegan:false,
            previewDuration:1000
        };
        this._translateY = new Animated.Value(0);
        this.currentIndex = 1 ;
        this.canSwipe = true;
    };
    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    _tapSex(sex){
        if(sex !== this.state.sex){
            this.setState({sex:sex});
        }
    }
    _setHeight(text){
        this.setState({height:text})
    }
    _setWeight(text){
        this.setState({weight:text})
    }

    _setAddress(){
        this._showAreaPicker();
    }
    descriptionChange(text) {
        this.setState({description:text});
    }
    tapSubmit(e){
        let self = this;
        let _data = {};
        if(this.state.sex !== ''){
            _data.gender = self.state.sex;
        }
        if(self.state.birthday[0]!==""){
            _data.birth_date = self.getNum(self.state.birthday[0])+"-"+self.getNum(self.state.birthday[1])+"-"+self.getNum(self.state.birthday[2]);
        }
        if(self.state.height !==''){
            _data.height = parseInt(self.state.height);
        }
        if(self.state.weight !==''){
            _data.weight = parseInt(self.state.weight);
        }
        if(self.state.address[0] !==''){
            _data.province = self.state.address[0];
            _data.city = self.state.address[1];
            _data.area = self.state.address[2];
        }
        if(self.state.description !==''){
            _data.signature = self.state.description;
        }
        console.log(_data);
        registerProfile(_data).then((res)=>{
            console.log(res);
            if(parseInt(res.data.errcode)===0){
                ToastAndroid.show('保存成功!', ToastAndroid.SHORT);
                alert("跳转其他页面");
            }else {
                ToastAndroid.show(res.data.msg, ToastAndroid.SHORT);
            }
        }).catch((err)=>{
            console.log(err);
        })


        
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

    _showHeightPicker() {
        RNPicker.init({
            pickerTitleText:"请选择身高",
            pickerData: this._createHeightData(130,230),
            selectedValue: [this.state.height],
            onPickerConfirm: pickedValue => {
                this.setState({height:pickedValue[0]});
                console.log('height', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('height', pickedValue);
            },
            onPickerSelect: pickedValue => {
                // Picker.select(['山东', '青岛', '黄岛区'])
                // alert(pickedValue);
            }
        });
        RNPicker.show();
    }
    _showWeightPicker() {
        RNPicker.init({
            pickerTitleText:"请选择体重",
            pickerData: this._createWeightData(30,200),
            selectedValue: [this.state.weight],
            onPickerConfirm: pickedValue => {
                this.setState({weight:pickedValue[0]});
                console.log('weight', pickedValue);
            },
            onPickerCancel: pickedValue => {
                console.log('weight', pickedValue);
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
    getNum(text){
      return text.replace(/[^0-9]/ig,"");
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

    _createHeightData(min,max){
        let date = [];
        for(let i= min;i<= max;i++){
            date.push(i);
        }
        return date;
    }
    _createWeightData(min,max){
        let date = [];
        for(let i= min;i<= max;i++){
            date.push(i);
        }
        return date;
    }

    _renderPage1(){
        return (
            <View style={[styles.pageItem,{paddingTop:80}]}>
                <View style={styles.secTitleBox}>
                    <Text style={styles.secTitle}>你的性别</Text>
                    <Text style={styles.secText}>不要隐瞒哦！男子汉要勇敢，女汉子要大胆</Text>
                </View>
                <View style={styles.sexBox}>
                    <TouchableOpacity style={styles.sexItem} onPress={()=>{this._tapSex('1')}} activeOpacity={0.9}>
                        <Image source={require('../images/sex-nan.png')} style={[styles.sexIcon,this.state.sex==='1'? styles.activeSex:""]}/>
                        <Text style={styles.sFont}>男</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sexItem} onPress={()=>{this._tapSex('2')}} activeOpacity={0.9}>
                        <Image source={require('../images/sex-nv.png')} style={[styles.sexIcon,this.state.sex==='2'? styles.activeSex:""]}/>
                        <Text style={styles.sFont}>女</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.secTitleBox,{marginTop:40}]}>
                    <Text style={styles.secTitle}>出生日期</Text>
                    <Text style={styles.secText}>放心吧！Arun会保密，说不定还有大惊喜呢！</Text>
                </View>
                <TouchableOpacity style={{width:150,marginLeft:'auto',marginRight:'auto'}} activeOpacity={0.9} onPress={()=>{this._showDatePicker()}}>
                    <Text style={[styles.lFont,{textAlign:"center"}]}>{this.state.birthday[0]===""?'--年 --月 --日':this.state.birthday[0]+" "+this.state.birthday[1]+" "+this.state.birthday[2]}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _renderPage2(){
        return (
            <View style={[styles.pageItem,{paddingTop:100}]}>
                <View style={styles.secTitleBox}>
                    <Text style={styles.secTitle}>你的城市</Text>
                    <Text style={styles.secText}>老老实实的写吧！做一个爱跑步的老实人哟！</Text>
                </View>
                <TouchableOpacity style={{width:150,marginLeft:'auto',marginRight:'auto'}} activeOpacity={0.9} onPress={()=>{this._setAddress()}}>
                    <Text style={[styles.lFont,{textAlign:"center"}]}>{this.state.address[0]===""?'请选择地址':this.state.address[0]+" "+this.state.address[1]+" "+this.state.address[2]}</Text>
                </TouchableOpacity>
                <View style={[styles.secTitleBox,{marginTop:60}]}>
                    <Text style={styles.secTitle}>你的身高？</Text>
                    <Text style={styles.secText}>高矮都一样，偷偷告诉我，让Arun崇拜你</Text>
                </View>
                <TouchableOpacity style={{width:100,marginLeft:'auto',marginRight:'auto'}} activeOpacity={0.9} onPress={()=>{this._showHeightPicker()}}>
                    <Text style={[styles.lFont,{textAlign:"center"}]}>{this.state.height===""? '--':this.state.height}CM</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _renderPage3(){
        return (
            <View style={[styles.pageItem,{paddingTop:80}]}>
                <View style={styles.secTitleBox}>
                    <Text style={styles.secTitle}>你的体重？</Text>
                    <Text style={styles.secText}>放心吧！Arun会保密，不论胖瘦陪你一起！</Text>
                </View>
                <TouchableOpacity style={{width:100,marginLeft:'auto',marginRight:'auto'}} activeOpacity={0.9} onPress={()=>{this._showWeightPicker()}}>
                    <Text style={[styles.lFont,{textAlign:"center"}]}>{this.state.weight===""? '--':this.state.weight}KG</Text>
                </TouchableOpacity>
                <View style={[styles.secTitleBox,{marginTop:60}]}>
                    <Text style={styles.secTitle}>你的运动宣言？</Text>
                    <Text style={styles.secText}>一句让Arun崇拜的运动宣言吧，做最好的自己</Text>
                </View>
                <TextInput style={styles.inputDes} placeholder="运动宣言(30字以内)" numberOfLines = {4} multiline = {true}
                           value={this.state.description} onChangeText={(e) => this.descriptionChange(e)}
                           placeholderTextColor="#bbb" underlineColorAndroid='transparent' maxLength={30}/>
                <GreenBtn style={styles.submitBtn} text="保存" onPress={(e)=>{this.tapSubmit(e)}}/>
            </View>
        )
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder(evt, gestureState){ return true;},
            onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs),
            onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs),
            onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
            onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
            onShouldBlockNativeResponder: _ => false,
        });
    }

    componentWillUnmount() {
        // clearTimeout(this._ensureScrollEnabledTimer)
    }
    onContentLayout(e) {
        /*this.getPreviewAnimation(0, 0)
            .start( _ => {
                this.getPreviewAnimation(0, 0).start();
            });*/
    }

    getPreviewAnimation(toValue, delay) {
        return Animated.timing(
            this._translateY,
            { duration: this.state.previewDuration, toValue, delay}
        );
    }

    handleOnMoveShouldSetPanResponder(e, gs) {
        const { dy } = gs;
        return Math.abs(dy) > this.state.directionalDistanceChangeThreshold;
    }

    handlePanResponderMove(e, gestureState) {
        let self = this;
        const { dx, dy } = gestureState;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        if (absDy > self.state.directionalDistanceChangeThreshold && dy < -10) {
            if (absDy > absDx && !this.horizontalSwipeGestureBegan) {
                console.log(self.currentIndex,self.canSwipe);
                if(self.currentIndex <= 2 && self.canSwipe){
                    self.canSwipe = false;
                }
            }
        }
    }


    handlePanResponderEnd(e, gestureState) {
        // finish up the animation
        if(!this.canSwipe){
            let toValue = -(height*this.currentIndex);
            this.manuallySwipeRow(toValue);
        }
    }
    manuallySwipeRow(toValue){
        let self = this;
        Animated.spring(
            this._translateY,
            {
                toValue,
                friction: this.props.friction,
                tension: this.props.tension,
            }
        ).start( _ => {
            /*this.setState({currentIndex:this.state.currentIndex++});
            this.setState({canSwipe:true});
            console.log(this.state.canSwipe,this.state.currentIndex);*/
        });
        if(!self.canSwipe){
            self.canSwipe = true;
            self.currentIndex++;
        }
}
    closed(){
        alert("关闭")
    }
render() {
return (
  <View style={styles.page}>
      <Animated.View
          {...this._panResponder.panHandlers}
          onLayout={ (e) => this.onContentLayout(e) }
          style={
              [styles.swiperWrapper,
                  {
                      zIndex: 2,
                      transform: [
                          {translateY: this._translateY}
                      ]
                  }
              ]
          }
      >
                  {this._renderPage1()}
                  {this._renderPage2()}
                  {this._renderPage3()}

      </Animated.View>
      <TouchableOpacity style={styles.closeBox} onPress={()=>{this.closed()}} activeOpacity={0.8}>
          <Image source={require('../images/close-icon.png')} style={styles.closeIocn}/>
      </TouchableOpacity>
  </View>
);
}
};
const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: '100%',
        backgroundColor: "#171a21",
        position: 'relative'
    },
    swiperWrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: height * 3,
    },
    pageItem: {
        width: "100%",
        height: height
    },
    secTitle: {
        fontSize: 18,
        color: "#fff",
        marginBottom: 30
    },
    secText: {
        fontSize: 14,
        color: "#bbb",
        marginBottom: 40
    },
    secTitleBox: {
        marginHorizontal: 38
    },
    sFont: {
        fontSize: 14,
        color: "#bbb",
        textAlign: "center"
    },
    lFont: {
        fontSize: 18,
        color: "#fff",
    },
    sexIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginBottom: 10
    },
    activeSex: {
        borderColor: "#2bfc89",
        borderWidth: 2
    },
    sexBox: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
    },
    sexItem: {
        marginHorizontal: 40
    },
    inputDes: {
        marginLeft: 38,
        marginRight: 38,
        padding: 14,
        textAlignVertical: 'top',
        lineHeight: 18,
        color: "#fff",
        backgroundColor: "#292c32"
    },
    submitBtn: {
        marginTop: 20
    },
    closeBox:{
        position:"absolute",
        width:16,
        height:16,
        left:16,
        top:30,
        zIndex:2
    },
    closeIocn:{
        width:16,
        height:16
    }
});