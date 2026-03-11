import { router } from "expo-router";
import React from "react";
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from "react-native";

export default function Index() {
  const { width } = useWindowDimensions();

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

      {/* LOGIN */}
      <View style={styles.loginPanel}>
        <Text style={styles.title}>Instituto Tecnológico de la Piedad</Text>

        <View style={styles.tabs}>
          <Text style={styles.activeTab}>Estudiantes</Text>
          <Text style={styles.tab}>Personal</Text>
        </View>

        <Text style={styles.label}>Número de control</Text>
        <TextInput style={styles.input} placeholder="" />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          secureTextEntry
        />

        <TouchableOpacity style={styles.button}>
          <Button onPress={() => router.push("/(tabs)")} title="Iniciar sesión" />
        </TouchableOpacity>

        {/* Estilo del telefono */}
        {!isDesktop && (
          <View style={styles.mobileFooter}>
            <Text style={{ color: "white" }}>MindBox® 2026</Text>
          </View>
        )}
      </View>
    </View>
  );
}