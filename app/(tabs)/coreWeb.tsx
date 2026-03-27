import { StyleSheet, Text, View } from "react-native";
//Pantalla de carga que se usara mientras que carga la pagina, la IA esta haciendo esto y Bruuuuh es nomas un texto waaah ah ya fue 
export default function CoreWeb() {
  return (
    <View style={styles.container}>
      <Text>Core Web Screen</Text>
      <p>Esto es una pantalla de carga, espere a que cargue la pagina</p>
      <p>muchas gracias</p>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});