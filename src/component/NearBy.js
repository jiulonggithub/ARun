import React,{ Component } from 'react'
import {StyleSheet,
        View,
        Text,
        ScrollView,
        TouchableOpacity,
        FlatList,
        Image
    } from 'react-native';

export  default  class NearBy extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            /*image: null,
            title:'每日一跑',
            follower:2,
            from:'西湖',
            to:'湘湖',
            mile:9,*/
        }
    }

    _flatList;
    _keyExtractor = (item, index) => item.id;
    _renderItem = (item) => {
        return (
            <View style={styles.list}>
                <View style={styles.headBox}>
                    {item.item.image ? this._renderImgItem(item.item.image) : null}
                </View>
                <View style={styles.viewForText}>
                    <View style={styles.viewForTitle}>
                        <Text style={styles.title}>{item.item.title}</Text>
                        <Text style={styles.follower}>（{item.item.follower}人跟跑）</Text>
                    </View>
                    <View style={styles.viewForLocation}>
                        <View style={styles.viewForDes}>
                            <Text>{item.item.from}</Text>
                            <Image source ={ require('../images/icon_status.png')} style={{width:17,height:15,marginLeft:12,marginRight:12}}/>
                            <Text>{item.item.to}</Text>
                        </View>
                        <Text style={styles.mile}>{item.item.mile}km</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.botton}  onPress={() =>this._calling(item.item.id)} activeOpacity={0.8}>
                    <Text style={styles.call}>呼叫</Text>
                </TouchableOpacity>
            </View>
        )
    };

    _calling = (id) => {
        this.props.calling(id);
    };


    _separator = () => {
        return <View style={{height:1,backgroundColor:'#eee'}}/>;
    };

    _renderImgItem(item){
        return  <Image source={{uri:item}} style={styles.head}/>
    }

    render() {
        /*let data = [];
        for (var i = 0; i < 5; i++) {
            data.push({key: i, title: i + ''});
        }*/
        return(
            <View style={styles.page}>
                <ScrollView>
                    <View style={styles.container}>
                    </View>
                    <View style={styles.bottomText}>
                        <FlatList
                            ref={(flatList)=>this._flatList = flatList}
                            ItemSeparatorComponent={this._separator}
                            renderItem={this._renderItem}
                            data={this.props.data}
                            keyExtractor={this._keyExtractor}
                            >
                        </FlatList>
                    </View>
                </ScrollView>
            </View>
        )
    }

    
    
}


const styles = StyleSheet.create({
    page:{
        width:"100%",
        height:'100%',
    },
    headBox:{
        width:32,
        height:32,
        borderRadius:16,
        backgroundColor:'#eee',
        overflow:'hidden'
    },
    head:{
        width:32,
        height:32,
    },
    list:{
        width:'100%',
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems: 'center',
        padding:12,
    },
    viewForText:{
        
    },
    viewForTitle:{
        flexDirection:"row",
        justifyContent:'flex-start',
        alignItems: 'center',
    },
    title:{
        fontSize:16,
        color:'#333',
        marginRight:10
    },
    follower:{
        fontSize:12,
        color:'#999'
    },
    viewForLocation:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems: 'center',
        marginTop:10
    },
    viewForDes:{
        flexDirection:"row",
        justifyContent:'flex-start',
        marginRight:50
    },
    botton:{
        width:64,
        height:32,
        borderRadius:16,
        backgroundColor:'#20dc74',
        justifyContent:'center',
        alignItems: 'center',
    },
    call:{
        fontSize:16,
        color:'#fff'
    },
    mile:{
        fontSize:20,
        color:'#333',
        
    }
})