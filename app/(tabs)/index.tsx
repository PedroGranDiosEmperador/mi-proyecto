import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Text>Página principal</Text>
      <Button onPress={() => router.back()} title="Registro" />
    </View>
  );
}
