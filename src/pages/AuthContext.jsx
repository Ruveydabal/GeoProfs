import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [gebruikerData, setGebruikerData] = useState(null);
  const [laadGebruiker, setLaadGebruiker] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setGebruikerData(user);
      setLaadGebruiker(false);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ gebruikerData, laadGebruiker }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
