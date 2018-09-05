import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid
} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import ImagePicker from 'react-native-image-crop-picker';
import DialogSelected from '../component/AlertSelected';
import GreenBtn from  '../component/GreenBtn';
import { reportFriend } from '../requests/http'

const selectedArr = ["拍照", "图库"];

export default class PageMoreReport extends Component {

    constructor(){
        super()
        this.state = {
			text: '',
			idea:'',
			image: null
        }
		this.onSelect = this.onSelect.bind(this);
		this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);
	}
	
	static navigationOptions = ({navigation})=>(
        {
            headerTitle: '举报',
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
        }
    )

    onSelect(index,value){
        this.setState({
		text: value
        })
	}
	
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
                this.pickMultiple();
                break;
        }
    }
    takePhoto(){
        ImagePicker.openCamera({
			width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            console.log(image);
            this.setState({
                image: {uri: image.path, width: image.width, height: image.height},
            });
        });
    }
    pickMultiple(){
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            console.log(images);
            let addImgs = images.map(i => {
                console.log('received image', i);
                return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
            });
            this.setState({
                imgList:addImgs
            });
        });
    }

    _renderImgItem(item){
        return  <Image source={item} style={styles.headerIcon}/>
	}
	
	// TapSubmit(e){
    //     if(this.state.text !== '' || this.state.idea !== '' && this.state.image !== ''){
    //         let _data = {
	// 			reason:this.state.text,
	// 			reason:this.state.idea.trim(),
	// 			defender_id:user_id,
	// 			evidence:image
	// 		};
	// 		reportFriend(_data).then((res)=>{
	// 			console.log(res.data);
	// 			ToastAndroid.show('提交成功!', ToastAndroid.SHORT);
				
	// 		}).catch((err)=>{
	// 			console.log(err)
	// 		})
	// 	}else{
	// 		ToastAndroid.show('内容不能为空!', ToastAndroid.SHORT);
	// 	}
		
    // }

    render(){
			return(
				
					<View style={styles.page}>
					<ScrollView>
						<View style={styles.container}>
								<RadioGroup
										size={24}
										thickness={1}
										color='#c9c9c9'
										//selectedIndex={1}
										value={this.state.text}
										onSelect = {(index, value) => this.onSelect(index, value)}
								>
										<RadioButton 
												style={{alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}
												value='发送淫秽色情内容' 
										>
										<Text style={styles.reportText}>01  发送淫秽色情内容</Text>		
										</RadioButton>
										<RadioButton 
												style={{alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}
												value='发送违法信息' 
										>
										<Text style={styles.reportText}>02  发送违法信息</Text>		
										</RadioButton>
										<RadioButton 
												style={{alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}
												value='人身攻击我' 
										>
										<Text style={styles.reportText}>03  人身攻击我</Text>		
										</RadioButton>
										<RadioButton 
												style={{alignItems:'center',borderBottomColor:'#eee',borderBottomWidth:1,}}
												value='存在欺诈骗钱行为' 
										>
										<Text style={styles.reportText}>04  存在欺诈骗钱行为</Text>		
										</RadioButton>		
								</RadioGroup>
								<Text style={styles.reportText}>05  其他</Text>	
									
						</View>
						{/* <Text>{this.state.text}</Text> */}
						<TextInput
							style={styles.textinput}
							underlineColorAndroid="transparent"
							onChangeText={(idea) => this.setState({idea})}
							value={this.state.idea}
							placeholder="把你的想法告诉我们" 
							keyboardType="default" 
							numberOfLines = {4}
							maxLength={120}
							placeholderTextColor='#555'
							multiline={true}
						/>
						<View style={styles.upload}>
							<TouchableOpacity activeOpacity={0.8} onPress={()=>{this.tapChangeHead()}}>         
								<View style={styles.headBox}>
									{this.state.image ? this._renderImgItem(this.state.image) : null}
									<Image source={require('../images/icon_add.png')}/>
								</View>           
							</TouchableOpacity>
						</View>
						<GreenBtn text="提交" style={{marginTop:16,marginBottom:16}}  onPress={(e) =>this.TapSubmit(e)}/>
						<DialogSelected ref={(dialog)=>{
						this.dialog = dialog;
					}} />
					</ScrollView>
					</View>
				
        )
    }
}

let styles = StyleSheet.create({
	page:{
        position:"relative",
        width:"100%",
        height:"100%",
        backgroundColor:'#f5f5f5'
    },
    container: {
		backgroundColor:'#fff',
		paddingLeft:16,
		paddingRight:16,
    },
	reportText:{
		fontSize: 16,
		color:'#333',
		marginTop:12,
		marginBottom:12,
	},
    textinput:{
		marginTop:5,
        width:'100%',
		height:123,
        backgroundColor:'#fff',
        color:'#555',
        fontSize:16,
        textAlignVertical: 'top',
		lineHeight:18,
		padding:16,

	},
	headBox:{
        width:48,
        height:48,
        backgroundColor:"#eee",
		overflow:"hidden",   
		justifyContent:'center',
		alignItems:"center",        
	},
	upload:{
		marginTop:8,
		width:'100%',
		height:72,
		backgroundColor:'#fff',
		justifyContent:'center',
		paddingLeft:16
	},
	
})

