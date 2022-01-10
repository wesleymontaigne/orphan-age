import React, {useEffect,useState,useRef} from 'react';
import { Text, View ,StyleSheet ,TouchableOpacity, ImageBackground,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated, ScrollView} from 'react-native';
import Swal from 'sweetalert2';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


function myMenssages({ navigation,route }){
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [foto,setFoto]=React.useState(route.params.response.image);
const [fotoDonator,setFotoDonotador]=React.useState(route.params.Product.picture?route.params.Product.picture:'')
const [iduser,setIdUser]=React.useState(route.params.response.userid);
const image = { uri: 'https://wesleymontaigne.com/OOP/oprhanage/fotos/bg.png' };
const [sessionId,setSesstionId]=React.useState(route.params.response.sessionid);
const [response,setResponse]=React.useState(route.params)
const [country, setCountry] =React.useState(route.params.response.country)
const [productId,setProductid] =React.useState(route.params.Product.productid)
const [donatorid,setDonatorId]=React.useState(route.params.Product.donatorid);
const [message,setMessage]=React.useState();
const [usertype,setUserType]=React.useState(route.params.response.usertype)
const [idUserContemplate,setIdUserContempleta]=React.useState(route.params.Product.userid)
console.log(response)



{/*Animations sets*/}
const [listItems, setListItems] = useState(data);
const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
useEffect(()=>{
  Animated.timing(translateX,{toValue:0,duration:2000}).start();
  })


  //send Message


  const sendMessage =()=>{


       {/*set loading from Swal*/}
       {Swal.showLoading()}
    
      var validatinoApi = 'https://wesleymontaigne.com/OOP/oprhanage/fotos/indexfotos.php';
      var headers = {
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
        'crossDomain': 'true',
        'Host': 'https://wesleymontaigne.com/OOP/',
        'Origin': 'https://wesleymontaigne.com',
    
      };
      /*'crossDomain': 'true',*/
      var Data = {
        iduser:iduser,
        page:usertype==1?'answer':'ask',
        productId:productId,
        sessionid:sessionId,
        message:message,
        donatorid:donatorid,
        idUserContemplate:idUserContemplate
    
      };
    
      fetch(validatinoApi,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(Data)
        }).then((response) => response.json())
         .then((response) => {
          if (response.statusCode == 200) {
            
            {Swal.hideLoading()}
            
            Swal.fire({
              title: 'Sent!',
              text: 'wait for the answer ',
              icon: 'success',
              confirmButtonText: 'nice'
              })
              
             navigation.replace('Message',{response:route.params.response});
    
          } else {
          Swal.hideLoading()
          Swal.fire({
          title: 'Erro!',
          text: 'Verifique sua internet',
          icon: 'error',
          confirmButtonText: 'Continuar'
          })
    
          }
    
    
        })
        .catch((error) => {
          alert(error);
        });
       
       
    
        }//end

  

 function getPostMessages(params) {
 
    //Feacth the data
 {/*Get all products*/}
 useEffect(() => {
  fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?id=${iduser}&dashboard=4&sessionid=${sessionId}&productid=${productId}&idUserContemplate=${idUserContemplate}&donatorid=${donatorid}`+'&usertype='+usertype,{method:'GET'})
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
     }, []);
} 


 getPostMessages();
console.log(data)


   
   
  
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
      ListFooterComponent={
      <View style={{flexDirection:'row',justifyContent:'center',flex:1}}>
        <TextInput
         value={message}
         onChangeText={(message) => setMessage(message)}
        placeholder='digit your message, its not a live chat'
        style={{width:'100%'}}
     
        ></TextInput>
        <View style={{position:'absolute',right:10,paddingTop:10}}> <Ionicons onPress={()=>{ 
          sendMessage();
        }} name="arrow-redo" size={32} color="white" /></View>
       
         </View>}
       renderItem={({ item,iduser }) => (
      <View style={{alignContent:'center',flex:1,alignItems:'center'}}>
      {productId==item.productid?<View style={item.userid==item.sender?styles.right:styles.left}> 
      <TouchableOpacity onPress={() => navigation.navigate('chatssss',{response:route.params.response,productId:item.id,Product:item})}>
      <View style={{flex:1}}>
        {/*paniel from donator*/}
        {usertype==1? <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
      {item.userid==item.sender?<Image  style={{width:60,height:60,resizeMode:'contain',borderRadius:50,margin:7,}} source={{uri:item.picture}} />
      :<Image  style={{width:60,height:60,resizeMode:'contain',borderRadius:50,margin:7,}} source={{uri:foto}} />
    } 
      <Text>{item.message}</Text>
      {/*painel com template*/}
      </View>:
      <View style={{flexDirection:'row',marginLeft:7,alignItems:'center'}}>
       {item.userid==item.sender?<Image  style={{width:60,height:60,resizeMode:'contain',borderRadius:50,margin:7,}} source={{uri:item.picture}} />
       :<Image  style={{width:60,height:60,resizeMode:'contain',borderRadius:50,margin:7,}} source={item.sender==iduser?{uri:foto}:{uri:fotoDonator}} />
     } <Text>{item.message}</Text>
      </View>}
      {/*start footer*/}
     {item.sender==item.donatorid&&usertype==1?<View style={{marginLeft:30,marginBottom:7}}>
       <TouchableOpacity>
       <FontAwesome5 name="hand-holding-heart" size={24} color="dodgerblue" />
       </TouchableOpacity>
     
     </View>:''} 
     
     
      {/*footer*/}
       
      </View>
      
     
      </TouchableOpacity>
      </View> :''}
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
          margin:7,backgroundColor:'white',
          width:'60%',
          backgroundColor: 'white',
          backgroundColor: '#EFE5D9',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,

        },
        left: {
          margin:7,
          backgroundColor:'white'
          ,width:'60%',
          backgroundColor: 'white',
          backgroundColor: '#F9F5F0',
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 0,
        }
      
  });
export default myMenssages;