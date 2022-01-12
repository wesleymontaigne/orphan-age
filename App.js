import * as React from 'react';
import { useEffect } from 'react';
import { Text, View ,TextInput,ImageBackground,TouchableOpacity,Dimensions,SafeAreaView,Linking,KeyboardAvoidingView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Swal from 'sweetalert2';
import disableBrowserBackButton from 'disable-browser-back-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import cadastro from './cadastro';
import precadastro from './PreCadastro';
import dashborad from './Dashboard';
import cadastroProdutos from './CadastroProdutos';
import { FontAwesome5 } from '@expo/vector-icons';
import Produtos from './Produtos';
import ProdutosEditar from './ProdutosEditar';
import DashBoradUser from './DashBoardUser';
import PedirProduto from './PedirProduto';
import myMenssages from './messager';
import messageReadMessage from './messageReadMesessage';
import DashBoardDeleteUser from './DashBoardDeleteUser';
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
import AsyncStorage from '@react-native-async-storage/async-storage';



function HomeScreen({ navigation,route }) {
  //disable bakcButton
  disableBrowserBackButton();
  //PWA
  serviceWorkerRegistration.register();
  const [nome, setText] = React.useState('');
  const [senha,setSenha] = React.useState('');
  const  windowWidth = Dimensions.get('window').width;
  const  windowHeight =Dimensions.get('window').height;
  const [language,SetLanguage]=React.useState('english');
  const [telefone,setTelefone]=React.useState('Email');
  const [senhaTexto,setSenhaText]=React.useState('password');
  const [footer,setFooter]=React.useState('give love, clothes, toys for Childs')
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [page,setPage] = React.useState('login');
  const [email,setEmail]=React.useState('');
  const [alertId,setalertId]=React.useState('');
     

  useEffect(()=>{
  if(route.params){
    setText(route.params.id)}})


    const getData2 = async () => {
      try {
          const value = await AsyncStorage.getItem('pushid')
          if(value !== null) {
          // value previously stored
           setPushid(value)
           }
      } catch(e) {
        // error reading value
        alert(e)
      }
    }
    
    getData2();

  

   

  function getLanguage(){
    {/*Pegar todas as aulas*/}
    useEffect(() => {
      fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?language=${language}&page=${page}`,{method:'GET'})
     .then((response) => response.json())
     .then((json) => setData(json))
     .catch((error) => console.error(error))
     .finally(() => setLoading(false));
      if(data){
        
      }
    }, []);

  }
  getLanguage();

 
  return (
  <SafeAreaView style={{flex:1,alignItems:'center',backgroundColor:'dodgerblue'}}>
    <View style={{flexDirection:'row',alignContent:'flex-end'}}>
    <FontAwesome5 onPress={()=>{
    fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?language=${language}`,{method:'GET'})
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    setTelefone(data.text)
    setSenhaText(data.password)
    setFooter(data.footer)
   
    }} name="language" size={30} color="white" style={{marginLeft:windowWidth-80}}/>
    </View>
   <ImageBackground source={require('./assets/rainbow.png')} resizeMode="stretch" style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  <View>
  <TouchableOpacity style={{flex:1,alignContent:'center',alignItems:'center'}} onPress={()=>{navigation.navigate('pre')}}> 
  <Ionicons  name="ios-person-add" size={48} color="white" />
  <Text style={{color:'white'}}>Add</Text>
  </TouchableOpacity>
  </View>
      
     
    <View style={{alignItems:'center'}}
    ><TouchableOpacity onPress={() => navigation.navigate('Admin')}>
    </TouchableOpacity>
    </View>
    <KeyboardAvoidingView>
    <TextInput
     value={nome?nome:email}
     onChangeText={(nome) => setText(nome)}
     style={{height: 40,
      margin: 12,
      borderWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth:0,
      borderTopWidth: 0,
      borderColor:'white',
      outline: 'none',
      color:'white',
      placeholderTextColor:'white'}}
      placeholder={telefone}
      keyboardType='email-address'
     
    />

    <TextInput
    value={senha}
    onChangeText={(senha) => setSenha(senha)}
    style={{height: 40,
    margin: 12,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth:0,
    borderTopWidth: 0,
    borderColor:'white',
    outline: 'none',
    color:'white',
    placeholderTextColor:'white'}}
    placeholder={senhaTexto}
    secureTextEntry={true}
    />

</KeyboardAvoidingView>

<TouchableOpacity onPress = {() => {/* do this */

if(!nome||!senha){

  Swal.fire({
    title: 'Erro!',
    text: 'Nenhum campo pode estar em branco',
    icon: 'error',
    confirmButtonText: 'Continuar'
  })
  
}if(nome && senha){

var validatinoApi ='https://wesleymontaigne.com/OOP/oprhanage/';
var headers={
 'Accept':'application/json',
 'Content-Type':'application.json',
 'Access-Control-Allow-Methods': 'GET, POST',
 'crossDomain': 'true',
 'Host': 'https://wesleymontaigne.com/OOP/',
 'Origin': 'https://wesleymontaigne.com',
 
  };
 /*'crossDomain': 'true',*/
 var Data={
  nome:nome,
  senha:senha

 };

 fetch(validatinoApi,
  {
   method:'POST',
   headers:headers,
   body:JSON.stringify(Data)
 }).then((response)=>response.json())
   .then((response)=>{
   if(response.statusCode==200){
    if(response.usertype==1){
    navigation.replace('DashBoard',{response})
    }else{
    navigation.replace('DashBoard-User',{response})

    } 
  

    }else{

   
  Swal.fire({
    title: 'Erro!',
    text: 'Usuário ou senhas errados',
    icon: 'error',
    confirmButtonText: 'Continuar'
  })

    }
   

   })
   .catch((error)=>{
     alert(error);
   });

}








}}>
<View style = {{backgroundColor: 'white', alignItems: 'center',
justifyContent: 'center' ,borderRadius: 10,width:110 }}
>
<Text style = {{ color: 'dodgerblue', padding:10}}>Entrar</Text>
</View>


</TouchableOpacity>
<TouchableOpacity style={{marginTop:14}}>
<FontAwesome name="whatsapp" onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone=5531999073071&text=Olá tudo bem com vocês?')} size={24} color="white" />
</TouchableOpacity>
<Text style={{color:'white',marginTop:windowHeight-450}}>{footer}</Text>
</ImageBackground>
</SafeAreaView>
);
}
 


const Stack = createNativeStackNavigator();
//use navigation hook shown as below





function App() {



  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="From-the-heart"
     >
    <Stack.Screen name="From-the-heart" component={HomeScreen}
    
  
    />

<Stack.Screen name="Cadastro" component={cadastro} />

<Stack.Screen name="pre" component={precadastro}
    
    options={{
    headerShown:true
   }}
   />
  
  <Stack.Screen name="DashBoard" component={dashborad}
    options={{
      headerShown:false
     }}
  
  />

<Stack.Screen name="Post-Items" component={cadastroProdutos}
  
  options={{
    headerShown:true
   }}
/>

<Stack.Screen name="Produtos" component={Produtos}
  
  options={{
    headerShown:true
   }}
/>
<Stack.Screen name="Editing" component={ProdutosEditar} />
<Stack.Screen name='DashBoard-User' component={DashBoradUser } />
<Stack.Screen name="solicitation" component={PedirProduto} />
<Stack.Screen name="Message" component={myMenssages} />
<Stack.Screen name="chat" component={messageReadMessage} />
<Stack.Screen name="DashBoardUser" component={DashBoardDeleteUser} />
</Stack.Navigator>
</NavigationContainer>
  );
}

export default App;