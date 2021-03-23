import React from 'react';
import { ActivityIndicator } from 'react-native';
import {View,StyleSheet,Text,FlatList,Dimensions,Image,TouchableWithoutFeedback,Linking,Share} from 'react-native';
const {width , height} = Dimensions.get('window');
console.disableYellowBox = true;

export default class App extends React.Component{
  state = {
    news : [],
    loading: true
  }

  loadnotes = () => {
    fetch('https://newsapi.org/v2/top-headlines?country=mx&category=science&apiKey=ce529d1235664a66b34fed42925c2df2')
    .then((res)=>res.json())
    .then((response)=>{
      this.setState({
        news : response.articles,
        loading : false
      })
    })
  }
  componentDidMount (){
    this.loadnotes()
  }
  shareNews = async nota => {
    try {
      await Share.share({
        message : "Dale un vistazo a este Articulo " + nota
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    if(this.state.loading){
    return (
      <View style = {{flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'#47476b'}}>
        <ActivityIndicator size="large" color = "#b3b3cc"/>
      </View>
    )
  } else {
    return (
    <View style={styles.container}>
        <View style = {styles.header}>
          <Text style = {styles.headline}>Aqui va la barra de botones "Tipo de noticias"</Text>
          <Text style = {styles.headline}>Aqui puede ir el titulo de la noticia</Text>
        </View>
      <View style = {styles.news}>
        <FlatList 
        data = {this.state.news} 
        renderItem = {({item})=>{
          return(
            <TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
               <View style = {styles.newslist}>
                <Image source={{uri : item.urlToImage}} style={[StyleSheet.absoluteFill,{borderRadius:35}]}/>
                <View style = {styles.gradient}>
                  <Text style =
                  {{position:'absolute', bottom:0 , color:'#fff',fontSize:18, alignSelf:'center',padding:10}}>
                  {item.title}</Text>
                  <Text style={{fontSize:13,color:'#fff',position:'absolute',top:0,right:0,padding:15,fontWeight:'bold'}}
                  onPress={()=>this.shareNews(item.url)}>Compartir</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}/>
      </View>
    </View>
    )
  }
}
}

const styles = StyleSheet.create ({
  container : {
    flex: 1,
    backgroundColor: '#47476b' ,
  },
  header : {
    padding: 30
  },
  headline : {
    fontSize: 20,
    color: '#b3b3cc'
  },
  news: {
    alignItems:'center',
  },
  newslist :{
    width : width - 50 ,
    height : 210,
    backgroundColor : '#6666ff',
    marginBottom: 15,
    borderRadius: 35,
  },
  gradient : {
    width: '100%',
    height: '100%',
    backgroundColor : 'rgba(0,0,0,0.4)',
    borderRadius: 35,
  },
})