import React from "react";
import { firebase } from "../lib/firebase/initialization";
import { getAuth } from "firebase/auth";

const authInstance = getAuth(firebase)

type Props = {
  children: React.ReactNode
}

export const AuthContext = React.createContext(authInstance);

export function AuthContextProvider ({children}: Props) {

  return (
    <AuthContext.Provider value={authInstance}>
      {children}
    </AuthContext.Provider>
  )
}