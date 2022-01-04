import React, {useEffect,useState,useRef} from 'react';
import { Text, View ,StyleSheet ,TouchableOpacity, ImageBackground,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated, ScrollView} from 'react-native';
import Swal from 'sweetalert2';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


function messageReadMessage({ navigation,route }){
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [foto,setFoto]=React.useState(route.params.response.image);
const [datainicio,setdatainicio]=React.useState();
const [objetivo,setObejetivo]=React.useState();
const [iduser,setIdUser]=React.useState(route.params.response.userid);
const image = { uri: 'https://wesleymontaigne.com/OOP/oprhanage/fotos/bg.png' };
const [sessionId,setSesstionId]=React.useState(route.params.response.sessionid);
const [response,setResponse]=React.useState(route.params)
const [country, setCountry] =React.useState(route.params.response.country)


{/*Animations sets*/}
const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
useEffect(()=>{
  Animated.timing(translateX,{toValue:0,duration:2000}).start();
  })





   
   {/*Get all products*/}
   useEffect(() => {
    fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?id=${iduser}&dashboard=3&sessionid=${sessionId}&country=${country}`,{method:'GET'})
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
       }, []);
  
  return (
    <SafeAreaView >
    <ImageBackground source={image} imageStyle={{resizeMode:'repeat'}} style={{flex:1,justifyContent: 'center',height:'100%'}}>
    <View style={{ backgroundColor:'dodgerblue',height:windowHeight }}>
    <ImageBackground source={image} imageStyle={{resizeMode:'repeat'}} style={{flex:1,height:'100%'}}>
    <View style={{flexDirection:'row',margin:7}}>
    <Image style={{width:125,height:125,borderRadius:25}} source={{uri:foto}} />   
    <View style={{marginLeft:7,}}>
    <Text style={styles.text}>{route.params.response.nome}</Text> 
    <View style={{flexDirection:'row',alignContent:'space-around'}}>
       
   
    </View>
    </View>
    </View>

    <Animated.View style={{transform:[{translateY:translateX}]}} >
    <View style={{alignContent:'center'}}>
       {isLoading ? <ActivityIndicator/> : (
      <ImageBackground source={image} imageStyle={{resizeMode:'repeat'}} style={{flex:1,justifyContent: 'center',height:'100%',backgroundColor:'dodgerblue'}}>
       
     <ScrollView >
        <FlatList
      data={data}
      keyExtractor={({ id }, index) => id}
       renderItem={({ item }) => (
       <View style={{alignContent:'center',flex:1,alignItems:'center'}}>
       <View style={{margin:7,backgroundColor:'white',width:'60%',backgroundColor: 'white',
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,}}> 
      <TouchableOpacity onPress={() => navigation.replace('chat',{response:route.params.response,productId:item.id,Product:item})}>
      <View style={{flex:1}}>
      <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
      <Image  style={{width:60,height:60,resizeMode:'contain',borderRadius:50,margin:7,}} source={{uri:item.img}} />
      <Text style={styles.text}>Message</Text>
      </View>
      {/*footer*/}
       
       <View style={{flex:1}}>
        <View style={{flexDirection:'row',margin:2}}>
        <AntDesign name="gift" size={24} color="dodgerblue" /><Text style={{marginLeft:7}}>{ item.productname}</Text> 
       
        </View> 
       
   

       </View>
       </View>
      
     
      </TouchableOpacity>
      </View> 
      </View>
     

      
        )}
      />
     </ScrollView>
   </ImageBackground>
    )}
  </View>

  
    </Animated.View>    
    </ImageBackground>   
   
   
    </View> 
    
    </ImageBackground>       
   
   </SafeAreaView>
);
}


const styles = StyleSheet.create({
     text: {
        color:'white',marginTop:5,fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 25,
        },
        right: {
          backgroundColor: '#EFE5D9',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,

        },
        left: {
          backgroundColor: '#F9F5F0',
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 0,
        }
      
  });
export default messageReadMessage;