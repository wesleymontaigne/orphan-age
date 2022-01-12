import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet,TouchableOpacity, Dimensions, Image, SafeAreaView, Button } from 'react-native';
import Swal from 'sweetalert2';
import * as ImagePicker from 'expo-image-picker';
import { MaskedTextInput} from "react-native-mask-text";
import { FontAwesome5 } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

function Admin({ navigation,route }) {
  

  const [nome, setText] = React.useState('');
  const [nomet,setNomet] =React.useState('Name');
  const [descption,setDescription]=React.useState('');
  const [descriptionT,setDescriptionT]=React.useState('Description');
  const [quant,setQuant]=React.useState('');
  const [quantT,setQuantT]=React.useState('Quant');
  const [deliveryLabel1,setDeliverylabel1]=React.useState('I will post')
  const [deliveryLabel2,setDeliverylabel2]=React.useState('Get with me')
  const [deliveryLabel3,setDeliverylabel3]=React.useState('Posted or Get with me')
  const [picturelabel,setPicutreLable]=React.useState('Picture')
  const [image, setImage] = React.useState('https://wesleymontaigne.com/orphanage/image/logo.png');
  const [namefoto, setNomeFoto] = React.useState(1);
  const [Type, setType] = React.useState('');
  const [language,SetLanguage]=React.useState('portugues');
  const [delivery,setDelivery]=React.useState('');
  const [deliveryT,setDeliveryT] =React.useState('Delivery')
  const [footer,setFooter]=React.useState('give love, clothes, toys for Childs')
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [page,setPage] = React.useState('postitem');
  const [usertype,setUserType]=React.useState(route.params.response.usertype)
  const [iduser,setIdUser]=React.useState(route.params.response.userid);
  const [sessionid,setSesstionId] =React.useState(route.params.response.sessionid)
  const [country,setCountry] = React.useState(route.params.response.country);


  //Object to pass params to SELECT object
  const placeholder = {
    label: deliveryT,
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
    <SafeAreaView style={{flex:1,backgroundColor:'dodgerblue',alignItems:'center'}}>
     <FontAwesome5 onPress={()=>{
      
    
      
     fetch(`https://wesleymontaigne.com/OOP/oprhanage/index.php?language=${language}&page=${page}`,{method:'GET'})
    .then((response) => response.json())
    .then((json) =>  setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));

     if(data.id>0){
     setFooter(data.footer)
     setNomet(data.name)
     setDescriptionT(data.description)
     setQuantT(data.quant)
     setDeliverylabel1(data.deliveryoption1)
     setDeliverylabel2(data.deliveryoption2)
     setDeliverylabel3(data.deliveryoption3)
     setPicutreLable(data.picturelabel)
     setDeliveryT(data.delivery)
      }
     if(language=='english'){
      SetLanguage('portugues')
      }if(language=='portugues'){
      SetLanguage('english')
      }
   
       
    }} name="language" size={30} color="white" style={{marginLeft:windowWidth-80}}/>
    
<View> <Button color="red" title={picturelabel} onPress={pickImage} /></View>
   <View  style={{maxWidth:150,maxHeight:150}}>
   {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, margin:7 }} />}
   </View>

      
   <View style={{maxWidth:250,margin:7}}>
   <RNPickerSelect
            onValueChange={(value) => setDelivery(value)}
            items={[
                { label: deliveryLabel1, value: deliveryLabel1 },
                { label: deliveryLabel2, value: deliveryLabel2 },
                { label: deliveryLabel3, value: deliveryLabel3}
                ]}
                placeholder={placeholder}
               
        />
   </View>

  
       
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
          value={descption}
          onChangeText={(descption) => setDescription(descption)}
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
          placeholder={descriptionT}
          keyboardType='default'
        />
        
        


        <TextInput
          value={quant}
          onChangeText={(quant) => setQuant(quant)}
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
          placeholder={quantT}
          keyboardType='default'
        />
       
       

        
       



        <TouchableOpacity onPress={() => {/* do this */

          if (!nome || !descption || !quant||!delivery||namefoto==1) {
           
            if(namefoto==1){
              Swal.fire({
              title: 'Erro!',
              text: 'Choose a picture',
              icon: 'error',
              confirmButtonText: 'ok'
              })
              return true
              }
         
          Swal.fire({
          title: 'Erro!',
          text: 'none of fields can be empty',
          icon: 'error',
          confirmButtonText: 'ok'
          })
          return true;
          } if (nome && descption&&quant&&delivery){
            {/*verify photos*/}
            if(namefoto==1){
              Swal.fire({
              title: 'Erro!',
              text: 'Choose a picture',
              icon: 'error',
              confirmButtonText: 'ok',
              })
              return true
              }

            {/*set loading from Swal*/}
            {Swal.showLoading()}

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
             
              nome: nome,
              delivery: delivery,
              descption: descption,
              quant: quant,
              image: image,
              namefoto: `photo.${namefoto}`,
              type: `image/${Type}`,
              usertype:usertype,
              requesition:'postItem',
              iduser:iduser,
              sessionid:sessionid,
              country:country    

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
              navigation.replace('DashBoard', { response: route.params.response})
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
            <Text style={{ color: 'dodgerblue'}}>Post</Text>
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