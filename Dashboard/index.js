import React, {useEffect,useState,useRef} from 'react';
import { Text, View ,StyleSheet ,TouchableOpacity, ImageBackground,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated, ScrollView} from 'react-native';
import Swal from 'sweetalert2';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


function Logado({ navigation,route }){
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


{/*Animations sets*/}
const [listItems, setListItems] = useState(data);
const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
useEffect(()=>{
  Animated.timing(translateX,{toValue:0,duration:2000}).start();
  })





   
   {/*Get all products*/}
   useEffect(() => {
    fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?id=${iduser}&dashboard=1&sessionid=${sessionId}`,{method:'GET'})
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
       }, []);
  
  return (
    <SafeAreaView>
    <ImageBackground source={image} resizeMode="cover" style={{flex:1,justifyContent: 'center'}}>
    <View style={{ backgroundColor:'dodgerblue',height:windowHeight }}>
    <ImageBackground source={image} resizeMode="cover" style={{flex:1}}>
    <View style={{flexDirection:'row',margin:7}}>
    <Image style={{width:125,height:125,borderRadius:25}} source={{uri:foto}} />   
    <View style={{marginLeft:7,}}>
    <Text style={styles.text}>{route.params.response.nome}</Text> 
    
     {/**/}
     <TouchableOpacity style={{flexDirection:'row',marginLeft:7}} onPress={()=>{
      navigation.navigate('Message',{response:route.params.response});
    }} >
     <AntDesign name="message1" size={26} color="white" /><Text style={styles.text}> {route.params.response.numberOfMessages}</Text>
    
    </TouchableOpacity> 


    <View style={{flexDirection:'row',alignContent:'space-around'}}>
   
    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{
      navigation.navigate('AddAula',{response:route.params.response});
    }} >
    <FontAwesome name="dashboard" size={24} color="white" /><Text style={styles.text}> DashBoard</Text>
    
    </TouchableOpacity>

    <TouchableOpacity style={{flexDirection:'row',marginLeft:7}} onPress={()=>{
      navigation.navigate('Post-Items',{response:route.params.response});
    }} >
    <FontAwesome5 name="gifts" size={24} color="white" /><Text style={styles.text}> Post Item</Text>
    
    </TouchableOpacity>
    </View>
    </View>
    </View>

    <Animated.View style={{transform:[{translateY:translateX}]}} >
    <View style={{}}>
       {isLoading ? <ActivityIndicator/> : (
     <ScrollView horizontal>
        <FlatList
      data={data}
      keyExtractor={({ id }, index) => id}
      horizontal={true}
      renderItem={({ item }) => (
      <TouchableOpacity onPress={() => navigation.navigate('Produtos',{response:route.params.response,productId:item.id})}>
      <View style={{flex:0}}>
      <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
      <Image  style={{width:60,height:60,resizeMode:'contain',borderRadius:50,margin:7,}} source={{uri:item.img}} />
      <Text style={styles.text}>{item.nome}</Text>
      </View>
          
      </View>
      </TouchableOpacity> 


      
        )}
      />
     </ScrollView>
  
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
        textShadowRadius: 25
    },
  });
export default Logado;