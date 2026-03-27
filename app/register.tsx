import { makeRedirectUri } from 'expo-auth-session';
import * as Google from "expo-auth-session/providers/google";
import { Redirect } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { AuthContext } from "./utils/authContext";

WebBrowser.maybeCompleteAuthSession();
//La IA metio veinte mil cambios hecho un rezo al viento 
export default function Register() {
  const { isLoggedIn, isLoading: authLoading, logIn } = useContext(AuthContext);
  const [numeroControl, setNumControl] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState({ numeroControl: "", password: "", nombre: "" });
  const [googleLoading, setGoogleLoading] = useState(false);
  const { width } = useWindowDimensions();
  //Estilos que pongo aca por que me marca error
   const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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
    errorText: {
      color: "red",
      fontSize: 12,
      marginBottom: 10,
      marginTop: -10,
    },
    button: {
      backgroundColor: "#6A5ACD",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 10,
    },
    googleButton: {
      backgroundColor: "#DB4437",
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

  // Configuración de Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '901593060122-rlf1mgfobngpes4m04kptd5ok2mmb70o.apps.googleusercontent.com',
    androidClientId: '901593060122-p565dql278att4j0iaocffcrqosjt531.apps.googleusercontent.com',
    webClientId: '901593060122-oom01v8c3kvs7oh7s0a7j57cqooc1659.apps.googleusercontent.com',
    redirectUri: makeRedirectUri({
      scheme: 'miproyecto',
    }),
  });

  // Redirigir si ya está logueado
  if (!authLoading && isLoggedIn) {
    return <Redirect href={"/(tabs)/main"} />;
  }

  // Manejar respuesta de Google
  useEffect(() => {
    if (response?.type === "success") {
      handleGoogleSignIn(response.authentication?.accessToken);
    } else if (response?.type === "error") {
      Alert.alert("Error", "No se pudo iniciar sesión con Google");
      setGoogleLoading(false);
    }
  }, [response]);

  const handleGoogleSignIn = async (token: string | undefined) => {
    if (!token) {
      Alert.alert("Error", "No se pudo obtener el token de acceso");
      setGoogleLoading(false);
      return;
    }

    setGoogleLoading(true);
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const userData = await userInfoResponse.json();
      
      // Guardar usuario con datos de Google
      await logIn({
        id: userData.id,
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
      });
      
      Alert.alert("Éxito", "Inicio de sesión con Google exitoso");
    } catch (error) {
      console.log("Error fetching user info:", error);
      Alert.alert("Error", "No se pudo obtener la información del usuario");
    } finally {
      setGoogleLoading(false);
    }
  };

  const validarRegistro = async () => {
    let valid = true;
    let newErrors = { numeroControl: "", password: "", nombre: "" };

    if (!numeroControl) {
      newErrors.numeroControl = "El número de control es obligatorio";
      valid = false;
    } else if (!/^\d{8}$/.test(numeroControl)) {
      newErrors.numeroControl = "El número de control debe tener 8 dígitos";
      valid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }

    if (!nombre) {
      newErrors.nombre = "El nombre es obligatorio";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Simular registro exitoso
      const userData = {
        num_control: numeroControl,
        nombre: nombre,
        // No guardamos la contraseña en texto plano en un app real
      };
      
      await logIn(userData);
      Alert.alert("Registro exitoso", "Bienvenido a la aplicación");
    }
  };

  const isWeb = Platform.OS === "web";
  const isDesktop = width >= 900;

  if (authLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6A5ACD" />
      </View>
    );
  }

 

  return (
    <View
      style={[
        styles.container,
        isWeb && isDesktop ? styles.row : styles.column,
      ]}
    >
      {isWeb && isDesktop && (
        <View style={styles.leftPanel}>
          <Text style={styles.logo}>Appi</Text>
          <Text style={styles.quote}>
            "APPI EN DESARROLLO"
          </Text>
        </View>
      )}

      <View style={styles.loginPanel}>
        <Text style={styles.title}>Bienvenido al registro</Text>
        <Text style={styles.title}>Instituto Tecnológico de la Piedad</Text>

        <Text style={styles.label}>Nombre completo</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ingresa tu nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />
        {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}

        <Text style={styles.label}>Número de control</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej: 20640209"
          value={numeroControl}
          onChangeText={setNumControl}
          keyboardType="numeric"
        />
        {errors.numeroControl ? <Text style={styles.errorText}>{errors.numeroControl}</Text> : null}

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={validarRegistro}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={() => {
            setGoogleLoading(true);
            promptAsync();
          }}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesión con Google</Text>
          )}
        </TouchableOpacity>

        {!isDesktop && (
          <View style={styles.mobileFooter}>
            <Text style={{ color: "white" }}>MindBox® 2026</Text>
          </View>
        )}
      </View>
    </View>
  );
}