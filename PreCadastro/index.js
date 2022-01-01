import React, { useState, useEffect } from 'react';
import { Text, View,SafeAreaView,Dimensions} from 'react-native';
import Swal from 'sweetalert2';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-web';
const windowWidth = Dimensions.get('window').width;



function pre({ navigation }) {
const [donate,setDonate]=React.useState('Donate'); 
const [receive, setReceive]=React.useState('Receive')
const [language,setLanguage]=React.useState('portugues')
const [isLoading, setLoading] = React.useState(true);
const [data, setData] = React.useState([]);

function getData(){
fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?language=${language}`,{method:'GET'})
.then((response) => response.json())
.then((json) => setData(json))
.catch((error) => console.error(error))
.finally(() => setLoading(false));
if(data[0]){
if(language=='portugues'){
setDonate(data[0].donate)
setReceive(data[0].receive)
setLanguage('english')
}else{
setDonate('Donate')
setReceive('Receive')
setLanguage('portugues')

}  

} 
  
}
useEffect(()=>{
getData();
},[])

 

  return (
  <SafeAreaView style={{flex:1,backgroundColor:'dodgerblue',alignItems:'center' }}>
  <TouchableOpacity>
  <View style={{flexDirection:'row',alignContent:'flex-end'}}>
  <FontAwesome5 onPress={()=>{getData()}} name="language" size={30} color="white" style={{marginLeft:windowWidth-80}}/>
  </View> 
  </TouchableOpacity>
 <TouchableOpacity>
 <View style={{margin:30,flex:1,alignItems:'center'}}>
 <FontAwesome5 name="gift" size={60} color="white" onPress={()=>{
navigation.navigate('Cadastro',{usertype:1})

 }} />
 <Text style={{color:'white'}}>{donate}</Text>  
 </View>
 </TouchableOpacity>

 <View style={{margin:30,flex:1,alignItems:'center'}}>
 <MaterialCommunityIcons name="account-child" size={60} color="white" onPress={()=>{
   navigation.navigate('Cadastro',{usertype:0})
 }}/>
 <Text style={{color:'white'}}>{receive}</Text>   
 </View>
 </SafeAreaView>
  );
}


export default pre;