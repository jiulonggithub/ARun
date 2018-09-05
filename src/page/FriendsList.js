import React, {Component} from 'react';
import {
    View, Image, TouchableOpacity, Modal, Text, ListView, Platform,Dimensions,StyleSheet,Alert
} from 'react-native';
import _ from 'lodash';
import { getContacts } from '../requests/http'

const {width,height} = Dimensions.get('window')
const SECTIONHEIGHT = 30,ROWHEIGHT = 40
//这是利用lodash的range和数组的map画出26个英文字母
const letters = _
    .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
    .map(n => String.fromCharCode(n).substr(0))
    
var totalheight=[];//每个字母对应的城市和字母的总高度
var that = null;
var city = [];
var friend_id = [];
export default class FriendsList extends Component {
    constructor(props) {
        super(props);
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        this.state={
             dataSource:new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
                }),
                name:'',
                image:null
            };
            that = this
    }

    static navigationOptions = ({ navigation }) => ({
        // header: null,
        headerTitle: '好友列表',
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
    
    componentWillMount () {
        //把城市放到对应的字母中
        getContacts().then((res)=>{
            console.log(res);
            let _data = res.data.data;
            
            //console.log(_data)
            for(let j = 0;j<letters.length;j++){
                let each =[];
                let id = [];
                //console.log(letters)
                for(let i = 0;i<_data.length;i++){
                    if(letters[j] === _data[i].initial ){
                        each.push(_data[i]);
                        id.push(_data[i].friend_id)
                        // storage.load({key:'_info'}).then((res)=>{
                        //     this.setState({
                        //         name:name,
                        //         image:image
                        //     })
                        // })
                    }    
                }
                
                let _city={};
                _city.index = letters[j];
                _city.name = each;
                _city.friend_id = id.join('');
                city.push(_city) ;
                for(let jj = 0;jj < city.length;jj++){
                    if(city[jj].friend_id === ""){
                        city.splice(jj,1)
                    }
                }
                //console.log(city)
                
            }
            //console.log(city)
            let dataBlob = {};
            let sectionIDs = [];
            let rowIDs = [];
            //console.log(city)
            for(let ii = 0;ii<city.length;ii++){
                let sectionName = 'Section ' + ii;
                sectionIDs.push(sectionName);
                dataBlob[sectionName] = letters[ii];
                rowIDs[ii] = [];
                for(let j = 0;j<city[ii].name.length;j++){
                    let rowName = ii + '-' + j;
                    rowIDs[ii].push(rowName);
                    dataBlob[rowName] = city[ii].name[j]
                }
               
                //计算每个字母和下面城市的总高度，递增放到数组中
                // var eachheight = this.props.sectionHeight+this.props.rowHeight*newcity.length
                let eachheight = SECTIONHEIGHT+ROWHEIGHT*city[ii].name.length;
                totalheight.push(eachheight)
            }
            /*console.log('dataBlob',dataBlob);
            console.log('sectionIDs',sectionIDs);
            console.log('rowIDs',rowIDs);*/
            this.setState({
                dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }



    renderRow(rowData,rowId){
        return (
            <View>
                <TouchableOpacity
                key={rowId}
                activeOpacity={0.8}
                style={{height:ROWHEIGHT,justifyContent:'center',paddingLeft:20,paddingRight:30,backgroundColor:'#fff'}}
                onPress={()=>{that.changedata(rowData)}}>
                    <View style={styles.cellFriendItem}>
                        <View style={styles.friendPicBox}><Image source={{uri:"http://"+rowData.friend.resource.resource}} style={styles.friendPic}/></View>
                        <Text style={styles.rowdatatext}>{rowData.remark}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.rowdata}/>
            </View>
        )
    }
    renderSectionHeader = (sectionData, sectionID) => {
        return (
        <View style={{height:SECTIONHEIGHT,justifyContent:'center',}}>
            <Text  style={{color:'#333',fontSize: 18,paddingLeft:20,backgroundColor:'#fafafa'}}>
            {sectionData}
            </Text>
        </View>
        )
    };
    // render ringht index Letters
    renderLetters(letter, index) {
        return (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=>{this.scrollTo(index)}}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )
    }
        //回调改变显示的城市
    changedata(item){
        console.log(item.friend_id);
        this.props.navigation.navigate("ChatRoom",{userid:item.friend_id,name:item.remark,icon:"http://"+rowData.friend.resource.resource});
    }
    
    //touch right indexLetters, scroll the left
    scrollTo=(index)=>{
        let position=0;
        for(let i = 0;i<index;i++){
            position += totalheight[i]
        }       
        this._listView.scrollTo({
            y:position
        })
    };

    _renderImgItem(item){
        return  <Image source={item} style={styles.headerIcon}/>
    }
    
    render() {
        return (
            <View style={{height: Dimensions.get('window').height,marginBottom:10}}>
                <View style={styles.header}>
                    <Text style={styles.name}>{this.state.name}山河</Text>
                    <View style={styles.headBox}>
                        {this.state.image ? this._renderImgItem(this.state.image) : null}
                    </View>  
                </View>
                <ListView
                contentContainerStyle={styles.contentContainer}
                ref={listView => this._listView = listView}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSectionHeader={this.renderSectionHeader}
                enableEmptySections={true}
                initialListSize={500}
                
                />
                <View style={styles.letters}>
                    {letters.map((letter, index) => this.renderLetters(letter, index))}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white',
    },
    letters: {
        position: 'absolute',
        height: height,
        top: 0,
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        height: 15,
        width: width*3/50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: 10,
        color:'#333',
    },
    rowdata:{
        backgroundColor:'#eee',
        height:1,
        marginLeft:20,
        marginRight:30,
    },
    cellFriendItem:{
        flexDirection:"row",
        alignItems:"center",
    },
    friendPicBox:{
        width:30,
        height:30,
        borderRadius:15,
        backgroundColor:"#ccc",
        overflow:"hidden",
        justifyContent:'center',
        alignItems:"center",
        marginRight:10
    },
    friendPic:{
        width:30,
        height:30,
    },
    rowdatatext:{
        color:'#333',
        fontSize: 16,
        lineHeight:16
    },
    header:{
        width:width,
        height:108,
        backgroundColor: 'white',
        paddingLeft:16,
        paddingRight:16,
        justifyContent: 'space-between',
        flexDirection:"row",
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
    },
    headerIcon:{
        width:60,
        height:60,
    },
    name:{
        fontSize: 28,
        color:'#333',
    }
})