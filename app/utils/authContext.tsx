//POST IA
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type User = {
  id?: string;
  email?: string;
  name?: string;
  picture?: string;
  num_control?: string;
  nombre?: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  logIn: (userData: User) => Promise<void>;
  logOut: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  user: null,
  logIn: async () => {},
  logOut: async () => {},
  isLoading: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario al iniciar
  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logIn = async (userData: User) => {
    try {
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      router.replace("/(tabs)/main");
    } catch (error) {
      console.log("Error saving user:", error);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("@user");
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/register");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
// PRE IA
// import { useRouter } from "expo-router";
// import { createContext, PropsWithChildren, useState } from "react";
// //https://www.youtube.com/watch?v=yNaOaR2kIa0
// //Esta clase es para guardar el estado de ingreso del usuario
// type AuthState={
//     //Un booleano que determina si esta loggeado y funciones que son para iniciar y cerrar sesion
//     isLoggedIn: boolean;
//     logIn:()=> void;
//     logOut:()=> void;
// };
// //Este metodo es para crear contexto de nuestros estados, se debe pasar un valor inicial para el booleano
// export const AuthContext= createContext<AuthState>({
//     isLoggedIn:false,
//     logIn:()=>{},
//     logOut:()=>{},
// });

// //Exporta nuesto proveedor de autorizacion y  "envolvemos" nuestro layout de raiz 
// // con el propio proveedor de autorizacion
// //para que este pueda ser accesible desde cualquier lado, hacemos que acepte "hijos" con PropsWithChildren
// //Va a regresar estos "ninnos" envueltos en el autorizador, pasamos
// //  el valor nuestro estado como metodo al autorizador que manejaremos dentro del componente
// export function AuthProvider ({children}: PropsWithChildren){
//     const [isLoggedIn,setIsLoggedin]= useState(false);

//     //Const que nos permitira usar el router
//     const router =useRouter();

//     const logIn=()=>{
//         setIsLoggedin(true);
//         console.log("pero loggeate we")
//         router.replace("/")
//     };
//     const logOut=()=>{
//         setIsLoggedin(false);
        
//     };

//     return(
//         <AuthContext.Provider value={{isLoggedIn,logIn, logOut}} >
//             {children}
//         </AuthContext.Provider>
//     );
// }
