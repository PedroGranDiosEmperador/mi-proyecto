import { Redirect } from "expo-router";

const usuarios = [
  { id: 1, nombre: "Nico", num_control: 20640209, carrera: "Ingenieria en Sistemas Computacionales" },
  { id: 2, nombre: "Luis Felipe", num_control: 20640189, carrera: "Ingenieria en Sistemas Computacionales" },
  { id: 3, nombre: "Pedro", num_control: 21010808, carrera: "Ingenieria en Sistemas Computacionales" }
];

export default function Index() {
/* return <Redirect href="/(tabs)" />  */
return <Redirect href="/register" />
}
