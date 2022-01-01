import React, {useEffect,useState,useRef} from 'react';
import { Text, View ,StyleSheet ,TouchableOpacity, TextInput,ImageBackground,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated, ScrollView} from 'react-native';
import Swal from 'sweetalert2';
import { AntDesign } from '@expo/vector-icons';


function Asking({ navigation,route }){
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [iduser,setIdUser]=React.useState(route.params.response.userid);
const [productId,setProductId] =React.useState(route.params.productId);
const [sessionId,setSesstionId] =React.useState(route.params.response.sessionid);
const [message,setMessage]=React.useState('');
const [donatorid,setDonatorId]=React.useState(route.params.Product.userid)
const [viewMessage,setViewMessage]=React.useState(0)

console.log(route.params)

const image = { uri: 'https://wesleymontaigne.com/OOP/oprhanage/fotos/bg.png' };

{/*Animations sets*/}
const [listItems, setListItems] = useState(data);
const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
useEffect(()=>{
  Animated.timing(translateX,{toValue:0,duration:2000}).start();
  })


  const askinfunction =()=>{

// ask for delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You really want this gift!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I do!'
    }).then((result) => {
   if(result.isConfirmed) {
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
    page:'ask',
    productId:productId,
    sessionid:sessionId,
    message:message,
    donatorid:donatorid

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
          title: 'success!',
          text: 'Sent with success',
          icon: 'success',
          confirmButtonText: 'nice'
          })
          navigation.replace('DashBoard-User',{response:route.params.response});

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

       

        
      }
    })




 
    }//end


 
const editShowProduto=()=>{
   {/*Get all products*/}
   useEffect(() => {
    fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?id=${iduser}&dashboard=2&sessionid=${sessionId}&productid=${productId}`,{method:'GET'})
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
       }, []); 

}
  editShowProduto();
   
const  heartfunction=()=>{
    if(viewMessage==0){
      setViewMessage(1)
    }else{setViewMessage(0)}
   
  }
  
  return (
    <SafeAreaView>
    <ImageBackground source={image} resizeMode="cover" style={{flex:1}}>
    <View style={{ backgroundColor:'dodgerblue',height:windowHeight }}>
    <ImageBackground source={image} resizeMode="cover" style={{flex:1,alignItems:'center'}}>
    
    <Animated.View style={{transform:[{translateY:translateX}]}} >
    <View style={{}}>
       {isLoading ? <ActivityIndicator/> : (
     <ScrollView horizontal>
        <FlatList
      data={data}
      keyExtractor={({ id }, index) => id}
      renderItem={({ item }) => (
      <View style={{alignContent:'center',flex:1,alignItems:'center'}}>
     
      <View style={{flex:1,alignItems:'center',margin:7}}>
      <Image  style={{width:200,height:200,resizeMode:'contain',borderRadius:25}} source={{uri:route.params.Product.img}} />
      <View style={{flex:1,alignItems:'center'}}>
   
      <TouchableOpacity style={{alignContent:'center',alignItems:'center'}} onPress={()=>{
       heartfunction()

       
       }}>
      <View style={{margin:10}}><AntDesign name="heart" size={24} color="white" /></View>
      </TouchableOpacity>
      <View>
      <Text style={{color:'white',fontSize:20}}>{route.params.Product.description}</Text>
      </View>
      
      {viewMessage?<View style={{flex:1, justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <TextInput
       multiline = {true}
       numberOfLines = {7}
       value={message}
       onChangeText={(message) => setMessage(message)}
       style={{
         height: 40,
         margin: 12,
         borderWidth: 1,
         borderBottomWidth: 1,
         borderLeftWidth: 0,
         borderRightWidth: 0,
         borderTopWidth: 0,
         borderColor: 'white',
         outline: 'none',
         color: 'white',
         placeholderTextColor: 'white',
         height:100
       }}
       placeholder='Give me a message'
       keyboardType='default'

     />
     <TouchableOpacity style={{
     backgroundColor: 'white', alignItems: 'center',
     justifyContent: 'center', borderRadius: 10, width: 110,height:25}}
     onPress={()=>{
    askinfunction();

     }}>
    
     <Text style={{ color: 'dodgerblue'}}>Send</Text>
    
     </TouchableOpacity>
      </View>
     
     :''
       
      }   
      
     
      
      
      </View>
      <Text style={styles.text}>{item.nome}</Text>
      </View>
          
     
     
      </View>

      
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
export default Asking;