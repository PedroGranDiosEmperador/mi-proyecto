import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useState } from "react";
//https://www.youtube.com/watch?v=yNaOaR2kIa0
//Esta clase es para guardar el estado de ingreso del usuario
type AuthState={
    //Un booleano que determina si esta loggeado y funciones que son para iniciar y cerrar sesion
    isLoggedIn: boolean;
    logIn:()=> void;
    logOut:()=> void;
};
//Este metodo es para crear contexto de nuestros estados, se debe pasar un valor inicial para el booleano
export const AuthContext= createContext<AuthState>({
    isLoggedIn:false,
    logIn:()=>{},
    logOut:()=>{},
});

//Exporta nuesto proveedor de autorizacion y  "envolvemos" nuestro layout de raiz 
// con el propio proveedor de autorizacion
//para que este pueda ser accesible desde cualquier lado, hacemos que acepte "hijos" con PropsWithChildren
//Va a regresar estos "ninnos" envueltos en el autorizador, pasamos
//  el valor nuestro estado como metodo al autorizador que manejaremos dentro del componente
export function AuthProvider ({children}: PropsWithChildren){
    const [isLoggedIn,setIsLoggedin]= useState(false);

    //Const que nos permitira usar el router
    const router =useRouter();

    const logIn=()=>{
        setIsLoggedin(true);
        console.log("pero loggeate we")
        router.replace("/")
    };
    const logOut=()=>{
        setIsLoggedin(false);
        
    };

    return(
        <AuthContext.Provider value={{isLoggedIn,logIn, logOut}} >
            {children}
        </AuthContext.Provider>
    );
}
