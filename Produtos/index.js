import React, {useEffect,useState,useRef} from 'react';
import { Text, View ,StyleSheet ,TouchableOpacity, ImageBackground,Image,Dimensions,SafeAreaView,ActivityIndicator,FlatList,Animated, ScrollView} from 'react-native';
import Swal from 'sweetalert2';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

function Logado({ navigation,route }){
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const [isLoading, setLoading] = useState(true);
const [data, setData] = useState([]);
const [iduser,setIdUser]=React.useState(route.params.response.userid);
const [productId,setProductId] =React.useState(route.params.productId);
const [sessionId,setSesstionId] =React.useState(route.params.response.sessionid);

const image = { uri: 'https://wesleymontaigne.com/OOP/oprhanage/fotos/bg.png' };

{/*Animations sets*/}
const [listItems, setListItems] = useState(data);
const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
useEffect(()=>{
  Animated.timing(translateX,{toValue:0,duration:2000}).start();
  })


  const deleteFunction =()=>{

// ask for delete
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
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
    page:'produtcsdeleteedite',
    productId:productId,
    sessionid:sessionId

  };

  fetch(validatinoApi,
    {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(Data)
    }).then((response) => response.json())
    .then((response) => {
      if (response.statusCode == 200) {
        {Swal.hideLoading()}
        
        Swal.fire({
          title: 'success!',
          text: 'Deleted',
          icon: 'success',
          confirmButtonText: 'nice'
          })
          navigation.replace('DashBoard',{response:route.params.response});

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
    fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?id=${iduser}&dashboard=1&sessionid=${sessionId}&productid=${productId}`,{method:'GET'})
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
       }, []); 

}
  editShowProduto();
   
 
  
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
      <Image  style={{width:200,height:200,resizeMode:'contain',borderRadius:25}} source={{uri:item.img}} />
      <View style={{flexDirection:'row',justifyContent:'space-around',flex:1}}>
      <TouchableOpacity onPress={()=>{
      deleteFunction(iduser,productId)

      }}>
      <View style={{margin:10}}><AntDesign name="delete" size={24} color="white" /></View>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
      navigation.navigate("Editing",{response:route.params.response,item:item})


      }}>
      <View style={{margin:10}}><FontAwesome name="edit" size={24} color="white" />
      
      </View>
      </TouchableOpacity>
      
      
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
export default Logado;