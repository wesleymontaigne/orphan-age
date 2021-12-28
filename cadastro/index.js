import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet,TouchableOpacity, Dimensions, Image, SafeAreaView, Button } from 'react-native';
import Swal from 'sweetalert2';
import * as ImagePicker from 'expo-image-picker';
import { MaskedTextInput} from "react-native-mask-text";
import { FontAwesome5 } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

function Admin({ navigation,route }) {
  
  
  const [nome, setText] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [sobreNome, setSobreNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [estado, setEstado] = React.useState('')
  const [cidade,setCidade] =React.useState('')
  const [image, setImage] = React.useState('https://wesleymontaigne.com/orphanage/image/logo.png');
  const [namefoto, setNomeFoto] = React.useState('');
  const [Type, setType] = React.useState('');
  const [maskedValue, setMaskedValue] = useState("");
  const [unMaskedValue, setUnmaskedValue] = useState("");
  const [language,SetLanguage]=React.useState('portugues');
  const  [country,setCountry] =React.useState('')
  const [footer,setFooter]=React.useState('give love, clothes, toys for Childs')
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [page,setPage] = React.useState('singup');
  const [emailt,setEmailt]=React.useState('Email');
  const [nomet,setNomet] =React.useState('Name');
  const [sobrenomet,setSobreNomet]=React.useState('Last Name');
  const [estadot,setEstadot]= React.useState('State');
  const [cidadet,setCidadet]=React.useState('City');
  const [senhat,Setsenhat]=React.useState('PassWord');
  const [countryt,setCountryt]=React.useState('Select Your country');
  const [usertype,setUserType]=React.useState(1)


  //Object to pass params to SELECT object
  const placeholder = {
    label: countryt,
    value: null,
    color: '#9EA0A4',
  };


  const windowWidth = Dimensions.get('window').width;
  const windowHeight =Dimensions.get('window').height;


 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      // extract the filetype
      setType(result.uri.substring(result.uri.lastIndexOf(".") + 1));
      setImage(result.uri);
      setNomeFoto(result.uri)
    }
  };

   



  return (
    <SafeAreaView style={{flex:1,backgroundColor:'black',alignItems:'center',maxHeight:windowHeight}}>
     <FontAwesome5 onPress={()=>{
      
    
      
     fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?language=${language}&page=${page}`,{method:'GET'})
    .then((response) => response.json())
    .then((json) =>  setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

     if(data.id>0){
     setFooter(data.footer)
     setEmailt(data.email)
     setNomet(data.name)
     setSobreNomet(data.lastname)
     setEstadot(data.state)
     setCidadet(data.city)
     }
     if(language=='english'){
       Setsenhat('Senha')
      SetLanguage('portugues')
      }if(language=='portugues'){
       Setsenhat('PassWord') 
      SetLanguage('english')
       }
   
    
    console.log(data)
   
    }} name="language" size={30} color="white" style={{marginLeft:windowWidth-80}}/>
    
    <Button title="Profile Picture" onPress={pickImage} />
   <View style={{maxWidth:150,maxHeight:150}}>
   {image && <Image source={{ uri: image }} style={{ width: 40, height: 40 }} />}
   </View>

      
   <View style={{maxWidth:250,margin:7}}>
   <RNPickerSelect
            onValueChange={(value) => setCountry(value)}
            items={[
                { label: 'USA', value: 'USA' },
                { label: 'Brasil', value: 'Brasil' },
                ]}
                placeholder={placeholder}
               
        />
   </View>

  
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
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
            placeholderTextColor: 'white'
          }}
          placeholder={emailt}
          keyboardType='email-address'

        />

        <TextInput
          value={nome}
          onChangeText={(nome) => setText(nome)}
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
            placeholderTextColor: 'white'
          }}
          placeholder={nomet}
          keyboardType='default'

        />

        <TextInput
          value={sobreNome}
          onChangeText={(sobreNome) => setSobreNome(sobreNome)}
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
            placeholderTextColor: 'white'
          }}
          placeholder={sobrenomet}
          keyboardType='default'
        />
        
        


        <TextInput
          value={estado}
          onChangeText={(estado) => setEstado(estado)}
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
            placeholderTextColor: 'white'
          }}
          placeholder={estadot}
          keyboardType='default'
        />
       
       <TextInput
          value={cidade}
          onChangeText={(cidade) => setCidade(cidade)}
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
            placeholderTextColor: 'white'
          }}
          placeholder={cidadet}
          keyboardType='default' />

        
        <TextInput
          value={senha}
          onChangeText={(senha) => setSenha(senha)}
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
            placeholderTextColor: 'white'
          }}
          placeholder={senhat}
          secureTextEntry={true}
        />



        <TouchableOpacity onPress={() => {/* do this */

          if (!nome || !senha || !email || !sobreNome || !country||!cidade||!image||!estado) {

            Swal.fire({
              title: 'Erro!',
              text: 'none of fields can be empty',
              icon: 'error',
              confirmButtonText: 'Continuar'
              
            })

            return true;

          } if (nome && senha) {

           if(!image){
              Swal.fire({
                title: 'Erro!',
                text: 'choose a photo',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              return true;
            }

            {/*set loading from Swal*/}
            {Swal.showLoading()}

            var validatinoApi = 'https://wesleymontaigne.com/OOP/oprhanage/fotos/indexfotos.php';
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
              email: email,
              nome: nome,
              sobreNome: sobreNome,
              estado: estado,
              senha: senha,
              image: image,
              namefoto: `photo.${namefoto}`,
              type: `image/${Type}`,
              cidade:cidade,
              estado:estado,
              country:country,
              usertype:usertype    

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
                  navigation.navigate('Orphan-age', { id: email})

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








        }}>
          <View style={{
            backgroundColor: 'white', alignItems: 'center',
            justifyContent: 'center', borderRadius: 10, width: 110,height:25}}
          >
            <Text style={{ color: 'dodgerblue'}}>sign up</Text>
          </View>
        </TouchableOpacity>
       
        <View>
          <Text style={{color:'white',marginTop:windowHeight-450}}>{footer}</Text>
       </View>
       
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  optionStyle: {
    margin: 5,
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#E9EFFE',
    fontFamily: 'Helevica Neue',
  },
  selectedOptionStyle: {
    margin: 5,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#497DF9',
    fontFamily: 'Helevica Neue',
  },
  optionTextStyle: {
    color: '#497DF9',
  },
  selectedOptionTextStyle: {
    color: '#ffffff',
  },


});


export default Admin;