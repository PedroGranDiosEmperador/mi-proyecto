import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import { Redirect, router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
//agregrado del deepseek
import { makeRedirectUri } from 'expo-auth-session';
import React, { useContext } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { AuthContext, AuthProvider } from "./utils/authContext";

WebBrowser.maybeCompleteAuthSession();

//Segundo tutorial de Autenthication de un login FLow -"building a Login flow with Expo Router" de expo
const isLoggedIn= false;
//Recuperamos contexto de Autorizacion
const authContext= useContext(AuthContext);

export default function Index() {
  //En el tutorial cuando alguien no esta loggeado al login, aca haremos lo inverso por cuestion de la estructura del proyecto xd
  if(isLoggedIn){
    return <Redirect href={"/(tabs)/main"}/>
  }
const [userInfo, setUserInfo]= React.useState(null);
// "Mostraremos un modal y preguntaremos con cual cuenta quiere iniciar sesion y tal"
const [request, response, promptAsync ]= Google.useAuthRequest({
  iosClientId: '901593060122-rlf1mgfobngpes4m04kptd5ok2mmb70o.apps.googleusercontent.com',
  androidClientId: '901593060122-p565dql278att4j0iaocffcrqosjt531.apps.googleusercontent.com',
  webClientId: '901593060122-oom01v8c3kvs7oh7s0a7j57cqooc1659.apps.googleusercontent.com',
  //esta cosa me dijo deepseek que la pusiera xd
    redirectUri: makeRedirectUri({
      scheme: 'miproyecto', // Debe coincidir con app.json
    }),
})
//"Usaremos un hook para manejar el inicio de sesion"
React.useEffect(()=>{
  handleSignInWIthGoogle()
},[response])
//GetLocalUser que uhhh no creo que tengamos que hago 
const getLocaluser=async()=>{
  const data= await AsyncStorage.getItem("@user");
  if (!data) return null;
  return JSON.parse(data);
};

//Aca se llama un usario local que estoy segurisimo que no tenemos asi que que pedo
//Bruh que porongas hago con este pedazo de codigo re inutil
async function handleSignInWIthGoogle() {
  const user=await getLocaluser();
  if(!user){
    if(response?.type==="success"){
      getUserInfo(response.authentication?.accessToken);
        console.log("TEST TEST pero la puta madre loggeate");
        authContext.logIn;
    }
  } else{
    setUserInfo(user);
    console.log("Que porongas esta pasando eh eh")
  }
}

// He de suponer que esto es del API que no tenemos y no existe asi que XDDDD
const getUserInfo= async(token:any)=>{
  if(!token) return;
  try{
    const response= await fetch(
         "https://www.googleapis.com/userinfo/v2/me",
          {
           headers:{Authorization: `Bearer ${token}` },
           }
    )
    const user= await response.json();
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    setUserInfo(user);
  } catch(e){console.log(e)}
}
//Logs propuestos por la ia pedorra
const handleSignIn = async () => {
  console.log("Request ready:", request);
  console.log("Prompting...");
  const result = await promptAsync();
  console.log("Result:", result);

};


  const [numeroControl, setNumControl] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const { width } = useWindowDimensions();

  const [errors, setErrors] = React.useState({
    numeroControl: "",
    password: "",
    nombre: "",
  });

    const validar = () => {
        let valid = true;
        let newErrors = { numeroControl: "", password: "", nombre: "" };

        //Validacion del numero de control
        if (!numeroControl) {
            newErrors.numeroControl = "El numero de control es obligatorio";
            valid = false;
        }else if (!/^\d{8}$/.test(numeroControl)){
            newErrors.numeroControl = "El numero de control debe de tener 8 numeros";
            valid = false;
        }

        //Validacion de contraseña
        if (!password){
            newErrors.password = "La contraseña es obligatoria";
            valid = false;
        }else if (password.length < 6){
            newErrors.password = "La contraseña debe de tener al menos 6 caracteres";
            valid = false;
        
        }
        
        setErrors(newErrors);

        if (valid){
            Alert.alert("Registro exitoso");
            router.push("/(auth)/login");
        }
    };

    const isWeb = Platform.OS === "web";
    const isDesktop = width >= 900; // punto de quiebre
  
    const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
  
    row: {
      flexDirection: "row",
    },
  
    column: {
      flexDirection: "column",
      justifyContent: "center",
      padding: 20,
    },
  
    leftPanel: {
      flex: 1,
      backgroundColor: "#6A5ACD",
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },
  
    logo: {
      fontSize: 40,
      color: "white",
      fontWeight: "bold",
      marginBottom: 20,
    },
  
    quote: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
    },
  
    loginPanel: {
      flex: 1,
      justifyContent: "center",
      padding: 40,
    },
  
    title: {
      fontSize: 22,
      textAlign: "center",
      marginBottom: 30,
    },
  
    tabs: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
  
    activeTab: {
      backgroundColor: "#6A5ACD",
      color: "white",
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 10,
      marginRight: 10,
    },
  
    tab: {
      color: "#888",
      paddingHorizontal: 15,
      paddingVertical: 8,
    },
  
    label: {
      marginBottom: 5,
      color: "#555",
    },
  
    input: {
      backgroundColor: "#eaeaea",
      padding: 12,
      borderRadius: 8,
      marginBottom: 15,
    },
  
    button: {
      backgroundColor: "#6A5ACD",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
  
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
  
    mobileFooter: {
      marginTop: 40,
      backgroundColor: "#6A5ACD",
      padding: 20,
      alignItems: "center",
      borderRadius: 10,
    },
  });
  
    return (
      //Lo que se explica en el layout, se envuelve a la aplicacion con el provider para que sea accesible en todos lados, 
      // pero nuestra pantalla de registro esta fuera de ella por el momento
      <AuthProvider>
        <View
          style={[
            styles.container,
            isWeb && isDesktop ? styles.row : styles.column,
          ]}
        >
          {/* Imagen izquierda */}
          {isWeb && isDesktop && (
            <View style={styles.leftPanel}>
              <Text style={styles.logo}>Appi</Text>
              <Text style={styles.quote}>
                "APPI EN DESARROLLO"
              </Text>
            </View>
          )}
    
          {/* Registro */}
          <View style={styles.loginPanel}>
            <Text style={styles.title}>Bienvenido al registro</Text>
            <Text style={styles.title}>Instituto Tecnológico de la Piedad</Text>

            <Text style={styles.label}>Nombre completo</Text>
            <TextInput style={styles.input} placeholder="" />
    
            <Text style={styles.label}>Número de control</Text>
            <TextInput style={styles.input} placeholder="" />
    
            <Text style={styles.label}>Contraseña</Text>

            <TextInput
              style={styles.input}
              placeholder=""
              secureTextEntry
            />
    
            <TouchableOpacity style={styles.button}>
              <Button onPress={() => authContext.logIn} title="Iniciar sesión" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
            <Text style={styles.buttonText} >Iniciar sesión con google</Text>
          </TouchableOpacity>
            
            {/* Movil */}
            {!isDesktop && (
              <View style={styles.mobileFooter}>
                <Text style={{ color: "white" }}>MindBox® 2026</Text>
              </View>
            )}
          </View>
        </View>
      </AuthProvider>
    );
}
