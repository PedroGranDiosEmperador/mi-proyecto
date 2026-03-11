import React from 'react';
import { Image, Text, View } from "react-native";
import { styles } from "../Styles/auth.styles";

export default function notifications() {
  return (
    <View style={styles.container}>
<Image
  source={require('../../assets/profile.png')}
  style={{ width: 150, height: 150, marginBottom: 20 }}
/>
      <Text style={styles.tittle}>Perfil de Usuario</Text>
      <Text style={styles.text}>Nombre: Luis Felipe Cabrera Higuera</Text>
      <Text style={styles.text}>Número de Control: 20640189</Text>
      <Text style={styles.text}>Carrera: Ingeniería en Sistemas Computacionales</Text>
      <Text style={styles.text}>Descripción: Estudiante de Ingeniería en Sistemas Computacionales, interesado en desarrollo de software, tecnologías emergentes,
        fan de los videojuegos y la música. Siempre buscando aprender y crecer en el campo de la tecnología.</Text>
    </View>
  );
}