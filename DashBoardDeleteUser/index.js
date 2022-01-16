import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet,TouchableOpacity, Dimensions, Image, SafeAreaView, Button, KeyboardAvoidingView } from 'react-native';
import Swal from 'sweetalert2';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

function DashBoardDeleteUser({ navigation,route }) {
  
  
   const [senha, setSenha] = React.useState('');
  const [email, setEmail] = React.useState(route.params.response.email);
  const [estado, setEstado] = React.useState(route.params.response.state)
  const [cidade,setCidade] =React.useState(route.params.response.city)
  const [image, setImage] = React.useState(route.params.response.image);
  const [namefoto, setNomeFoto] = React.useState('');
  const [Type, setType] = React.useState('');
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
  const [usertype,setUserType]=React.useState(route.params.response.usertype)
  const [iduser,setIdUser]=React.useState(route.params.response.userid);
  const [productId,setProductId] =React.useState(route.params.productId);
  const [sessionId,setSesstionId] =React.useState(route.params.response.sessionid);
  const [imageDel,setImageDel]= React.useState(route.params.response.image)
  const [delImage,setDelImage]=React.useState(0)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight =Dimensions.get('window').height;


 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

  
    if (!result.cancelled) {
      // extract the filetype
      setType(result.uri.substring(result.uri.lastIndexOf(".") + 1));
      setImage(result.uri);
      setNomeFoto(result.uri)
      setDelImage(1)
    }
  };

   
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
    
      var validatinoApi = 'https://wesleymontaigne.com/OOP/oprhanage/fotos/';
      var headers = {
        'Accept': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
         };
      /*'crossDomain': 'true',*/
      var Data = {
        iduser:iduser,
        page:'deleteUser',
        productId:productId,
        sessionid:sessionId,
        image:image,
        image: image,
        namefoto: `photo.${namefoto}`,
        type: `image/${Type}`,
    
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
        navigation.replace('pre');
    
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


  return (
    <SafeAreaView style={{backgroundColor:'dodgerblue',alignItems:'center'}}>
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
   
      
    }} name="language" size={30} color="white" style={{marginLeft:windowWidth-80}}/>
    
    <Button title="Profile Picture" onPress={pickImage} />
   <View style={{maxWidth:150,maxHeight:150}}>
   {image && <Image source={{ uri: image }} style={{ width: 40, height: 40 }} />}
   </View>

      
    <KeyboardAvoidingView styles={{flex:1,backgroundColor:'dodgerblue',alignItems:'center',justifyContent:'center'}}>
     
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


</KeyboardAvoidingView>

        <TouchableOpacity onPress={() => {/* do this */

          if (!senha || !email ||!cidade||!image||!estado) {

            Swal.fire({
              title: 'Erro!',
              text: 'none of fields can be empty',
              icon: 'error',
              confirmButtonText: 'Continuar'
              
            })

            return true;

          } if (email && senha) {

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

            var validatinoApi = 'https://wesleymontaigne.com/OOP/oprhanage/fotos/';
            var headers = {
              'Accept': 'application/json',
              "Content-Type": "multipart/form-data",
              'Access-Control-Allow-Methods': 'UPDATE',
             
            };
            /*'crossDomain': 'true',*/
            var Data = {
              email: email,
              estado: estado,
              senha: senha,
              image: image,
              namefoto: `photo.${namefoto}`,
              type: `image/${Type}`,
              cidade:cidade,
              estado:estado,
              usertype:usertype,
              iduser:iduser,
              sessionid:sessionId,    
              imageDel:imageDel,
              delImage:delImage

            };

            fetch(validatinoApi,
              {
                method: 'UPDATE',
                headers: headers,
                body: JSON.stringify(Data)
              }).then((response) => response.json())
              .then((response) => {
                if (response.statusCode == 200) {
                {Swal.hideLoading()}
                navigation.replace('From-the-heart')               
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
            <Text style={{ color: 'dodgerblue'}}>Up Date</Text>
          </View>
        </TouchableOpacity>

       <TouchableOpacity>
       <Entypo name="trash" style={{margin:7}} size={40} color="white" onPress={()=>{
       deleteFunction();
       }} />
       </TouchableOpacity>
       <Text style={{color:'white'}}>Delete</Text>
       
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


export default DashBoardDeleteUser;