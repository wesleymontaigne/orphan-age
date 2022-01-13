
//import React in our code
import React, {useEffect,useState,useRef} from 'react';

//import all the components we are going to use
import { Text, View ,StyleSheet ,TouchableOpacity, ImageBackground,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';




const DashBoardUser = ({navigation,route}) => {

 

  {/*Animations sets*/}
const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
useEffect(()=>{
  Animated.timing(translateX,{toValue:0,duration:2000}).start();
  });
  
const [loading, setLoading] = useState(true);
const [dataSource, setDataSource] = useState([]);
const [offset, setOffset] = useState(1);
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [data, setData] = useState([]);
const [foto,setFoto]=React.useState(route.params.response.image);
const [datainicio,setdatainicio]=React.useState();
const [iduser,setIdUser]=React.useState(route.params.response.userid);
const image = { uri: 'https://wesleymontaigne.com/OOP/oprhanage/fotos/bg.png' };
const [sessionId,setSesstionId]=React.useState(route.params.response.sessionid);
const [response,setResponse]=React.useState(route.params)
const [country, setCountry] =React.useState(route.params.response.country)
const [state,setState]=React.useState(route.params.response.state)
const [city,setCity]=React.useState(route.params.response.city)
const [pushid,setPushid]=React.useState('');



//Object to pass params to SELECT object


//Finish SELECT (PIKER)

  useEffect(() => getData(), []);

  const getData = () => {
   
    setLoading(true);
    //Service to get the data from the server to render
    fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?id=${iduser}&dashboard=0&sessionid=${sessionId}&country=${country}&offset=${offset}`)
      //Sending the currect offset with get request
      .then((response) => response.json())
      .then((responseJson) => {
        //Successful response from the API Call
        setOffset(offset + 1);
       
       //After the response increasing the offset for the next API call.
        setDataSource([dataSource, ...responseJson]);
       
        
        
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };


   //set time to execute get pushid
   useState(()=>{
    setTimeout(function(){
      getData2();
      }, 12000);

   },[])
  //Get PushID
  const getData2 = async () => {
  try {
  const value = await AsyncStorage.getItem('pushid')
  if(value !== null) {
  // value previously stored
 
  var validatinoApi = 'https://wesleymontaigne.com/OOP/oprhanage/fotos/';
  var headers = {
  'Accept': 'application/json',
  "Content-Type": "multipart/form-data",
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*',
  'crossDomain': 'true',
  'Host': 'https://wesleymontaigne.com/OOP/',
  'Origin': 'https://wesleymontaigne.com',
  };
  /*'crossDomain': 'true',*/
  var Data = {
  iduser:iduser,
  sessionid:sessionId,
  pushid:value
  };
  fetch(validatinoApi,
  {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(Data)
  }).then((response) => response.json())
  .then((response) => {
  if (response.statusCode == 200) {
  } else {
  }
  })
  .catch((error) => {
  alert(error);
  }); 


         }
    } catch(e) {
      // error reading value
      alert(e)
    }
  }
  














  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button calling getData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };



  const ItemView = ({item}) => {
    return (
      // Flat List Item

    

      <View style={{alignContent:'center',flex:1,alignItems:'center'}}>
       {item.id?<View style={{margin:7,backgroundColor:'white',width:'60%',height:200,borderRadius:25}}> 
     <TouchableOpacity onPress={() => navigation.navigate('solicitation',{response:route.params.response,productId:item.id,Product:item})}>
     <View style={{flex:1}}>
     <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
     <Image  style={{width:60,height:60,resizeMode:'contain',borderRadius:50,margin:7,}} source={{uri:item.img}} />
     <Text style={styles.text}>{item.nomeproduto}</Text>
     </View>
     {/*footer*/}
      
      <View style={{flex:1}}>
       <View style={{flexDirection:'row',margin:2}}>
       <FontAwesome5 name="map-marked-alt" size={24} color="dodgerblue" /><Text style={{marginLeft:7}}>{ item.city}</Text> 
      
       </View> 
      
    <View style={{flexDirection:'row',margin:2}}>     
    <MaterialCommunityIcons name="city" size={24} color="dodgerblue" /><Text style={{margin:7}}> {item.state}</Text> 
    </View>


     <View style={{flexDirection:'row',margin:2}}>
      <MaterialCommunityIcons name="truck-delivery" size={24} color="dodgerblue" /><Text style={{margin:7}}> {item.postarretirar}</Text> 
      </View>
      </View>
      </View>
     
    
     </TouchableOpacity>
     </View> :''}
      
     </View>

     
    );
  };

  const HeaderView =()=>{

    return(<View>
     <ImageBackground source={image} imageStyle={{resizeMode:'repeat'}} style={{flex:1,justifyContent: 'center',height:'100%',backgroundColor:'dodgerblue'}}>
     <View style={{flexDirection:'row',margin:7}}>
    <Image style={{width:125,height:125,borderRadius:25}} source={{uri:foto}} />   
    <View style={{marginLeft:7,}}>
    <Text style={styles.text}>{route.params.response.nome}</Text> 
    <View style={{flexDirection:'row',alignContent:'space-around'}}>
   
    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{
       navigation.navigate('DashBoardUser',{response:route.params.response});
    }} >
    <FontAwesome name="dashboard" size={24} color="white" /><Text style={styles.text}> DashBoard</Text>
    
    </TouchableOpacity>
  
    <TouchableOpacity style={{flexDirection:'row',marginLeft:7}} onPress={()=>{
      navigation.navigate('Message',{response:route.params.response});
    }} >
     <AntDesign name="message1" size={26} color="white" /><Text style={styles.text}> {route.params.response.numberOfMessages}</Text>
    
    </TouchableOpacity> 
    
     
    </View>

    </View>
    </View>
      </ImageBackground>
    </View>);
  }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'dodgerblue'}}>
      <ImageBackground source={image} imageStyle={{resizeMode:'repeat'}} style={{flex:1,height:'100%'}}>
      <View style={styles.container}>
        <FlatList
        ListHeaderComponent={HeaderView}
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        enableEmptySections={true}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        />
      </View>
      </ImageBackground>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#FFE599',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'dodgerblue',
    fontSize: 20,
    textAlign: 'center',
    fontWeight:'bold'
  },
  text: {
    color:'white',marginTop:5,fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 25,
    },
    select:{
    borderRadius:25,
    color:'black'
    }
});

export default DashBoardUser;
