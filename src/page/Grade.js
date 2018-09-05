import React,{ Component } from 'react'
import {StyleSheet,View,Text,Image,ProgressBarAndroid, ScrollView , FlatList} from 'react-native'


export  default  class Grade extends  Component{
    constructor(props){
        super(props);
        this.state = {
            name:'迪丽热巴',
            gender:1,
            person:3000,
            dot:3,
            need:7,
            data:'2017/12/5',
            sport:'未运动',
            punish:'扣除能力1点'

        }
    }

    static navigationOptions = ({navigation})=>(
        {
            headerTitle: '我的等级',
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
            headerRight: (<Text
                style={styles.HeaderRightBtn}
                onPress={()=> {alert('更多')}}
            >更多</Text>),
        }
    )

    renderFemale(){
        return <Image source={require('../images/gender_girl.png')} style={styles.gender}/>
    }

    renderMale(){
        return <Image source={require('../images/gender_girl.png')} style={styles.gender}/>
    }

    componentDidMount() {
        var progress = this.state.dot / 10;
        this.setState({progress: progress});
    }

    _flatList;
    
     _renderItem = (item) => {

       return (
           <View style={styles.list}>
                    <Text style={styles.data}>{this.state.data}</Text>
                    <Text style={styles.sport}>{this.state.sport}</Text>
                    <Text style={styles.punish}>{this.state.punish}</Text>
           </View>
       )
     }
    
    

    render(){

        let data = [];
        for (var i = 0; i < 3; i++) {
          data.push({key: i});
        }

        return(
            <ScrollView>
                <View style={styles.page}>
                    <Image source={require('../images/icon_star.png')} style={styles.star}/>
                    <Text style={styles.name}>{this.state.name}</Text>
                    {
                        this.state.currentPage === 1 ? this.renderFemale(): this.renderMale()
                    }
                    <Text style={styles.person}>{this.state.person}人达到该等级</Text>
                    <View style={styles.progressBar}>
                        <ProgressBarAndroid styleAttr='Horizontal'  progress={this.state.progress} indeterminate={false} color='#20dc74'/>
                    </View>
                    <Text style={styles.need}>您的健康能力还需要{this.state.need}点，即可激发新的等级</Text>
                    <View style={styles.viewForRecordText}>
                        <Image source={require('../images/line_left.png')} style={styles.line}/>
                        <Text style={styles.record}>能量记录</Text>
                        <Image source={require('../images/line_right.png')} style={styles.line}/>
                    </View>
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        renderItem={this._renderItem}
                        data={data}
                        >
                    </FlatList>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        backgroundColor:'#171a21',
        justifyContent:"flex-start",
        alignItems:"center",
        position:'relative',
    },
    HeaderRightBtn:{
        color:"#fff",
        marginRight:16,
        fontSize:18
    },
    star:{
        width:188,
        height:112,
        marginTop:28
    },
    gender:{
        width:18,
        height:18,
        position:'absolute',
        top:190,
        left:255
    },
    name:{
        
        fontSize:28,
        color:'#fff',
        marginTop:39
    },
    person:{
        fontSize:12,
        color:'#aaa',
        marginTop:10
    },
    progressBar:{
        width:343,
        marginTop:31
    },
    need:{
        fontSize:12,
        color:'#fff',
        marginTop:26
    },
    viewForRecordText:{
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:"row",
        marginTop:58,
        marginBottom:23
    },
    record:{
        marginLeft:10,
        marginRight:10,
        fontSize:12,
        color:'#fff',
    },
    line:{
        width:57,
        height:1,
    },
    list:{
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection:"row",
        height:72,
        width:343
    },
    data:{
        fontSize:14,
        color:'#fff',
    },
    sport:{
        fontSize:14,
        color:'#fff',
    },
    punish:{
        fontSize:14,
        color:'#fff',
    },

})